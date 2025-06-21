import {  useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi.tsx";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";

const UserProfilePage = () => {
    const {currentUser, isLoading: isGetLoading}=useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  
  if(isGetLoading){
    return <span>Loading ...</span>
  }
  if(!currentUser){
    return <span>Unable to Load User Profile</span>
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;