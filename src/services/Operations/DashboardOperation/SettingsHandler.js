// SettingsHandler.js
import { updateUser } from '../../../Reducers/userSlice'
  import toast from 'react-hot-toast'
import { handleEmailVisibility, handlePhoneVisibility } from './DashboardApi'
  
  export const toggleEmailVisibility = async (currentUser, dispatch, setIsEmailPublic) => {
    const emailToast = toast.loading('Loading...')
    try {
      const response = await handleEmailVisibility()
      if (response) {
        setIsEmailPublic((prev) => {
          const updated = !prev
          dispatch(updateUser({ ...currentUser, showEmail: updated ? 1 : 0 }))
          return updated
        })
        toast.success('Preference updated!')
      }
    } catch (error) {
      console.error('Email toggle error:', error)
    } finally {
      toast.dismiss(emailToast)
    }
  }
  
  export const togglePhoneVisibility = async (currentUser, dispatch, setIsPhoneNoPublic) => {
    const phoneToast = toast.loading('Loading...')
    try {
      const response = await handlePhoneVisibility()
      if (response) {
        setIsPhoneNoPublic((prev) => {
          const updated = !prev
          dispatch(updateUser({ ...currentUser, showPhoneNumber: updated ? 1 : 0 }))
          return updated
        })
        toast.success('Preference updated!')
      }
    } catch (error) {
      console.error('Phone toggle error:', error)
    } finally {
      toast.dismiss(phoneToast)
    }
  }
  