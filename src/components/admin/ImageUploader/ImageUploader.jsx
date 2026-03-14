import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faTimes, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { validateImageFile } from '@/utils/validators'
import styles from './ImageUploader.module.css'

/**
 * ImageUploader：選圖時只做本地預覽，不上傳。
 *
 * Props:
 *   value        - 已有的遠端圖片 URL（編輯模式）
 *   pendingFile  - 暫存的 File 物件（由父元件管理）
 *   onFileSelect - 選擇檔案時的 callback，回傳 File 物件
 *   onRemove     - 移除圖片時的 callback
 *   uploading    - 是否正在上傳（由父元件控制）
 *   progress     - 上傳進度 0-100
 */
export default function ImageUploader({
  value,
  pendingFile,
  onFileSelect,
  onRemove,
  uploading = false,
  progress = 0,
}) {
  const fileRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)

  const handleFile = (file) => {
    if (!file) return
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error)
      return
    }
    setError(null)
    onFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleRemove = () => {
    setError(null)
    if (fileRef.current) fileRef.current.value = ''
    onRemove()
  }

  // 有遠端 URL 或有本地暫存檔案 → 顯示預覽
  const previewSrc = pendingFile
    ? URL.createObjectURL(pendingFile)
    : value || null

  if (previewSrc) {
    return (
      <div className={styles.preview}>
        <img src={previewSrc} alt="上傳圖片" className={styles.previewImg} />
        {uploading ? (
          <div className={styles.uploading}>
            <FontAwesomeIcon icon={faSpinner} spin className={styles.uploadIcon} />
            <span>{Math.round(progress)}%</span>
          </div>
        ) : (
          <button className={styles.removeBtn} onClick={handleRemove} type="button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    )
  }

  return (
    <div>
      <div
        className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <FontAwesomeIcon icon={faCloudUploadAlt} className={styles.uploadIcon} />
        <p className={styles.uploadText}>點擊或拖曳圖片上傳</p>
        <p className={styles.uploadHint}>支援 JPG、PNG，上限 5MB</p>
      </div>
      {error && (
        <div className={styles.error}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
