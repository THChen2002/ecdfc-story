import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './TagInput.module.css'

const normalize = (tag) => tag.trim().toLowerCase()

export default function TagInput({ value = [], onChange, placeholder }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  // 回傳是否成功新增（空字串視為成功，方便 blur 時清空）
  const addTag = (raw) => {
    const tag = raw.trim()
    if (!tag) return true
    if (value.some((t) => normalize(t) === normalize(tag))) {
      setError(`「${tag}」已存在，請勿重複新增`)
      return false
    }
    onChange([...value, tag])
    setError('')
    return true
  }

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index))
    setError('')
  }

  const handleKeyDown = (e) => {
    // 中文輸入法選字時按 Enter 不應送出標籤
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter' || e.key === ',' || e.key === '，') {
      e.preventDefault()
      if (addTag(input)) setInput('')
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  const handleChange = (e) => {
    const next = e.target.value
    // 貼上含逗號的文字時，逐一拆成標籤
    if (/[,，]/.test(next)) {
      const parts = next.split(/[,，]/)
      const rest = parts.pop()
      const added = [...value]
      let dup = ''
      parts.forEach((p) => {
        const tag = p.trim()
        if (!tag) return
        if (added.some((t) => normalize(t) === normalize(tag))) dup = tag
        else added.push(tag)
      })
      onChange(added)
      setError(dup ? `「${dup}」已存在，請勿重複新增` : '')
      setInput(rest)
      return
    }
    setInput(next)
    if (error) setError('')
  }

  const handleBlur = () => {
    if (addTag(input)) setInput('')
  }

  return (
    <div>
      <div className={`${styles.box} ${error ? styles.boxError : ''}`}>
        {value.map((tag, i) => (
          <span key={tag} className={styles.chip}>
            {tag}
            <button
              type="button"
              className={styles.remove}
              onClick={() => removeTag(i)}
              aria-label={`移除標籤 ${tag}`}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </span>
        ))}
        <input
          className={styles.input}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </div>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <p className={styles.hint}>輸入後按 Enter 或逗號新增標籤</p>
      )}
    </div>
  )
}
