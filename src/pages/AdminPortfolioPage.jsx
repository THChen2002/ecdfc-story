import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '@/services/firebase'
import Button from '@/components/common/Button/Button'
import Modal from '@/components/common/Modal/Modal'
import Loading from '@/components/common/Loading/Loading'
import s from '@/styles/admin.module.css'

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  const fetchPortfolios = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'portfolios'), orderBy('order', 'asc'))
      const snap = await getDocs(q)
      setPortfolios(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteDoc(doc(db, 'portfolios', deleteId))
      setPortfolios(portfolios.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch (err) {
      console.error('Delete error:', err)
      alert('刪除失敗')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <Loading text="載入成果資料..." />

  return (
    <div>
      <div className={s.pageHeader}>
        <h1 className={s.pageTitle}>成果管理</h1>
        <Button icon={faPlus} size="sm" onClick={() => navigate('/admin/portfolio/new')}>
          新增成果
        </Button>
      </div>

      {portfolios.length === 0 ? (
        <div className={s.emptyCard}>
          <p>目前沒有成果資料，點擊「新增成果」開始建立。</p>
        </div>
      ) : (
        <div className={s.tableCard}>
          <div className={s.tableScroll}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>標題</th>
                  <th>分類</th>
                  <th>年份</th>
                  <th>狀態</th>
                  <th className={s.thCenter}>操作</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((p) => (
                  <tr key={p.id}>
                    <td className={s.tdBold}>{p.title}</td>
                    <td>
                      <span className={s.badge}>
                        {p.category === 'dfc-sdgs' ? 'DFC-SDGs' : 'DFC-SEL'}
                      </span>
                    </td>
                    <td className={s.tdMuted}>{p.year}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={p.published ? faEye : faEyeSlash}
                        className={p.published ? s.statusOn : s.statusOff}
                      />
                    </td>
                    <td className={s.tdCenter}>
                      <div className={s.actions}>
                        <button
                          onClick={() => navigate(`/admin/portfolio/${p.id}`)}
                          className={`${s.iconBtn} ${s.iconBtnEdit}`}
                          title="編輯"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
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
        <p className={s.modalText}>確定要刪除此成果嗎？此操作無法復原。</p>
        <div className={s.modalActions}>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>取消</Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting}>確認刪除</Button>
        </div>
      </Modal>
    </div>
  )
}
