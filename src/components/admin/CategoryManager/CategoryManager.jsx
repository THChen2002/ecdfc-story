import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button/Button'
import {
  getPortfolioCategories,
  createPortfolioCategory,
  updatePortfolioCategory,
  deletePortfolioCategory,
  countPortfoliosUsingCategory,
} from '@/services/categoryService'
import s from '@/styles/admin.module.css'
import local from './CategoryManager.module.css'

const blankForm = { label: '' }

export default function CategoryManager({ isOpen, onClose, onChanged }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null) // null=未編輯, 'new'=新增, '<id>'=編輯
  const [form, setForm] = useState(blankForm)
  const [saving, setSaving] = useState(false)
  const [reordering, setReordering] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, label, usedCount }

  const refresh = async () => {
    setLoading(true)
    try {
      const data = await getPortfolioCategories()
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      refresh()
      setEditingId(null)
      setForm(blankForm)
    }
  }, [isOpen])

  const startCreate = () => {
    setEditingId('new')
    setForm({ label: '' })
  }

  const startEdit = (cat) => {
    setEditingId(cat.id)
    setForm({ label: cat.label })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(blankForm)
  }

  const handleSave = async () => {
    if (!form.label.trim()) {
      alert('請填寫分類名稱')
      return
    }
    setSaving(true)
    try {
      if (editingId === 'new') {
        // 取現有 order 最大值 + 1，避免與舊資料衝突（舊資料 order 可能從 1 起算）
        const nextOrder = categories.length
          ? Math.max(...categories.map((c) => c.order ?? 0)) + 1
          : 0
        await createPortfolioCategory({ label: form.label, order: nextOrder })
      } else {
        // 編輯時保留原本的 order，不在此調整
        const current = categories.find((c) => c.id === editingId)
        await updatePortfolioCategory(editingId, {
          label: form.label,
          order: current?.order ?? 0,
        })
      }
      await refresh()
      onChanged?.()
      cancelEdit()
    } catch (err) {
      console.error('Save category error:', err)
      alert('儲存失敗，請重試')
    } finally {
      setSaving(false)
    }
  }

  /**
   * 交換兩筆分類的順序後，以新陣列的 index 重新正規化 order
   * （避免重複 / 跳號 / 衝突，與 AdminTeamPage 的 reorder pattern 一致）。
   */
  const handleMove = async (index, direction) => {
    if (reordering || editingId !== null) return
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= categories.length) return

    const swapped = [...categories]
    ;[swapped[index], swapped[target]] = [swapped[target], swapped[index]]

    const updates = []
    const normalized = swapped.map((c, i) => {
      if (c.order !== i) {
        updates.push({ id: c.id, order: i, label: c.label })
        return { ...c, order: i }
      }
      return c
    })

    setReordering(true)
    const prev = categories
    setCategories(normalized)
    try {
      await Promise.all(
        updates.map((u) =>
          updatePortfolioCategory(u.id, { label: u.label, order: u.order })
        )
      )
      onChanged?.()
    } catch (err) {
      console.error('Reorder category error:', err)
      alert('調整順序失敗，請重試')
      setCategories(prev)
    } finally {
      setReordering(false)
    }
  }

  const askDelete = async (cat) => {
    try {
      const used = await countPortfoliosUsingCategory(cat.id)
      setDeleteTarget({ id: cat.id, label: cat.label, usedCount: used })
    } catch (err) {
      console.error('Count error:', err)
      setDeleteTarget({ id: cat.id, label: cat.label, usedCount: 0 })
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setSaving(true)
    try {
      await deletePortfolioCategory(deleteTarget.id)
      await refresh()
      onChanged?.()
      setDeleteTarget(null)
    } catch (err) {
      console.error('Delete category error:', err)
      alert('刪除失敗，請重試')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="管理成果分類" size="md">
        <div className={local.header}>
          <p className={local.hint}>用上下箭頭調整順序，前台會同步更新。</p>
          {editingId === null && (
            <Button
              size="sm"
              icon={faPlus}
              onClick={startCreate}
              className={local.headerButton}
            >
              新增分類
            </Button>
          )}
        </div>

        {loading ? (
          <p className={local.empty}>載入中...</p>
        ) : (
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.thCenter} style={{ width: '90px' }}>順序</th>
                <th>名稱</th>
                <th className={s.thCenter} style={{ width: '120px' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {editingId === 'new' && (
                <CategoryFormRow
                  form={form}
                  setForm={setForm}
                  saving={saving}
                  onSave={handleSave}
                  onCancel={cancelEdit}
                />
              )}
              {categories.map((cat, idx) =>
                editingId === cat.id ? (
                  <CategoryFormRow
                    key={cat.id}
                    form={form}
                    setForm={setForm}
                    saving={saving}
                    onSave={handleSave}
                    onCancel={cancelEdit}
                  />
                ) : (
                  <tr key={cat.id}>
                    <td className={s.tdCenter}>
                      <div className={s.reorderGroup}>
                        <button
                          onClick={() => handleMove(idx, 'up')}
                          disabled={idx === 0 || reordering || editingId !== null}
                          title="上移"
                          className={s.reorderBtn}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          onClick={() => handleMove(idx, 'down')}
                          disabled={idx === categories.length - 1 || reordering || editingId !== null}
                          title="下移"
                          className={s.reorderBtn}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </td>
                    <td className={s.tdBold}>{cat.label}</td>
                    <td className={s.tdCenter}>
                      <div className={s.actions}>
                        <button
                          className={`${s.iconBtn} ${s.iconBtnEdit}`}
                          title="編輯"
                          onClick={() => startEdit(cat)}
                          disabled={editingId !== null || reordering}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className={`${s.iconBtn} ${s.iconBtnDelete}`}
                          title="刪除"
                          onClick={() => askDelete(cat)}
                          disabled={editingId !== null || reordering}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
              {categories.length === 0 && editingId !== 'new' && (
                <tr>
                  <td colSpan={3} className={local.empty}>尚無分類，點擊「新增分類」開始建立。</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className={s.modalActions} style={{ marginTop: '1.5rem' }}>
          <Button variant="ghost" onClick={onClose}>關閉</Button>
        </div>
      </Modal>

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="確認刪除分類"
        size="sm"
      >
        <p className={s.modalText}>
          確定要刪除分類「{deleteTarget?.label}」嗎？
          {deleteTarget?.usedCount > 0 && (
            <>
              <br />
              此分類目前被 <strong>{deleteTarget.usedCount}</strong> 筆成果使用，刪除後這些成果將改為「未分類」。
            </>
          )}
        </p>
        <div className={s.modalActions}>
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>取消</Button>
          <Button variant="danger" onClick={confirmDelete} loading={saving}>確認刪除</Button>
        </div>
      </Modal>
    </>
  )
}

function CategoryFormRow({ form, setForm, saving, onSave, onCancel }) {
  return (
    <tr>
      <td className={s.tdCenter} style={{ color: '#bbb' }}>—</td>
      <td>
        <input
          className={s.input}
          value={form.label}
          onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
          placeholder="分類名稱"
          autoFocus
        />
      </td>
      <td className={s.tdCenter}>
        <div className={s.actions}>
          <button
            className={`${s.iconBtn} ${s.iconBtnEdit}`}
            title="儲存"
            onClick={onSave}
            disabled={saving}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className={`${s.iconBtn} ${s.iconBtnDelete}`}
            title="取消"
            onClick={onCancel}
            disabled={saving}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </td>
    </tr>
  )
}
