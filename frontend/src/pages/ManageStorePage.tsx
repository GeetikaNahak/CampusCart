import { useCreateMyStore, useGetMyStore, useUpdateMyStore } from "@/api/MyStoreApi";
import ManageStoreForm from "@/forms/manage-store-form/ManageStoreForm";

const ManageStorePage = () => {
  const { store, isLoading: isStoreLoading } = useGetMyStore();
  const { createStore, isLoading: isCreateLoading } = useCreateMyStore();
  const { updateStore, isLoading: isUpdateLoading } = useUpdateMyStore();

  const isEditing = !!store;
  const isLoading = isStoreLoading || isCreateLoading || isUpdateLoading;

  return (
    <ManageStoreForm
      store={store}
      onSave={isEditing ? updateStore : createStore}
      isLoading={isLoading}
    />
  );
};

export default ManageStorePage;
