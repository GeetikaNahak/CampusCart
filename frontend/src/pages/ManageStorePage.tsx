import { useCreateMyStore, useGetMyStore } from "@/api/MyStoreApi"
import ManageStoreForm from "@/forms/manage-store-form/ManageStoreForm"

const ManageStorePage = () => {
    const {createStore,isLoading} = useCreateMyStore();
    const {store,}=useGetMyStore();
  return (
      <ManageStoreForm store={store} onSave={createStore} isLoading={isLoading}/>
  )
}

export default ManageStorePage
