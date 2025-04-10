
import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email:z.string().optional(),
    name :z.string().min(1,"name is required"),
    collegeId:z.string().min(1,"name is required"),
    branch:z.string().min(1,"name is required"),

});
type UserFromData=z.infer<typeof formSchema>;


type Props={
    onSave: (UserProfileData:UserFromData)=>void;
    isLoading:boolean;
}

const UserProfileForm=({onSave,isLoading}:Props) => {
  const form=useForm<UserFromData>({
    resolver:zodResolver(formSchema),
  })

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
             <div>
                <h2 className="text-2xl font-bold">
                    User Profile From </h2>
                    <FormDescription>
                        view and change your profile information here
                    </FormDescription>

                
             </div><FormField control={form.control} name="email" render={({field})=>{
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input  {...field}/></FormControl>
                </FormItem>
             }}/>
        </form>
    </Form>
  )
}



export default UserProfileForm
