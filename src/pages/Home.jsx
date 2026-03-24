import { useNavigate, Link } from 'react-router-dom'
import { appsData } from '../data/apps'
import AppCard from '../components/AppCard'
import styles from './Home.module.css'

function StatCard({ value, label, icon }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const topApps = appsData.slice(0, 8)
  const totalDownloads = appsData.reduce((s, a) => s + a.downloads, 0)
  const totalReviews = appsData.reduce((s, a) => s + a.reviews, 0)

  return (
    <div className={styles.page}>
      {/* BANNER */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>
        <div className={styles.bannerContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Discover · Install · Explore
          </div>
          <h1 className={styles.bannerHeading}>
            Your Universe of<br />
            <span className={styles.highlight}>Powerful Apps</span>
          </h1>
          <p className={styles.bannerSub}>
            Explore {appsData.length}+ handpicked applications trusted by millions. From productivity to entertainment — find your next favorite app.
          </p>
          <div className={styles.bannerBtns}>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76a2 2 0 001.96-.19l11.62-6.54-2.84-2.84-10.74 9.57zM20.53 10.41L16.7 8.24 13.54 11.4l3.16 3.16 3.85-2.18a1.68 1.68 0 000-1.97zM1.14.43A1.68 1.68 0 000 1.98v20.04a1.68 1.68 0 001.14 1.55l12-12L1.14.43zM5.14.43L16.7 7.8l-3.16 3.16L5.14.43z"/>
              </svg>
              Play Store
            </a>
          </div>
        </div>
        <div className={styles.bannerFloat}>
          {appsData.slice(0, 5).map((app, i) => (
            <div key={app.id} className={styles.floatCard} style={{ animationDelay: `${i * 0.15}s` }}>
              <img src={app.image} alt={app.title} width={40} height={40} />
              <div>
                <p className={styles.floatTitle}>{app.title}</p>
                <p className={styles.floatRating}>★ {app.ratingAvg}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <StatCard
              value={`${appsData.length}+`}
              label="Apps Available"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="1.8">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              }
            />
            <StatCard
              value={`${(totalDownloads / 1000000).toFixed(0)}M+`}
              label="Total Downloads"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              }
            />
            <StatCard
              value={`${(totalReviews / 1000).toFixed(0)}K+`}
              label="User Reviews"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* TOP APPS */}
      <section className={styles.appsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Top Apps</h2>
              <p className={styles.sectionSub}>Most downloaded and highest rated apps this week</p>
            </div>
            <Link to="/apps" className={styles.showAllBtn}>
              Show All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className={styles.appsGrid}>
            {topApps.map((app, i) => (
              <AppCard key={app.id} app={app} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaOrb} />
            <div className={styles.ctaText}>
              <h2>Ready to explore all {appsData.length} apps?</h2>
              <p>Browse our full catalog, search by name, and find your next essential app.</p>
            </div>
            <button className={styles.btnPrimary} onClick={() => navigate('/apps')}>
              Browse All Apps
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
