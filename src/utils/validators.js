export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateRequired = (value) =>
  value !== null && value !== undefined && String(value).trim() !== ''

export const validateImageFile = (file) => {
  if (!file) return { valid: false, error: '請選擇檔案' }
  if (!file.type.startsWith('image/'))
    return { valid: false, error: '僅接受圖片檔案' }
  if (file.size > 5 * 1024 * 1024)
    return { valid: false, error: '檔案大小不得超過 5MB' }
  return { valid: true, error: null }
}
