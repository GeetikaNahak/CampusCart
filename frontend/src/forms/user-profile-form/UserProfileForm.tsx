import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { User } from "@/types";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  collegeId: z.string().min(1, "College ID is required"),
  branch: z.string().min(1, "Branch is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser:User;
  onSave: (data: UserFormData) => void | Promise<void>;
  isLoading: boolean;
  defaultValues?: Partial<UserFormData>;
  title?:string;
  buttonText?:string;
};



const UserProfileForm = ({ onSave, isLoading,currentUser,title="User Profile",buttonText="submit" }: Props) => {

  
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });
  useEffect(()=>{
    form.reset(currentUser);
  },[currentUser,form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)} 
        className="space-y-4 bg-gray-100 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            View and update your profile information here.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="collegeId"
            render={({ field }) => (
              <FormItem className="flex flex-col p-3">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="bg-white border border-gray-300 p-1 mt-2 outline-none"
                  >
                    <option value="">Select a role</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-950 text-white font-medium px-6 py-2 rounded-md transition"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
