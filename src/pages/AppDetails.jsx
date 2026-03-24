import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import toast from 'react-hot-toast'
import { appsData } from '../data/apps'
import styles from './AppDetails.module.css'

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

const STARS_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#7c5cfc']

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>
        <p style={{ color: '#9090a8' }}>{payload[0].payload.name}</p>
        <p style={{ color: '#f0f0f8', fontWeight: 600 }}>{payload[0].value.toLocaleString()} reviews</p>
      </div>
    )
  }
  return null
}

function StarBar({ rating, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div className={styles.starRow}>
      <span className={styles.starLabel}>{rating}</span>
      <div className={styles.starTrack}>
        <div className={styles.starFill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.starCount}>{count.toLocaleString()}</span>
    </div>
  )
}

export default function AppDetails() {
  const { id } = useParams()
  const app = appsData.find(a => a.id === Number(id))
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if (!app) return
    const saved = JSON.parse(localStorage.getItem('heroio_installed') || '[]')
    setInstalled(saved.some(a => a.id === app.id))
  }, [app])

  const handleInstall = () => {
    const saved = JSON.parse(localStorage.getItem('heroio_installed') || '[]')
    if (!saved.some(a => a.id === app.id)) {
      localStorage.setItem('heroio_installed', JSON.stringify([...saved, app]))
    }
    setInstalled(true)
    toast.success(`${app.title} installed successfully!`, { icon: '🚀' })
  }

  if (!app) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundIcon}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
          </svg>
        </div>
        <h2>App Not Found</h2>
        <p>The app you're looking for doesn't exist or has been removed.</p>
        <Link to="/apps" className={styles.backBtn}>← Browse All Apps</Link>
      </div>
    )
  }

  const totalRatings = app.ratings.reduce((s, r) => s + r.count, 0)
  const chartData = [...app.ratings].map((r, i) => ({ ...r, color: STARS_COLORS[i] }))

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* BREADCRUMB */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/apps">Apps</Link>
          <span>›</span>
          <span>{app.title}</span>
        </nav>

        {/* HERO */}
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.appImgWrap}>
              <img src={app.image} alt={app.title} width={100} height={100} />
            </div>
            <div className={styles.appMeta}>
              <div className={styles.companyTag}>{app.companyName}</div>
              <h1 className={styles.appTitle}>{app.title}</h1>
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className={styles.ratingVal}>{app.ratingAvg.toFixed(1)}</span>
                  <span className={styles.metaLabel}>Rating</span>
                </div>
                <div className={styles.metaDivider} />
                <div className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span className={styles.metaVal}>{formatNum(app.downloads)}</span>
                  <span className={styles.metaLabel}>Downloads</span>
                </div>
                <div className={styles.metaDivider} />
                <div className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  <span className={styles.metaVal}>{formatNum(app.reviews)}</span>
                  <span className={styles.metaLabel}>Reviews</span>
                </div>
                <div className={styles.metaDivider} />
                <div className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  </svg>
                  <span className={styles.metaVal}>{app.size} MB</span>
                  <span className={styles.metaLabel}>Size</span>
                </div>
              </div>
              <button
                className={`${styles.installBtn} ${installed ? styles.installed : ''}`}
                onClick={handleInstall}
                disabled={installed}
              >
                {installed ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Installed
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    Install App
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* GRID: CHART + DESCRIPTION */}
        <div className={styles.contentGrid}>
          {/* CHART */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
              </svg>
              Review Breakdown
            </h2>

            <div className={styles.chartWrap}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={32} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#5a5a72', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5a5a72', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,92,252,0.06)' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.starBars}>
              {[...app.ratings].reverse().map((r, i) => (
                <StarBar key={i} rating={r.name} count={r.count} total={totalRatings} />
              ))}
            </div>

            <div className={styles.ratingOverall}>
              <div className={styles.ratingBig}>{app.ratingAvg.toFixed(1)}</div>
              <div>
                <div className={styles.stars}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(app.ratingAvg) ? '#f59e0b' : '#2a2a3a'}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className={styles.ratingCount}>{totalRatings.toLocaleString()} ratings</p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              About this App
            </h2>
            <p className={styles.description}>{app.description}</p>

            <div className={styles.tags}>
              {['Mobile', 'Free', `${app.size} MB`, app.companyName].map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Developer</span>
                <span className={styles.infoVal}>{app.companyName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Size</span>
                <span className={styles.infoVal}>{app.size} MB</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Downloads</span>
                <span className={styles.infoVal}>{formatNum(app.downloads)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Rating</span>
                <span className={styles.infoVal}>{app.ratingAvg} / 5</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Reviews</span>
                <span className={styles.infoVal}>{formatNum(app.reviews)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Category</span>
                <span className={styles.infoVal}>Mobile App</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
