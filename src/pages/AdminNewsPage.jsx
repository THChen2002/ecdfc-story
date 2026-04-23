import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash, faEye, faEyeSlash, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
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
  const navigate = useNavigate()

  const fetchNews = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'news'), orderBy('publishDate', 'desc'))
      const snap = await getDocs(q)
      setNewsList(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

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
                  <th>標題</th>
                  <th>分類</th>
                  <th>日期</th>
                  <th>狀態</th>
                  <th className={s.thCenter}>操作</th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((n) => (
                  <tr key={n.id}>
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
