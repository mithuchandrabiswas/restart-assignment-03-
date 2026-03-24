import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.bg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>
        <div className={styles.content}>
          <div className={styles.codeWrap}>
            <span className={styles.fourOhFour}>404</span>
          </div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.sub}>
            Looks like this page drifted into the void. It might have been moved,
            deleted, or never existed in the first place.
          </p>
          <div className={styles.actions}>
            <button className={styles.primary} onClick={() => navigate('/')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Back to Home
            </button>
            <button className={styles.secondary} onClick={() => navigate('/apps')}>
              Browse Apps
            </button>
          </div>
          <div className={styles.links}>
            <span>Quick links:</span>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/apps')}>All Apps</button>
            <button onClick={() => navigate('/installation')}>Installation</button>
          </div>
        </div>
      </div>
    </div>
  )
}
