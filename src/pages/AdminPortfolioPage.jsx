import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faEyeSlash,
  faTags,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import Button from '@/components/common/Button/Button'
import Modal from '@/components/common/Modal/Modal'
import Loading from '@/components/common/Loading/Loading'
import CategoryManager from '@/components/admin/CategoryManager/CategoryManager'
import { usePortfolioCategories } from '@/hooks/usePortfolioCategories'
import { toAcademicYear } from '@/utils/academicYear'
import s from '@/styles/admin.module.css'

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [reordering, setReordering] = useState(false)
  const navigate = useNavigate()
  const { categories, refetch: refetchCategories } = usePortfolioCategories()
  const categoryLabelMap = categories.reduce((acc, c) => {
    acc[c.id] = c.label
    return acc
  }, {})

  const fetchPortfolios = async ({ silent = false } = {}) => {
    if (!silent) setLoading(true)
    try {
      // 客端排序，避免 Firestore orderBy 略過缺 order 欄位的舊資料
      const snap = await getDocs(collection(db, 'portfolios'))
      const results = snap.docs.map((d) => {
        const data = d.data()
        return { id: d.id, ...data, year: toAcademicYear(data.year) }
      })
      results.sort((a, b) => (a.order || 0) - (b.order || 0))
      setPortfolios(results)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const handleMove = async (index, direction) => {
    if (reordering) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= portfolios.length) return

    const swapped = [...portfolios]
    ;[swapped[index], swapped[targetIndex]] = [swapped[targetIndex], swapped[index]]

    // 以新陣列索引為準重新正規化 order，順便自動修復重複或缺號
    const updates = []
    const normalized = swapped.map((p, i) => {
      if (p.order !== i) {
        updates.push({ id: p.id, order: i })
        return { ...p, order: i }
      }
      return p
    })

    setReordering(true)
    const prev = portfolios
    setPortfolios(normalized)
    try {
      await Promise.all(
        updates.map((u) => updateDoc(doc(db, 'portfolios', u.id), { order: u.order }))
      )
    } catch (err) {
      console.error('Reorder error:', err)
      alert('調整順序失敗，請重試')
      setPortfolios(prev)
    } finally {
      setReordering(false)
    }
  }

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
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant="ghost"
            size="sm"
            icon={faTags}
            onClick={() => setShowCategoryManager(true)}
          >
            管理分類
          </Button>
          <Button icon={faPlus} size="sm" onClick={() => navigate('/admin/portfolio/new')}>
            新增成果
          </Button>
        </div>
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
                  <th className={s.thCenter} style={{ width: 90 }}>順序</th>
                  <th>標題</th>
                  <th>分類</th>
                  <th>學年度</th>
                  <th>狀態</th>
                  <th className={s.thCenter}>操作</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((p, idx) => (
                  <tr key={p.id}>
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
                          disabled={idx === portfolios.length - 1 || reordering}
                          title="下移"
                          className={s.reorderBtn}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                      </div>
                    </td>
                    <td className={s.tdBold}>{p.title}</td>
                    <td>
                      <span className={s.badge}>
                        {p.category
                          ? categoryLabelMap[p.category] || p.category
                          : '未分類'}
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

      <CategoryManager
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        onChanged={() => {
          refetchCategories()
          // silent 避免 page-level loading 把 Modal unmount
          fetchPortfolios({ silent: true })
        }}
      />
    </div>
  )
}
