import { useState, useEffect, useMemo } from 'react'
import { appsData } from '../data/apps'
import AppCard from '../components/AppCard'
import styles from './AllApps.module.css'

export default function AllApps() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [loading, setLoading] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setDebouncedSearch(search)
      setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [search])

  const filtered = useMemo(() => {
    let list = appsData.filter(a =>
      a.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    if (sort === 'high-low') list = [...list].sort((a, b) => b.downloads - a.downloads)
    if (sort === 'low-high') list = [...list].sort((a, b) => a.downloads - b.downloads)
    return list
  }, [debouncedSearch, sort])

  return (
    <div className={styles.page}>
      {/* TITLE */}
      <section className={styles.titleSection}>
        <div className={styles.container}>
          <div className={styles.titleBg}>
            <div className={styles.orb} />
          </div>
          <div className={styles.badge}>All Applications</div>
          <h1 className={styles.title}>Discover Every App</h1>
          <p className={styles.subtitle}>
            Browse our complete catalog of {appsData.length} handpicked, top-rated applications.
          </p>
        </div>
      </section>

      {/* SEARCH + CONTROLS */}
      <section className={styles.controlsSection}>
        <div className={styles.container}>
          <div className={styles.controls}>
            <div className={styles.countBadge}>
              <span className={styles.countNum}>{loading ? '...' : filtered.length}</span>
              <span className={styles.countLabel}>{filtered.length === 1 ? 'app' : 'apps'} found</span>
            </div>
            <div className={styles.right}>
              <div className={styles.searchWrap}>
                <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search apps..."
                  className={styles.searchInput}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Clear">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <option value="default">Sort: Default</option>
                <option value="high-low">Downloads: High → Low</option>
                <option value="low-high">Downloads: Low → High</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* APPS GRID */}
      <section className={styles.appsSection}>
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loadingGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.skeleton} style={{ animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  <path d="M8 11h6M11 8v6" opacity="0.4"/>
                </svg>
              </div>
              <h3>No App Found</h3>
              <p>No apps match <strong>"{search}"</strong>. Try a different search term.</p>
              <button className={styles.resetBtn} onClick={() => setSearch('')}>Clear Search</button>
            </div>
          ) : (
            <div className={styles.appsGrid}>
              {filtered.map((app, i) => (
                <AppCard key={app.id} app={app} delay={i * 40} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
