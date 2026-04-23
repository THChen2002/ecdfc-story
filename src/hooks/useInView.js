import { useEffect, useRef, useState } from 'react'

/**
 * 監聽元素是否進入視窗 — 用於滾動觸發動畫
 *
 * @param {Object} options
 * @param {number} options.threshold - 元素可見比例 (0~1)，預設 0.15
 * @param {string} options.rootMargin - 提前觸發的距離，預設 '0px 0px -80px 0px'
 * @param {boolean} options.once - 只觸發一次後即停止觀察，預設 true
 */
export function useInView({
  threshold = 0.15,
  rootMargin = '0px 0px -80px 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
