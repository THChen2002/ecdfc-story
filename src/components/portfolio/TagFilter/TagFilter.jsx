import { useState, useMemo, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './TagFilter.module.css'

const MAX_SUGGESTIONS = 8

export default function TagFilter({ allTags, selectedTags, onChange }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const wrapRef = useRef(null)

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allTags
      .filter((t) => !selectedTags.includes(t) && t.toLowerCase().includes(q))
      .slice(0, MAX_SUGGESTIONS)
  }, [query, allTags, selectedTags])

  // 點擊外部關閉建議清單
  useEffect(() => {
    const handleClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectTag = (tag) => {
    onChange([...selectedTags, tag])
    setQuery('')
    setOpen(false)
  }

  const removeTag = (tag) => {
    onChange(selectedTags.filter((t) => t !== tag))
  }

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && suggestions[highlight]) selectTag(suggestions[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showList = open && query.trim() !== ''

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="portfolio-tag-filter">
          標籤
        </label>
        <div className={styles.searchBox}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
          <input
            id="portfolio-tag-filter"
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
              setHighlight(0)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="搜尋標籤"
            autoComplete="off"
            role="combobox"
            aria-expanded={showList}
            aria-controls="portfolio-tag-suggestions"
          />
          {showList && (
            <ul id="portfolio-tag-suggestions" className={styles.list} role="listbox">
              {suggestions.length === 0 ? (
                <li className={styles.empty}>找不到符合的標籤</li>
              ) : (
                suggestions.map((tag, i) => (
                  <li
                    key={tag}
                    role="option"
                    aria-selected={i === highlight}
                    className={`${styles.option} ${i === highlight ? styles.optionActive : ''}`}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      selectTag(tag)
                    }}
                  >
                    {tag}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className={styles.selected}>
          {selectedTags.map((tag) => (
            <span key={tag} className={styles.chip}>
              {tag}
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeTag(tag)}
                aria-label={`移除標籤 ${tag}`}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </span>
          ))}
          <button type="button" className={styles.clear} onClick={() => onChange([])}>
            清除標籤
          </button>
        </div>
      )}
    </div>
  )
}
