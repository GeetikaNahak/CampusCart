import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
    const {updateUser,isLoading}=useUpdateMyUser();
    const handleSave=(data:{
        name:string;
        collegeId:string;
        branch:string;
        email?:string;
    }):void=>{
        if(!data.email){
            console.log("email required");return;
        }
    updateUser;    }
  return (
    <div className="px-4 sm:px-6 md:px-8">
  <UserProfileForm onSave={handleSave} isLoading={isLoading} />
</div>
  );
}
