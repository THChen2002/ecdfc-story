import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '@/services/firebase'
import Button from '@/components/common/Button/Button'
import Modal from '@/components/common/Modal/Modal'
import Loading from '@/components/common/Loading/Loading'

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
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.5rem',
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>成果管理</h1>
        <Button icon={faPlus} size="sm" onClick={() => navigate('/admin/portfolio/new')}>
          新增成果
        </Button>
      </div>

      {portfolios.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: '16px', padding: '3rem',
          textAlign: 'center', color: '#888', boxShadow: '0 2px 8px rgba(91,184,212,0.08)',
        }}>
          <p>目前沒有成果資料，點擊「新增成果」開始建立。</p>
        </div>
      ) : (
        <div style={{
          background: 'white', borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(91,184,212,0.08)', overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f5f7fa', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>標題</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>分類</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>年份</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>狀態</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600, textAlign: 'center' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #e8f0f4' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{p.title}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem', borderRadius: '9999px',
                        fontSize: '0.75rem', background: '#e8f4fa', color: '#5bb8d4', fontWeight: 600,
                      }}>
                        {p.category === 'dfc-sdgs' ? 'DFC-SDGs' : 'DFC-SEL'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#555' }}>{p.year}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <FontAwesomeIcon
                        icon={p.published ? faEye : faEyeSlash}
                        style={{ color: p.published ? '#6bc5a0' : '#888' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => navigate(`/admin/portfolio/${p.id}`)}
                          style={{ background: 'none', border: 'none', color: '#5bb8d4', cursor: 'pointer', padding: '0.25rem', fontSize: '1rem' }}
                          title="編輯"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: '0.25rem', fontSize: '1rem' }}
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
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>確定要刪除此成果嗎？此操作無法復原。</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>取消</Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting}>確認刪除</Button>
        </div>
      </Modal>
    </div>
  )
}
