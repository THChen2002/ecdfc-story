import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthContext } from '@/contexts/AuthContext'
import { useImageUpload } from '@/hooks/useImageUpload'
import Button from '@/components/common/Button/Button'
import ImageUploader from '@/components/admin/ImageUploader/ImageUploader'
import s from '@/styles/admin.module.css'

const NEWS_CATS = [
  { value: '活動', label: '活動' },
  { value: '公告', label: '公告' },
  { value: '成果', label: '成果' },
  { value: '其他', label: '其他' },
]

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
}

export default function AdminNewsEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const isNew = id === 'new'
  const { upload, uploading, progress } = useImageUpload()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [pendingFile, setPendingFile] = useState(null)
  const [form, setForm] = useState({
    title: '',
    category: '公告',
    content: '',
    coverImage: '',
    pinned: false,
    published: false,
    publishDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (isNew) return
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, 'news', id))
        if (snap.exists()) {
          const data = snap.data()
          let pubDate = new Date().toISOString().split('T')[0]
          if (data.publishDate?.toDate) {
            pubDate = data.publishDate.toDate().toISOString().split('T')[0]
          }
          setForm({
            title: data.title || '',
            category: data.category || '公告',
            content: data.content || '',
            coverImage: data.coverImage || '',
            pinned: data.pinned || false,
            published: data.published || false,
            publishDate: pubDate,
          })
        }
      } catch (err) {
        console.error('Fetch news error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, isNew])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!form.title.trim()) return alert('請填寫標題')
    setSaving(true)
    try {
      let coverImage = form.coverImage
      if (pendingFile) {
        coverImage = await upload(pendingFile, 'news')
        if (!coverImage) {
          setSaving(false)
          return alert('圖片上傳失敗，請重試')
        }
      }
      const payload = {
        title: form.title.trim(),
        category: form.category,
        content: form.content,
        coverImage,
        pinned: form.pinned,
        published: form.published,
        publishDate: Timestamp.fromDate(new Date(form.publishDate)),
        updatedAt: serverTimestamp(),
      }
      if (isNew) {
        payload.createdAt = serverTimestamp()
        payload.createdBy = user?.email || ''
        await addDoc(collection(db, 'news'), payload)
      } else {
        await updateDoc(doc(db, 'news', id), payload)
      }
      navigate('/admin/news')
    } catch (err) {
      console.error('Save error:', err)
      alert('儲存失敗，請重試')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className={s.loadingBox}>載入中...</div>
  }

  return (
    <div>
      <div className={s.pageHeader}>
        <div className={s.pageHeaderLeft}>
          <button onClick={() => navigate('/admin/news')} className={s.backBtn}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className={s.pageTitle}>{isNew ? '新增公告' : '編輯公告'}</h1>
        </div>
        <div className={s.pageActions}>
          <Button variant="ghost" onClick={() => navigate('/admin/news')} icon={faTimes}>
            取消
          </Button>
          <Button onClick={handleSave} loading={saving} icon={faSave}>
            {isNew ? '建立' : '儲存'}
          </Button>
        </div>
      </div>

      <div className={s.editGrid}>
        {/* Main column */}
        <div className={s.editColumn}>
          <div className={s.card}>
            <label className={s.label}>標題</label>
            <input
              className={s.input}
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="輸入公告標題"
            />
          </div>
          <div className={s.card}>
            <label className={s.label}>內容</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={(val) => handleChange('content', val)}
              modules={quillModules}
              placeholder="撰寫公告內容..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className={s.editColumn}>
          <div className={s.card}>
            <label className={s.label}>封面圖片</label>
            <ImageUploader
              value={form.coverImage}
              pendingFile={pendingFile}
              onFileSelect={(file) => setPendingFile(file)}
              onRemove={() => { setPendingFile(null); handleChange('coverImage', '') }}
              uploading={uploading}
              progress={progress}
            />
          </div>
          <div className={s.card}>
            <div className={s.fieldRow}>
              <label className={s.label}>分類</label>
              <select
                className={s.input}
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {NEWS_CATS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className={s.fieldRow}>
              <label className={s.label}>發布日期</label>
              <input
                type="date"
                className={s.input}
                value={form.publishDate}
                onChange={(e) => handleChange('publishDate', e.target.value)}
              />
            </div>
            <div className={s.fieldRow}>
              <label className={s.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(e) => handleChange('pinned', e.target.checked)}
                  className={`${s.checkbox} ${s.checkboxPin}`}
                />
                <span className={s.checkboxText}>置頂公告</span>
              </label>
            </div>
            <div>
              <label className={s.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => handleChange('published', e.target.checked)}
                  className={s.checkbox}
                />
                <span className={s.checkboxText}>公開發布</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
