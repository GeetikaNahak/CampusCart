import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
    const {updateUser,isLoading}=useUpdateMyUser();
  return (
    <div className="px-4 sm:px-6 md:px-8">
  <UserProfileForm onSave={updateUser} isLoading={isLoading} />
</div>
  );
}
