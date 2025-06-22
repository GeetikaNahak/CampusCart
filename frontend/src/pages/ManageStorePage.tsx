import { useCreateMyStore } from "@/api/MyStoreApi"
import ManageStoreForm from "@/forms/manage-store-form/ManageStoreForm"

const ManageStorePage = () => {
    const {createStore,isLoading} = useCreateMyStore();
  return (
      <ManageStoreForm onSave={createStore} isLoading={isLoading}/>
  )
}

export default ManageStorePage
