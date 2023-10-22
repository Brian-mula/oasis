import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateSetting as updateSettingApi } from "../../services/apiSettings"

export function useUpdateSettings(){
    const queryClient = useQueryClient()
    const {isLoading:isUpdating,mutate:updateSetting}= useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
          queryClient.invalidateQueries('settings')
          toast.success('Setting Updated successfully')
        },
        onError: () => {
          toast.error('Error updating setting')
        }
      })
      return {isUpdating,updateSetting}
}