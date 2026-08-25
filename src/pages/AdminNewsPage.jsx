import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faEyeSlash,
  faThumbtack,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import Button from '@/components/common/Button/Button'
import Modal from '@/components/common/Modal/Modal'
import Loading from '@/components/common/Loading/Loading'
import { formatDate } from '@/utils/formatDate'
import s from '@/styles/admin.module.css'

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [reordering, setReordering] = useState(false)
  const navigate = useNavigate()

  const fetchNews = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db, 'news'))
      const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      // 與前台一致：先依手動順序，order 相同再以日期新到舊排
      results.sort((a, b) => {
        const orderA = a.order || 0
        const orderB = b.order || 0
        if (orderA !== orderB) return orderA - orderB
        const dateA = a.publishDate?.toDate?.() || new Date(0)
        const dateB = b.publishDate?.toDate?.() || new Date(0)
        return dateB - dateA
      })
      setNewsList(results)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleMove = async (index, direction) => {
    if (reordering) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newsList.length) return

    const swapped = [...newsList]
    ;[swapped[index], swapped[targetIndex]] = [swapped[targetIndex], swapped[index]]

    // 以新陣列索引為準重新正規化 order，順便自動修復重複或缺號
    const updates = []
    const normalized = swapped.map((n, i) => {
      if (n.order !== i) {
        updates.push({ id: n.id, order: i })
        return { ...n, order: i }
      }
      return n
    })

    setReordering(true)
    const prev = newsList
    setNewsList(normalized)
    try {
      await Promise.all(
        updates.map((u) => updateDoc(doc(db, 'news', u.id), { order: u.order }))
      )
    } catch (err) {
      console.error('Reorder error:', err)
      alert('調整順序失敗，請重試')
      setNewsList(prev)
    } finally {
      setReordering(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteDoc(doc(db, 'news', deleteId))
      setNewsList(newsList.filter((n) => n.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      console.error('Delete error:', err)
      alert('刪除失敗')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <Loading text="載入公告資料..." />

  return (
    <div>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>公告管理</h1>
        <Button icon={faPlus} size="sm" onClick={() => navigate('/admin/news/new')}>
          新增公告
        </Button>
      </div>

      {newsList.length === 0 ? (
        <div className={s.emptyCard}>
          <p>目前沒有公告資料，點擊「新增公告」開始建立。</p>
        </div>
      ) : (
        <div className={s.tableCard}>
          <div className={s.tableScroll}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th className={s.thCenter} style={{ width: 90 }}>順序</th>
                  <th>標題</th>
                  <th>分類</th>
                  <th>日期</th>
                  <th>狀態</th>
                  <th className={s.thCenter}>操作</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((n, idx) => (
                  <tr key={n.id}>
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
                          disabled={idx === newsList.length - 1 || reordering}
                          title="下移"
                          className={s.reorderBtn}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </td>
                    <td className={s.tdBold}>
                      {n.pinned && (
                        <FontAwesomeIcon icon={faThumbtack} className={s.pinned} />
                      )}
                      {n.title}
                    </td>
                    <td>
                      <span className={s.badge}>{n.category}</span>
                    </td>
                    <td className={s.tdMuted}>{formatDate(n.publishDate)}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={n.published ? faEye : faEyeSlash}
                        className={n.published ? s.statusOn : s.statusOff}
                      />
                    </td>
                    <td className={s.tdCenter}>
                      <div className={s.actions}>
                        <button
                          onClick={() => navigate(`/admin/news/${n.id}`)}
                          className={`${s.iconBtn} ${s.iconBtnEdit}`}
                          title="編輯"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => setDeleteId(n.id)}
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
        <p className={s.modalText}>確定要刪除此公告嗎？此操作無法復原。</p>
        <div className={s.modalActions}>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>取消</Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting}>確認刪除</Button>
        </div>
      </Modal>
    </div>
  )
}
