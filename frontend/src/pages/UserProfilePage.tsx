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
    <UserProfileForm onSave={handleSave} isLoading={isLoading}/>
  );
}
