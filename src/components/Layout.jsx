import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Layout.module.css'

function PageLoader() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900)
    return () => clearTimeout(t)
  }, [])
  if (!visible) return null
  return (
    <div className="page-loader">
      <div className={styles.loaderLogo}>
        <span>H</span>
        <div className="loader-ring" style={{ position: 'absolute', width: 64, height: 64, top: -8, left: -8 }} />
      </div>
    </div>
  )
}

export default function Layout() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey(k => k + 1)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.app}>
      <PageLoader key={key} />

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L13.5 7H17L14 11L15.5 16L10 13.5L4.5 16L6 11L3 7H6.5L10 2Z" fill="#7c5cfc" stroke="#a78bfa" strokeWidth="0.5"/>
              </svg>
            </div>
            <span className={styles.logoText}>Hero <span>IO</span></span>
          </Link>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            <NavLink to="/" end className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink>
            <NavLink to="/apps" className={({isActive}) => isActive ? styles.active : ''}>Apps</NavLink>
            <NavLink to="/installation" className={({isActive}) => isActive ? styles.active : ''}>Installation</NavLink>
          </nav>

          <div className={styles.headerRight}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contributeBtn}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Contribution
            </a>
            <button className={styles.menuBtn} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <span className={menuOpen ? styles.x1 : ''} />
              <span className={menuOpen ? styles.x2 : ''} />
              <span className={menuOpen ? styles.x3 : ''} />
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main} key={location.pathname}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link to="/" className={styles.logo}>
                <div className={styles.logoIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L13.5 7H17L14 11L15.5 16L10 13.5L4.5 16L6 11L3 7H6.5L10 2Z" fill="#7c5cfc" stroke="#a78bfa" strokeWidth="0.5"/>
                  </svg>
                </div>
                <span className={styles.logoText}>Hero <span>IO</span></span>
              </Link>
              <p className={styles.footerTagline}>Your gateway to discovering the world's best apps. Curated, ranked, and loved by millions.</p>
              <div className={styles.socials}>
                {['github','twitter','discord','youtube'].map(s => (
                  <a key={s} href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label={s}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" opacity="0.15"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerCol}>
                <h4>Explore</h4>
                <Link to="/">Home</Link>
                <Link to="/apps">All Apps</Link>
                <Link to="/installation">My Installation</Link>
              </div>
              <div className={styles.footerCol}>
                <h4>Categories</h4>
                <a href="#">Productivity</a>
                <a href="#">Entertainment</a>
                <a href="#">Health & Fitness</a>
                <a href="#">Finance</a>
              </div>
              <div className={styles.footerCol}>
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Blog</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2025 Hero IO. Crafted with ♥ for app lovers everywhere.</p>
            <div className={styles.footerStores}>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76a2 2 0 001.96-.19l11.62-6.54-2.84-2.84-10.74 9.57zM20.53 10.41L16.7 8.24 13.54 11.4l3.16 3.16 3.85-2.18a1.68 1.68 0 000-1.97zM1.14.43A1.68 1.68 0 000 1.98v20.04a1.68 1.68 0 001.14 1.55l12-12L1.14.43zM5.14.43L16.7 7.8l-3.16 3.16L5.14.43z"/></svg>
                Play Store
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
