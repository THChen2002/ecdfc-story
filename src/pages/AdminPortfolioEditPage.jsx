import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthContext } from '@/contexts/AuthContext'
import { useImageUpload } from '@/hooks/useImageUpload'
import Button from '@/components/common/Button/Button'
import ImageUploader from '@/components/admin/ImageUploader/ImageUploader'

const CATEGORIES = [
  { value: 'dfc-sdgs', label: 'DFC-SDGs' },
  { value: 'dfc-sel', label: 'DFC-SEL' },
]

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
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

export default function AdminPortfolioEditPage() {
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
    category: 'dfc-sdgs',
    summary: '',
    content: '',
    coverImage: '',
    tags: '',
    year: new Date().getFullYear(),
    published: false,
    order: 0,
  })

  useEffect(() => {
    if (isNew) return
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, 'portfolios', id))
        if (snap.exists()) {
          const data = snap.data()
          setForm({
            title: data.title || '',
            category: data.category || 'dfc-sdgs',
            summary: data.summary || '',
            content: data.content || '',
            coverImage: data.coverImage || '',
            tags: (data.tags || []).join(', '),
            year: data.year || new Date().getFullYear(),
            published: data.published || false,
            order: data.order || 0,
          })
        }
      } catch (err) {
        console.error('Fetch portfolio error:', err)
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
        coverImage = await upload(pendingFile, 'portfolios')
        if (!coverImage) {
          setSaving(false)
          return alert('圖片上傳失敗，請重試')
        }
      }
      const payload = {
        title: form.title.trim(),
        category: form.category,
        summary: form.summary.trim(),
        content: form.content,
        coverImage,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        year: Number(form.year),
        published: form.published,
        order: Number(form.order),
        updatedAt: serverTimestamp(),
      }
      if (isNew) {
        payload.createdAt = serverTimestamp()
        payload.createdBy = user?.email || ''
        await addDoc(collection(db, 'portfolios'), payload)
      } else {
        await updateDoc(doc(db, 'portfolios', id), payload)
      }
      navigate('/admin/portfolio')
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
            onClick={() => navigate('/admin/portfolio')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: '1.25rem' }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {isNew ? '新增成果' : '編輯成果'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="ghost" onClick={() => navigate('/admin/portfolio')} icon={faTimes}>
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
              placeholder="輸入成果標題"
            />
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(91,184,212,0.08)' }}>
            <label style={labelStyle}>摘要</label>
            <textarea
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              value={form.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="簡短描述此成果"
            />
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(91,184,212,0.08)' }}>
            <label style={labelStyle}>內容</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={(val) => handleChange('content', val)}
              modules={quillModules}
              placeholder="撰寫成果內容..."
              style={{ borderRadius: '12px' }}
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
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>年份</label>
              <input
                type="number"
                style={inputStyle}
                value={form.year}
                onChange={(e) => handleChange('year', e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>排序</label>
              <input
                type="number"
                style={inputStyle}
                value={form.order}
                onChange={(e) => handleChange('order', e.target.value)}
                placeholder="數字越小越前面"
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>標籤（以逗號分隔）</label>
              <input
                style={inputStyle}
                value={form.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="例如：SDGs, 環境教育, 課程設計"
              />
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
