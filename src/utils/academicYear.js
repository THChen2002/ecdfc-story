// 民國學年度工具
// 學年度以民國年表示（例如 114 學年度）；台灣學年度自 8 月起算。

const ROC_OFFSET = 1911

// 目前學年度（民國）。8 月（含）之後屬於當年度，否則屬於前一年度。
export const getCurrentAcademicYear = () => {
  const now = new Date()
  const calendarYear =
    now.getMonth() + 1 >= 8 ? now.getFullYear() : now.getFullYear() - 1
  return calendarYear - ROC_OFFSET
}

// 將舊資料的西元年（>= 1911）正規化為民國學年度；已是民國值則原樣返回。
export const toAcademicYear = (value) => {
  if (value === null || value === undefined || value === '') return value
  const num = Number(value)
  if (Number.isNaN(num)) return value
  return num >= ROC_OFFSET ? num - ROC_OFFSET : num
}
