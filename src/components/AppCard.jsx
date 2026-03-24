import { useNavigate } from 'react-router-dom'
import styles from './AppCard.module.css'

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

export default function AppCard({ app, delay = 0 }) {
  const navigate = useNavigate()

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/apps/${app.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/apps/${app.id}`)}
    >
      <div className={styles.imgWrap}>
        <img src={app.image} alt={app.title} width={56} height={56} loading="lazy" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{app.title}</h3>
        <p className={styles.company}>{app.companyName}</p>
        <div className={styles.meta}>
          <span className={styles.rating}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {app.ratingAvg.toFixed(1)}
          </span>
          <span className={styles.dot}>·</span>
          <span className={styles.downloads}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            {formatNum(app.downloads)}
          </span>
        </div>
      </div>
      <div className={styles.arrow}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  )
}
