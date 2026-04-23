import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faEyeSlash,
  faUser,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/common/Button/Button'
import Modal from '@/components/common/Modal/Modal'
import Loading from '@/components/common/Loading/Loading'
import {
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from '@/services/teamService'
import s from '@/styles/admin.module.css'

export default function AdminTeamPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [reordering, setReordering] = useState(false)
  const navigate = useNavigate()

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const data = await getTeamMembers()
      setMembers(data)
    } catch (err) {
      console.error('Fetch team members error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleMove = async (index, direction) => {
    if (reordering) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= members.length) return

    const swapped = [...members]
    ;[swapped[index], swapped[targetIndex]] = [swapped[targetIndex], swapped[index]]

    // 以新陣列索引為準重新正規化 order，順便自動修復重複或缺號
    const updates = []
    const normalized = swapped.map((m, i) => {
      if (m.order !== i) {
        updates.push({ id: m.id, order: i })
        return { ...m, order: i }
      }
      return m
    })

    setReordering(true)
    const prev = members
    setMembers(normalized)
    try {
      await Promise.all(
        updates.map((u) => updateTeamMember(u.id, { order: u.order }))
      )
    } catch (err) {
      console.error('Reorder error:', err)
      alert('調整順序失敗，請重試')
      setMembers(prev)
    } finally {
      setReordering(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteTeamMember(deleteId)
      setMembers((prev) => prev.filter((m) => m.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      console.error('Delete error:', err)
      alert('刪除失敗')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <Loading text="載入團隊成員..." />

  return (
    <div>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>團隊成員管理</h1>
        <Button icon={faPlus} size="sm" onClick={() => navigate('/admin/team/new')}>
          新增成員
        </Button>
      </div>

      {members.length === 0 ? (
        <div className={s.emptyCard}>
          <p>目前沒有團隊成員，點擊「新增成員」開始建立。</p>
        </div>
      ) : (
        <div className={s.tableCard}>
          <div className={s.tableScroll}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th className={s.thCenter} style={{ width: 90 }}>順序</th>
                  <th>成員</th>
                  <th>職稱</th>
                  <th>角色</th>
                  <th>顯示</th>
                  <th className={s.thCenter}>操作</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, idx) => (
                  <tr key={m.id}>
                    <td className={s.tdCenter}>
                      <div className={s.reorderGroup}>
                        <button
                          onClick={() => handleMove(idx, 'up')}
                          disabled={idx === 0 || reordering}
                          title="上移"
                          className={s.reorderBtn}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <button
                          onClick={() => handleMove(idx, 'down')}
                          disabled={idx === members.length - 1 || reordering}
                          title="下移"
                          className={s.reorderBtn}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </td>
                    <td className={s.tdBold}>
                      <div className={s.memberCell}>
                        {m.avatar ? (
                          <img src={m.avatar} alt={m.name} className={s.memberAvatar} />
                        ) : (
                          <div className={s.memberAvatarPlaceholder}>
                            <FontAwesomeIcon icon={faUser} />
                          </div>
                        )}
                        <span>{m.name}</span>
                      </div>
                    </td>
                    <td className={s.tdMuted}>{m.title || '-'}</td>
                    <td className={s.tdMuted}>{m.role || '-'}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={m.visible ? faEye : faEyeSlash}
                        className={m.visible ? s.statusOn : s.statusOff}
                      />
                    </td>
                    <td className={s.tdCenter}>
                      <div className={s.actions}>
                        <button
                          onClick={() => navigate(`/admin/team/${m.id}`)}
                          className={`${s.iconBtn} ${s.iconBtnEdit}`}
                          title="編輯"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => setDeleteId(m.id)}
                          className={`${s.iconBtn} ${s.iconBtnDelete}`}
                          title="刪除"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} title="確認刪除" size="sm">
        <p className={s.modalText}>確定要刪除此成員嗎？此操作無法復原。</p>
        <div className={s.modalActions}>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>取消</Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting}>確認刪除</Button>
        </div>
      </Modal>
    </div>
  )
}
