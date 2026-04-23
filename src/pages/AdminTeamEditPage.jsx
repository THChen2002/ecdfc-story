import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useImageUpload } from '@/hooks/useImageUpload'
import Button from '@/components/common/Button/Button'
import ImageUploader from '@/components/admin/ImageUploader/ImageUploader'
import {
  getTeamMemberById,
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
} from '@/services/teamService'
import s from '@/styles/admin.module.css'

export default function AdminTeamEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const { upload, uploading, progress } = useImageUpload()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [pendingFile, setPendingFile] = useState(null)
  const [form, setForm] = useState({
    name: '',
    title: '',
    role: '',
    bio: '',
    avatar: '',
    order: 0,
    visible: true,
  })

  useEffect(() => {
    if (isNew) return
    const fetchData = async () => {
      try {
        const data = await getTeamMemberById(id)
        if (data) {
          setForm({
            name: data.name || '',
            title: data.title || '',
            role: data.role || '',
            bio: data.bio || '',
            avatar: data.avatar || '',
            order: data.order ?? 0,
            visible: data.visible ?? true,
          })
        }
      } catch (err) {
        console.error('Fetch team member error:', err)
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
    if (!form.name.trim()) return alert('請填寫姓名')
    setSaving(true)
    try {
      let avatar = form.avatar
      if (pendingFile) {
        avatar = await upload(pendingFile, 'team')
        if (!avatar) {
          setSaving(false)
          return alert('圖片上傳失敗，請重試')
        }
      }
      const payload = {
        name: form.name.trim(),
        title: form.title.trim(),
        role: form.role.trim(),
        bio: form.bio.trim(),
        avatar,
        visible: form.visible,
      }
      if (isNew) {
        // 新增成員時自動排到最後一位
        const existing = await getTeamMembers()
        payload.order = existing.length
        await createTeamMember(payload)
      } else {
        // 編輯時保留既有的 order，由列表頁的上下箭頭調整
        payload.order = Number(form.order) || 0
        await updateTeamMember(id, payload)
      }
      navigate('/admin/team')
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
          <button onClick={() => navigate('/admin/team')} className={s.backBtn}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className={s.pageTitle}>{isNew ? '新增團隊成員' : '編輯團隊成員'}</h1>
        </div>
        <div className={s.pageActions}>
          <Button variant="ghost" onClick={() => navigate('/admin/team')} icon={faTimes}>
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
            <label className={s.label}>姓名</label>
            <input
              className={s.input}
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="輸入成員姓名"
            />
          </div>
          <div className={s.card}>
            <div className={s.fieldRow}>
              <label className={s.label}>職稱</label>
              <input
                className={s.input}
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="例：計畫主持人、副教授"
              />
            </div>
            <div>
              <label className={s.label}>角色</label>
              <input
                className={s.input}
                value={form.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="例：總計畫主持人、研究助理"
              />
            </div>
          </div>
          <div className={s.card}>
            <label className={s.label}>簡介</label>
            <textarea
              className={`${s.input} ${s.textareaTall}`}
              value={form.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="成員簡介（研究專長、經歷等）"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className={s.editColumn}>
          <div className={s.card}>
            <label className={s.label}>大頭照</label>
            <ImageUploader
              value={form.avatar}
              pendingFile={pendingFile}
              onFileSelect={(file) => setPendingFile(file)}
              onRemove={() => { setPendingFile(null); handleChange('avatar', '') }}
              uploading={uploading}
              progress={progress}
            />
          </div>
          <div className={s.card}>
            <label className={s.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => handleChange('visible', e.target.checked)}
                className={s.checkbox}
              />
              <span className={s.checkboxText}>於前台顯示</span>
            </label>
            <p className={s.fieldHint}>
              顯示順序請於成員列表頁用上下箭頭調整。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
