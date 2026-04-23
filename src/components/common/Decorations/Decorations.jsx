/**
 * 手繪小女孩 — 站立揮手
 */
export function DoodleGirl({ size = 100, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.6}
      viewBox="0 0 80 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 頭 */}
      <circle cx="40" cy="20" r="16" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" />
      {/* 頭髮 — 雙馬尾 */}
      <path d="M28,14 Q20,6 16,12" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M52,14 Q60,6 64,12" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="12" r="4" stroke="#3D2C1E" strokeWidth="1.5" fill="#E8742A" opacity="0.5" />
      <circle cx="64" cy="12" r="4" stroke="#3D2C1E" strokeWidth="1.5" fill="#E8742A" opacity="0.5" />
      {/* 眼睛 */}
      <circle cx="34" cy="20" r="2" fill="#3D2C1E" />
      <circle cx="46" cy="20" r="2" fill="#3D2C1E" />
      {/* 微笑 */}
      <path d="M35,26 Q40,31 45,26" stroke="#3D2C1E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* 腮紅 */}
      <circle cx="28" cy="24" r="4" fill="#E88B8B" opacity="0.4" />
      <circle cx="52" cy="24" r="4" fill="#E88B8B" opacity="0.4" />
      {/* 身體 — 裙子 */}
      <path d="M40,36 L40,60" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" />
      <path d="M30,60 Q35,50 40,60 Q45,50 50,60" stroke="#E8742A" strokeWidth="2" fill="#E8742A" opacity="0.3" />
      <path d="M28,60 L40,80 L52,60" stroke="#E8742A" strokeWidth="2" fill="#E8742A" opacity="0.2" />
      {/* 手 — 一隻揮手 */}
      <path d="M40,44 Q28,38 22,30" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M40,44 Q52,50 58,44" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* 腿 */}
      <path d="M40,80 Q36,95 32,108" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M40,80 Q44,95 48,108" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* 鞋 */}
      <ellipse cx="30" cy="110" rx="6" ry="3" fill="#E8742A" opacity="0.5" />
      <ellipse cx="50" cy="110" rx="6" ry="3" fill="#E8742A" opacity="0.5" />
    </svg>
  )
}

/**
 * 手繪小盆栽
 */
export function PlantDoodle({ size = 60, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.2}
      viewBox="0 0 60 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 花盆 */}
      <path d="M18,48 L16,66 L44,66 L42,48 Z" stroke="#C85D1A" strokeWidth="1.5" fill="#E8742A" opacity="0.35" strokeLinejoin="round" />
      <line x1="16" y1="48" x2="44" y2="48" stroke="#C85D1A" strokeWidth="2" strokeLinecap="round" />
      {/* 莖 */}
      <path d="M30,48 Q30,38 30,26" stroke="#7BC5A0" strokeWidth="2" strokeLinecap="round" />
      <path d="M30,36 Q26,30 28,22" stroke="#7BC5A0" strokeWidth="1.5" strokeLinecap="round" />
      {/* 葉子 */}
      <path d="M30,32 Q18,24 22,14 Q28,22 30,32" fill="#7BC5A0" opacity="0.45" stroke="#5aa882" strokeWidth="1" />
      <path d="M30,28 Q42,18 40,8 Q34,18 30,28" fill="#7BC5A0" opacity="0.35" stroke="#5aa882" strokeWidth="1" />
      <path d="M28,22 Q20,28 16,22" stroke="#7BC5A0" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* 小花 */}
      <circle cx="22" cy="14" r="3" fill="#F2C94C" opacity="0.6" />
      <circle cx="40" cy="8" r="2.5" fill="#E88B8B" opacity="0.6" />
    </svg>
  )
}

/**
 * 手繪相框
 */
export function DoodleFrame({ size = 60, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.85}
      viewBox="0 0 70 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 框 */}
      <rect x="8" y="6" width="54" height="42" rx="3" stroke="#A0917E" strokeWidth="2" strokeLinejoin="round" />
      <rect x="12" y="10" width="46" height="34" rx="2" stroke="#E8D8C8" strokeWidth="1" />
      {/* 山和太陽 — 框內風景 */}
      <path d="M14,38 L26,20 L34,30 L42,18 L56,38" stroke="#7BC5A0" strokeWidth="1.5" fill="#7BC5A0" opacity="0.2" strokeLinejoin="round" />
      <circle cx="48" cy="16" r="5" fill="#F2C94C" opacity="0.5" />
      {/* 掛鉤 */}
      <path d="M35,6 Q35,0 35,0" stroke="#A0917E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30,2 Q35,-2 40,2" stroke="#A0917E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/**
 * 手繪星星散佈（多顆）
 */
export function DoodleStars({ size = 80, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20,15 L22,10 L24,15 L29,15 L25,18 L26,23 L22,20 L18,23 L19,18 L15,15 Z" fill="#F2C94C" opacity="0.5" stroke="#F2C94C" strokeWidth="0.5" />
      <path d="M55,8 L56.5,4 L58,8 L62,8 L59,10.5 L60,14 L57,11.5 L54,14 L55,10.5 L52,8 Z" fill="#F2C94C" opacity="0.35" stroke="#F2C94C" strokeWidth="0.5" />
      <path d="M40,50 L41,47 L42,50 L45,50 L43,52 L44,55 L41,53 L38,55 L39,52 L36,50 Z" fill="#E8742A" opacity="0.3" stroke="#E8742A" strokeWidth="0.5" />
      <path d="M65,40 L66,37.5 L67,40 L69.5,40 L67.5,41.5 L68.5,44 L66,42.5 L63.5,44 L64.5,41.5 L62.5,40 Z" fill="#E88B8B" opacity="0.4" stroke="#E88B8B" strokeWidth="0.5" />
      <path d="M10,60 L11,58 L12,60 L14,60 L12.5,61.5 L13,63.5 L11,62 L9,63.5 L9.5,61.5 L8,60 Z" fill="#7BC5A0" opacity="0.4" stroke="#7BC5A0" strokeWidth="0.5" />
    </svg>
  )
}

/**
 * 手繪愛心
 */
export function DoodleHeart({ size = 24, color = '#E88B8B', className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12,21 Q6,16 3,12 Q0,8 3,5 Q6,2 9,4 Q11,5.5 12,8 Q13,5.5 15,4 Q18,2 21,5 Q24,8 21,12 Q18,16 12,21 Z"
        stroke={color}
        strokeWidth="1.5"
        fill={color}
        opacity="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * 水彩圓形暈染
 */
export function WatercolorSpot({ color = '#F2C94C', size = 200, className = '' }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, ${color}08 50%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />
  )
}

/**
 * 手繪小花
 */
export function DoodleFlower({ size = 50, color = '#E88B8B', className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="25" cy="12" rx="6" ry="8" fill={color} opacity="0.7" />
      <ellipse cx="38" cy="25" rx="8" ry="6" fill={color} opacity="0.7" />
      <ellipse cx="25" cy="38" rx="6" ry="8" fill={color} opacity="0.7" />
      <ellipse cx="12" cy="25" rx="8" ry="6" fill={color} opacity="0.7" />
      <circle cx="25" cy="25" r="5" fill="#F2C94C" />
      <path d="M25,42 Q23,48 21,50" stroke="#7BC5A0" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/**
 * 葉子 — svgrepo/530298（inline SVG path）
 */
export function DoodleLeaf({ size = 40, color = '#5AB286', className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M450.72 418.17c-42.29-21.86-144.5-220-171.65-198.22s-40.59 114.28 0.29 171.31 132 97 153.52 129.58 18.45 57.07 13.36 63.2S262.49 462 217.66 485.53s-28.41 84.69 17.56 132.54S427 651.39 455.57 672.76s32.72 55 20.49 55-145.88-32.38-192.77-24.15-68.25 39.89 0.12 73.42 180.26 8.87 199.28 28.21 6.8 28.54-7.47 29.58-110.14-4.91-143.78 0.24 6.21 56.07 23.57 69.3 80.59 19.24 98.94 16.15 36.67-26.58 51-20.48 3.14 45.88 8.25 53 46.92 9.1 53-0.09-10.26-37.71-0.09-51 32.65 11.16 66.28-1.13 109-70.55 111-104.2-132.52 27.76-167.19 26.8c-24.48-4-34.71-21.36-19.43-30.56s228.33-55.45 244.57-96.27 4-34.68-21.47-34.63S605.6 724.45 590.26 700 791 610 813.3 555.9s29.37-119.36-0.22-127.47-147.62 137.92-194.54 130.86-1.06-21.41 19.29-48 132.36-120.51 133.32-154.16 10.08-67.32-27.65-71.33-129.27 135.84-149.69 123.63 52.89-78.61 64-143.89S632.09 133 611.7 137.14s-19.37 4.11-19.34 22.47 10.33 79.52-1.85 114.21-13.14 60.18-23.35 54.08-10.27-43.83-4.2-73.41 23.3-92.83 13.07-112.19S545.27 48.53 467.8 68s-72.25 89.86-65 136.75 27.67 83.57 45.09 128.41 21.71 94.77 2.83 85.01z"
        fill={color}
      />
    </svg>
  )
}

/**
 * 雲朵 — svgrepo/352868（inline SVG path）
 */
export function DoodleCloud({ size = 160, color = '#FFFFFF', className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.75}
      viewBox="0 0 500 380"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M248.854,39.545c-32.291,0-59.857,19.332-65.37,45.752c-8.592-3.294-17.972-5.012-27.351-5.012c-38.377,0-69.452,27.494-69.452,61.433c0.072,0.787,0.072,1.503,0.143,2.219c-26.205,2.721-46.11,23.843-46.11,49.046c0,23.914,17.828,44.32,42.387,48.616c-0.072,0.859-0.143,1.79-0.143,2.721c0,16.826,16.898,30.501,37.661,30.501c9.022,0,17.685-2.577,24.487-7.303c14.105,19.618,37.518,31.432,62.65,31.432c15.322,0,30.215-4.439,42.817-12.601c11.026,9.021,25.489,14.105,40.525,14.105c19.905,0,38.521-8.807,49.547-23.556c6.587,2.148,13.604,3.222,20.549,3.222c34.583,0,62.65-25.132,62.65-56.206c-0.072-4.081-0.573-8.234-1.575-12.244c22.554-7.375,36.945-23.198,37.017-40.525c0-24.773-28.926-44.893-64.511-44.893c-0.143,0-0.286,0-0.43,0c0-0.215,0.072-0.501,0.072-0.716c0-26.707-26.205-48.258-58.425-48.258c-7.876,0-15.609,1.289-22.84,3.866C305.705,56.729,279.213,39.545,248.854,39.545z"
        fill={color}
        stroke={color}
        strokeWidth="10"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ============================================================
 * Flat 風森林系插畫 — 採用網站暖橘/棕/奶油色配色
 * ============================================================ */

/**
 * Flat 兔子（米色身體 + 暖粉腹部）
 */
export function FlatRabbit({ size = 100, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 耳朵外 */}
      <ellipse cx="36" cy="22" rx="9" ry="22" fill="#E8D8C8" />
      <ellipse cx="64" cy="22" rx="9" ry="22" fill="#E8D8C8" />
      {/* 耳朵內 */}
      <ellipse cx="36" cy="24" rx="4.5" ry="14" fill="#FBDFDF" />
      <ellipse cx="64" cy="24" rx="4.5" ry="14" fill="#FBDFDF" />
      {/* 身體 */}
      <ellipse cx="50" cy="86" rx="32" ry="28" fill="#E8D8C8" />
      {/* 腹部 */}
      <ellipse cx="50" cy="92" rx="20" ry="18" fill="#FFF5ED" />
      {/* 頭 */}
      <circle cx="50" cy="55" r="26" fill="#E8D8C8" />
      {/* 臉頰白色 */}
      <ellipse cx="42" cy="62" rx="8" ry="6" fill="#FFF5ED" />
      <ellipse cx="58" cy="62" rx="8" ry="6" fill="#FFF5ED" />
      {/* 眼 */}
      <circle cx="42" cy="55" r="2.2" fill="#3D2C1E" />
      <circle cx="58" cy="55" r="2.2" fill="#3D2C1E" />
      {/* 鼻 */}
      <ellipse cx="50" cy="63" rx="2" ry="1.5" fill="#E88B8B" />
      {/* 嘴 */}
      <path d="M50,65 L50,68 M50,68 Q47,71 45,70 M50,68 Q53,71 55,70" stroke="#3D2C1E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* 腳 */}
      <ellipse cx="34" cy="112" rx="10" ry="5" fill="#E8D8C8" />
      <ellipse cx="66" cy="112" rx="10" ry="5" fill="#E8D8C8" />
    </svg>
  )
}

/**
 * Flat 小鹿（暖橘棕）
 */
export function FlatDeer({ size = 110, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 鹿角 */}
      <path d="M40,28 Q36,18 32,12 M32,12 L26,8 M32,12 L34,4" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M70,28 Q74,18 78,12 M78,12 L84,8 M78,12 L76,4" stroke="#3D2C1E" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* 身體 */}
      <ellipse cx="55" cy="68" rx="32" ry="20" fill="#E8742A" opacity="0.85" />
      {/* 腹部 */}
      <ellipse cx="55" cy="74" rx="22" ry="12" fill="#FFD0A8" />
      {/* 腿 */}
      <rect x="32" y="80" width="6" height="22" rx="2" fill="#E8742A" opacity="0.85" />
      <rect x="44" y="82" width="6" height="22" rx="2" fill="#E8742A" opacity="0.85" />
      <rect x="62" y="82" width="6" height="22" rx="2" fill="#E8742A" opacity="0.85" />
      <rect x="74" y="80" width="6" height="22" rx="2" fill="#E8742A" opacity="0.85" />
      {/* 蹄 */}
      <rect x="31" y="100" width="8" height="4" rx="1" fill="#3D2C1E" />
      <rect x="43" y="102" width="8" height="4" rx="1" fill="#3D2C1E" />
      <rect x="61" y="102" width="8" height="4" rx="1" fill="#3D2C1E" />
      <rect x="73" y="100" width="8" height="4" rx="1" fill="#3D2C1E" />
      {/* 尾巴 */}
      <ellipse cx="84" cy="62" rx="4" ry="6" fill="#FFD0A8" />
      {/* 頭 */}
      <ellipse cx="55" cy="42" rx="20" ry="22" fill="#E8742A" opacity="0.85" />
      {/* 臉下方淺色 */}
      <ellipse cx="55" cy="52" rx="12" ry="10" fill="#FFD0A8" />
      {/* 耳朵 */}
      <ellipse cx="38" cy="32" rx="5" ry="8" fill="#E8742A" opacity="0.85" transform="rotate(-25 38 32)" />
      <ellipse cx="72" cy="32" rx="5" ry="8" fill="#E8742A" opacity="0.85" transform="rotate(25 72 32)" />
      <ellipse cx="38" cy="33" rx="2.5" ry="5" fill="#FBDFDF" transform="rotate(-25 38 33)" />
      <ellipse cx="72" cy="33" rx="2.5" ry="5" fill="#FBDFDF" transform="rotate(25 72 33)" />
      {/* 身體斑點 */}
      <ellipse cx="44" cy="62" rx="3" ry="2" fill="#FFD0A8" />
      <ellipse cx="58" cy="60" rx="3" ry="2" fill="#FFD0A8" />
      <ellipse cx="68" cy="64" rx="3" ry="2" fill="#FFD0A8" />
      {/* 眼 */}
      <circle cx="48" cy="42" r="2" fill="#3D2C1E" />
      <circle cx="62" cy="42" r="2" fill="#3D2C1E" />
      {/* 鼻 */}
      <ellipse cx="55" cy="52" rx="2" ry="1.5" fill="#3D2C1E" />
    </svg>
  )
}

/**
 * 小鳥 — svgrepo/530309（inline SVG path）
 */
export function FlatBird({ size = 80, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M484.32 375.24C575.25 255.5 857.87 527.6 788.67 581.07c-94.76 73.21-491.01 39.99-304.35-205.83z" fill="#1C80AA" />
      <path d="M401.03 749.89l-4.85 133.8-77.69 21.37h66.36l19.42 35.27 4.86-35.27 40.46 6.14-38.84-25.89 8.09-114.91-17.81-20.51zM524.36 771.23l10.48 133.48-74.73 30.11 65.92-7.59 23.33 32.82 0.79-35.6 40.89 1.48-41.54-21.28-5.11-115.08-20.03-18.34z" fill="#3B5174" />
      <path d="M224.73 264.77l-24 50.19a21.7 21.7 0 0 1-37.73 2.5l-31.57-48.27a21.7 21.7 0 0 1 17.41-33.57l55.61-1.92a21.7 21.7 0 0 1 20.28 31.07z" fill="#DE7B56" />
      <path d="M900.53 638.76c-18.3 86.91-221.86 208.13-478 171.54C150.46 771.44 26 281.88 315 103.56c161.25-99.49 326.71 5 356.8 130.37C713 405.47 583.15 534.58 749.57 609c86.91 38.91 164.43-34.33 150.96 29.76z" fill="#FDD2BE" />
      <circle cx="365.86" cy="264.78" r="32.45" fill="#000" />
      <path d="M512.24 366c137.48-60.86 253.34 314 166.92 327.31C560.81 711.56 230 490.92 512.24 366zM223.3 530c-9.34-2.6-17.2-12.8-23.94-31a195 195 0 0 1-7.64-27 7.28 7.28 0 0 1 14.3-2.79c4.79 24.5 15 46.44 21.91 46.93 1.12 0.08 11.43-0.5 27.23-45.51a7.28 7.28 0 1 1 13.74 4.82c-13.61 38.77-27 56.31-42 55.22a18.18 18.18 0 0 1-3.6-0.67zM340.8 590.36c-9.63 1.14-20.77-5.32-33.92-19.63a195 195 0 0 1-17.32-22.11 7.28 7.28 0 0 1 12.17-8c13.73 20.85 31.53 37.27 38.07 35.12 1.07-0.35 10.38-4.8 7.93-52.44a7.28 7.28 0 1 1 14.55-0.75c2.11 41-3.59 62.33-17.95 67a18.18 18.18 0 0 1-3.53 0.81zM261.5 659.71c-9-0.19-18.35-7.55-28.56-22.35a180.41 180.41 0 0 1-13-22.49 6.74 6.74 0 0 1 12.18-5.77c9.9 20.88 24.1 38.21 30.37 37.08 1-0.18 10.13-3.07 14-47a6.74 6.74 0 1 1 13.43 1.18c-3.34 37.87-11.31 56.66-25.07 59.12a16.82 16.82 0 0 1-3.35 0.23zM389.28 722.29c-9.26 2.85-21.38-1.51-36.89-13.22a195 195 0 0 1-21-18.64 7.28 7.28 0 0 1 10.53-10.06c17.25 18.05 37.7 31 43.75 27.71 1-0.54 9.35-6.59-1.61-53a7.28 7.28 0 1 1 14.17-3.35c9.44 40 7.65 62-5.63 69.16a18.18 18.18 0 0 1-3.32 1.4z" fill="#22B0C3" />
    </svg>
  )
}

/**
 * 樹 — svgrepo/475459（inline SVG path）
 */
export function FlatTree({ size = 110, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M761.425982 323.287009c-17.015106-174.791541-107.504532-229.703927-242.851964-229.703927s-225.836858 55.685801-242.851964 229.703927c-11.601208 116.785498-111.371601 174.791541-64.193353 273.78852 42.537764 88.942598 126.839879 139.214502 307.045317 139.214501 180.205438 0 263.734139-49.498489 307.045317-139.214501 47.178248-98.996979-52.592145-157.003021-64.193353-273.78852z"
        fill="#1ca538"
      />
      <path
        d="M696.459215 472.555891c-20.882175-7.734139-37.123867 54.138973-58.779457 81.208459-18.561934 22.429003-42.537764 24.749245-75.021148 24.749245-2.320242-46.404834-4.640483-92.036254-6.960725-133.800604 37.897281-1.546828 59.55287-10.054381 75.021148-27.8429 18.561934-20.882175 37.123867-92.809668 18.561934-98.223565-17.78852-5.413897-27.069486 44.084592-42.537765 63.419939-13.148036 16.241692-30.936556 15.468278-54.138972 15.468278-3.093656-47.951662-5.413897-87.39577-8.507553-113.691843-2.320242-23.975831-11.601208-30.163142-26.296073-30.163142-13.92145 0-23.975831 6.187311-26.296072 30.163142-3.867069 37.123867-7.734139 102.864048-12.374623 178.658611-21.655589 0.773414-38.670695 0.773414-51.045317-15.468278-15.468278-19.335347-23.975831-68.833837-42.537764-63.41994-17.78852 5.413897 0 77.34139 18.561933 98.223565 15.468278 17.78852 36.350453 26.296073 71.927493 27.8429-2.320242 43.311178-4.640483 88.942598-6.187311 133.800605-30.936556 0-54.912387-2.320242-71.927493-24.749245-21.655589-27.069486-37.123867-88.942598-58.779456-81.208459-20.882175 7.734139 3.093656 99.770393 28.616314 129.16012 21.655589 24.749245 48.725076 36.350453 99.770393 38.670695-6.187311 143.854985-10.827795 266.054381-10.827795 266.054381H579.673716s-6.187311-160.870091-13.92145-331.021148c52.592145-2.320242 79.661631-13.92145 102.090634-38.670695 25.522659-29.389728 50.271903-121.425982 28.616315-129.160121"
        fill="#65320b"
      />
    </svg>
  )
}

/**
 * 大片生長葉群 — 從角落向外延伸的枝葉
 * 來源：svgrepo.com/svg/530302/leaves-2（重新著色為網站暖色系）
 */
export function GrowingLeaves({
  size = 240,
  mainColor = '#7BC5A0',
  lineColor = '#4A8A6A',
  className = '',
  flip = false,
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M859.29 140.28c-5.31-15.34-79.28-7-116 9.42s-163.34 116.58-188.52 172-17.35 64.14-30 84.29-17.1 33.3-22.12 27.66-2.24-16.66 7.83-36.5 28-55 32.21-78.58-10.15-111.32-11.56-147.31-15.46-105.8-33.6-106.37-69.25 69.39-75.15 122.11-17.46 139.43 4.21 195.12 34.11 42.14 41.25 66.88-14 82.5-40.95 117.38-37 46.84-48.27 43.18-17-29-9.06-46.76 26.22-37.12 26.48-61.55-9.33-113.22-15.22-136.06S360 291.87 358 272.34s2.85-67.45-10.61-72.41c-23.69-7.57-57.39 50.77-76.1 132.25s6.86 148 15.18 161.37 27.85 46.23 41.65 61.22 25.81 20.89 29.44 46.57 5.44 38.52-9.79 74.66-66.06 149.34-83 166.45c-4.19-42.4 6.47-30.15 7.41-63.57s-3.05-43.81 3-74.05-21.14-139.41-46-168.41c-12.13-15.05-8-53.59-15.32-54.33s-9.44-2.44-13.92 22.33-43 102-34.27 169.44 12.82 73.72 21.86 87.69 21.56 23.3 31.14 50.25 10.82 40.5 20.73 48.44-16.17 92.81-16.17 92.81l28.17 6s24.82-125.4 50.13-137 37.28 17.63 83.27 17.95 103.84-15.91 129.29-26.22 41.21-16.06 66.32-36.4 56.41-67.58 74.87-89.77 31.63-25.58 25.85-33.46-33.3-3.41-61-1.88-114.7 6.52-178.61 29.73-85.12 71.8-96.12 84.38-14.63 27.62-24.49 21.32-4.73-14.71 1.28-23.38 78.23-177 162.4-192.17c40.67-5.8 37.86 24.72 92.36 26s138.9-18.76 202.48-98.5c47.14-59.19 61-113.91 66.63-121s-28.71-13.21-53.39-6.47-35 16.15-58.92 19.32S607 402.11 563.34 443s-47.73 91-66.93 103.09-41.9 25-44.33 17.05 42.39-100.88 78.53-141.68c11.65-13.69 29-5.41 67.11-24.61s144-102.73 174.92-136.36 32.09-58.69 57.77-79.74 30.84-34.75 28.88-40.47z"
        fill={mainColor}
        fillOpacity="0.8"
      />
      <path
        d="M207.57 519c-11.4 41.54-7.11 122.14 1.1 161.26s31.48 151.17 31.48 151.17-17-118.18-24.28-165.4-8.3-147.03-8.3-147.03zM322.07 240.56C306.49 289.51 307.36 371 310.53 395s25.7 143.29 39 158.6c-17.27-74.25-28.49-121-33.21-164.41-4.65-43.1-0.32-77.72 5.75-148.63zM641.9 671.54c-33.45 39-103.26 81.1-125.27 91S381.22 816 361.2 812.71c72.25-24.34 117.88-39.36 157.31-58.18 39.09-18.66 66.27-40.53 123.39-82.99zM486 95.61c-10.09 27.71-43.91 204.72-21.09 280.17C450.33 288.82 486 95.61 486 95.61zM792.13 181.21c-39.45 21.42-213.55 167.5-225.74 185.64 33.42-22.3 225.74-185.64 225.74-185.64zM808.82 411.65c-18.6 24.78-170.91 157-273.46 145 159.64-32.19 273.46-145 273.46-145z"
        fill={lineColor}
        fillOpacity="0.85"
      />
    </svg>
  )
}

/**
 * 小嫩枝 — 設計讓它從 blob 邊緣「長出來」
 */
export function LeafSprig({
  size = 46,
  color = '#7BC5A0',
  veinColor = '#4A8A6A',
  rotate = 0,
  className = '',
}) {
  const style = rotate
    ? { transform: `rotate(${rotate}deg)`, transformOrigin: 'bottom center' }
    : undefined
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.4}
      viewBox="0 0 46 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={style}
    >
      <path
        d="M23,64 Q22,42 21,22 Q20,10 22,2"
        stroke={veinColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22,40 Q6,38 4,24 Q14,26 22,36 Z"
        fill={color}
        fillOpacity="0.85"
        stroke={veinColor}
        strokeWidth="1"
      />
      <path
        d="M23,24 Q40,20 42,6 Q30,10 24,20 Z"
        fill={color}
        fillOpacity="0.8"
        stroke={veinColor}
        strokeWidth="1"
      />
      <path
        d="M22,10 Q14,4 14,-1"
        fill={color}
        fillOpacity="0.7"
        stroke={veinColor}
        strokeWidth="1"
      />
    </svg>
  )
}

/**
 * 水滴 — 可以掛在 blob 邊緣或葉尖
 */
export function WaterDrop({ size = 22, color = '#7BC5A0', className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.3}
      viewBox="0 0 22 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11,2 Q18,13 18,20 Q18,27 11,27 Q4,27 4,20 Q4,13 11,2 Z"
        fill={color}
        fillOpacity="0.65"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <ellipse cx="9" cy="16" rx="1.8" ry="3.5" fill="#FFFFFF" opacity="0.6" />
    </svg>
  )
}

/**
 * 番茄（正面全果）
 */
export function FruitTomato({ size = 100, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <rect x="47" y="4" width="6" height="14" rx="3" fill="#2D6010" />
      <path d="M50,20 C48,12 40,8 37,13 C43,14 49,18 50,24 Z" fill="#4A9020" />
      <path d="M50,20 C52,12 60,8 63,13 C57,14 51,18 50,24 Z" fill="#4A9020" />
      <path d="M50,20 C44,10 30,13 28,19 C36,18 46,20 50,26 Z" fill="#5AA030" fillOpacity="0.85" />
      <path d="M50,20 C56,10 70,13 72,19 C64,18 54,20 50,26 Z" fill="#5AA030" fillOpacity="0.85" />
      <circle cx="50" cy="60" r="38" fill="#E84040" />
      <path d="M12,60 C12,82 29,98 50,98 C71,98 88,82 88,60 C88,70 71,74 50,74 C29,74 12,70 12,60 Z" fill="#B82020" fillOpacity="0.38" />
      <ellipse cx="50" cy="38" rx="28" ry="14" fill="#F86060" fillOpacity="0.28" />
      <ellipse cx="33" cy="44" rx="8" ry="12" fill="white" fillOpacity="0.22" />
    </svg>
  )
}

/**
 * 西瓜（橫切面）
 */
export function FruitWatermelon({ size = 100, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="47" fill="#2A7A2A" />
      <path d="M50,3 C52,3 53,5 53,7 C53,15 52,29 50,42 C48,29 47,15 47,7 C47,5 48,3 50,3 Z" fill="#40A040" fillOpacity="0.55" />
      <path d="M87,18 C88.4,19.4 88,21 87,22 C81,27 70,37 60,46 C67,33 77,23 83,18 C84.2,16.8 85.6,16.6 87,18 Z" fill="#40A040" fillOpacity="0.55" />
      <path d="M97,50 C97,52 95,53 93,53 C85,53 71,52 58,50 C71,48 85,47 93,47 C95,47 97,48 97,50 Z" fill="#40A040" fillOpacity="0.55" />
      <circle cx="50" cy="50" r="40" fill="#C8E8B0" />
      <circle cx="50" cy="50" r="34" fill="#F04858" />
      <ellipse cx="33" cy="36" rx="2.2" ry="3.8" fill="#1A1A3A" transform="rotate(-18 33 36)" fillOpacity="0.9" />
      <ellipse cx="65" cy="33" rx="2.2" ry="3.8" fill="#1A1A3A" transform="rotate(12 65 33)" fillOpacity="0.9" />
      <ellipse cx="36" cy="67" rx="2.2" ry="3.8" fill="#1A1A3A" transform="rotate(-6 36 67)" fillOpacity="0.9" />
      <ellipse cx="68" cy="65" rx="2.2" ry="3.8" fill="#1A1A3A" transform="rotate(20 68 65)" fillOpacity="0.9" />
      <ellipse cx="52" cy="77" rx="2.2" ry="3.8" fill="#1A1A3A" transform="rotate(4 52 77)" fillOpacity="0.9" />
      <ellipse cx="34" cy="33" rx="7" ry="10" fill="white" fillOpacity="0.18" />
    </svg>
  )
}

/**
 * 柳丁（正面全果）
 */
export function FruitOrange({ size = 100, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <circle cx="50" cy="57" r="40" fill="#E8742A" />
      <path d="M10,57 C10,80 28,97 50,97 C72,97 90,80 90,57 C90,68 72,72 50,72 C28,72 10,68 10,57 Z" fill="#C05010" fillOpacity="0.36" />
      <ellipse cx="50" cy="36" rx="30" ry="16" fill="#FFB060" fillOpacity="0.3" />
      <ellipse cx="34" cy="40" rx="8" ry="12" fill="white" fillOpacity="0.22" />
      <ellipse cx="50" cy="18" rx="5" ry="5.5" fill="#C05010" fillOpacity="0.6" />
      <path d="M50,16 C54,8 64,5 66,11 C60,11 53,14 50,18 Z" fill="#4A9020" />
      <path d="M50,16 C53,9 60,7 62,13 C58,13 53,15 50,19 Z" fill="#5AA030" fillOpacity="0.8" />
    </svg>
  )
}
