import { useState } from 'react'
import { uploadImage } from '@/services/storageService'
import { validateImageFile } from '@/utils/validators'

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const upload = async (file, folder = 'images') => {
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error)
      return null
    }

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const path = `${folder}/${Date.now()}_${file.name}`
      const url = await uploadImage(file, path, setProgress)
      return url
    } catch (err) {
      console.error('Image upload error:', err)
      setError(`上傳失敗：${err.code || err.message}`)
      return null
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading, progress, error }
}
