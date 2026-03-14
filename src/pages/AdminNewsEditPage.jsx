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

const inputStyle = {
  width: '100%',
  padding: '0.625rem 0.875rem',
  border: '2px solid #d6e4eb',
  borderRadius: '12px',
  fontSize: '0.9375rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: '0.2s',
}

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: '#2d3436',
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
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>載入中...</div>
    )
  }

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/admin/news')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: '1.25rem' }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {isNew ? '新增公告' : '編輯公告'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="ghost" onClick={() => navigate('/admin/news')} icon={faTimes}>
            取消
          </Button>
          <Button onClick={handleSave} loading={saving} icon={faSave}>
            {isNew ? '建立' : '儲存'}
          </Button>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem',
        alignItems: 'start',
      }}>
        {/* Main column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(91,184,212,0.08)' }}>
            <label style={labelStyle}>標題</label>
            <input
              style={inputStyle}
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="輸入公告標題"
            />
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(91,184,212,0.08)' }}>
            <label style={labelStyle}>內容</label>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(91,184,212,0.08)' }}>
            <label style={labelStyle}>封面圖片</label>
            <ImageUploader
              value={form.coverImage}
              pendingFile={pendingFile}
              onFileSelect={(file) => setPendingFile(file)}
              onRemove={() => { setPendingFile(null); handleChange('coverImage', '') }}
              uploading={uploading}
              progress={progress}
            />
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(91,184,212,0.08)' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>分類</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {NEWS_CATS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>發布日期</label>
              <input
                type="date"
                style={inputStyle}
                value={form.publishDate}
                onChange={(e) => handleChange('publishDate', e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(e) => handleChange('pinned', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#f2994a' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>置頂公告</span>
              </label>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => handleChange('published', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#5bb8d4' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>公開發布</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
