import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import styles from './Installation.module.css'

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

export default function Installation() {
  const [installed, setInstalled] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('heroio_installed') || '[]')
    setInstalled(saved)
  }, [])

  const handleUninstall = (app) => {
    const updated = installed.filter(a => a.id !== app.id)
    localStorage.setItem('heroio_installed', JSON.stringify(updated))
    setInstalled(updated)
    toast(`${app.title} has been uninstalled`, {
      icon: '🗑️',
      style: { background: '#1c1c28', color: '#f0f0f8', border: '1px solid #2a2a3a' }
    })
  }

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <section className={styles.titleSection}>
        <div className={styles.container}>
          <div className={styles.titleBg}><div className={styles.orb} /></div>
          <div className={styles.badge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            </svg>
            My Library
          </div>
          <h1 className={styles.title}>My Installation</h1>
          <p className={styles.subtitle}>
            {installed.length > 0
              ? `You have ${installed.length} app${installed.length > 1 ? 's' : ''} installed.`
              : 'Browse apps and install your favorites.'}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className={styles.content}>
        <div className={styles.container}>
          {installed.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIllustration}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <path d="M12 22V12M3.27 6.96L12 12.01l8.73-5.05" opacity="0.4"/>
                </svg>
              </div>
              <h2>No Apps Installed</h2>
              <p>You haven't installed any apps yet. Explore our catalog and install your favorites!</p>
              <button className={styles.exploreBtn} onClick={() => navigate('/apps')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Browse Apps
              </button>
            </div>
          ) : (
            <>
              <div className={styles.statsBar}>
                <div className={styles.statChip}>
                  <span className={styles.statNum}>{installed.length}</span>
                  <span className={styles.statLbl}>installed</span>
                </div>
                <div className={styles.statChip}>
                  <span className={styles.statNum}>
                    {installed.reduce((s, a) => s + a.size, 0)} MB
                  </span>
                  <span className={styles.statLbl}>total size</span>
                </div>
              </div>

              <div className={styles.grid}>
                {installed.map((app, i) => (
                  <div
                    key={app.id}
                    className={styles.appCard}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div
                      className={styles.cardClickable}
                      onClick={() => navigate(`/apps/${app.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && navigate(`/apps/${app.id}`)}
                    >
                      <div className={styles.imgWrap}>
                        <img src={app.image} alt={app.title} width={52} height={52} />
                        <div className={styles.installedBadge}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20,6 9,17 4,12"/>
                          </svg>
                        </div>
                      </div>
                      <div className={styles.appInfo}>
                        <h3 className={styles.appTitle}>{app.title}</h3>
                        <p className={styles.appCompany}>{app.companyName}</p>
                        <div className={styles.appMeta}>
                          <span className={styles.rating}>
                            ★ {app.ratingAvg.toFixed(1)}
                          </span>
                          <span>·</span>
                          <span className={styles.size}>{app.size} MB</span>
                          <span>·</span>
                          <span className={styles.downloads}>{formatNum(app.downloads)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className={styles.uninstallBtn}
                      onClick={(e) => { e.stopPropagation(); handleUninstall(app); }}
                      aria-label={`Uninstall ${app.title}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                      </svg>
                      Uninstall
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.moreSection}>
                <p>Looking for more apps?</p>
                <button className={styles.moreBtn} onClick={() => navigate('/apps')}>
                  Browse All Apps →
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
