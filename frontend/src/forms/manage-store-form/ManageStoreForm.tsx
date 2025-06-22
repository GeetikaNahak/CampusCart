
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinnesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

export const formSchema = z.object({
  storeName: z.string({
    required_error: "Store name is required",
  }).min(2, "Store name must be at least 2 characters"),

  location: z.string({
    required_error: "Location is required",
  }),

  description: z.string({
    required_error: "Description is required",
  }).min(10, "Description must be at least 10 characters"),
  cuisines:z.array(z.string()).nonempty({
    message:"Please Select Atleast One Item",
  }),

  items: z.array(
    z.object({
      name: z.string({
        required_error: "Item name is required",
      }).min(2, "Item name must be at least 2 characters"),

      price: z.coerce.number({
        required_error: "Item price is required",
      }).min(0, "Price must be a positive number"),

      available: z.boolean({
        required_error: "Availability is required",
      }),
    })
  ).min(1, "At least one item is required"),

  imageFile:z.instanceof(File, {message:"Image is required"}),
  
});

type storeFormData=z.infer<typeof formSchema>



type Props={
    onSave:(storeFormData:FormData)=>void;
    isLoading:boolean;
}
const ManageStoreForm=({onSave,isLoading}:Props)=>{
    const form=useForm<storeFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines:[],
            items:[{name:"",price:0}],

        }
    });

    const onsubmit=(formDataJson:storeFormData)=>{
        const formData = new FormData();

  // Append simple fields
  formData.append("storeName", formDataJson.storeName);
  formData.append("location", formDataJson.location);
  formData.append("description", formDataJson.description);

  formDataJson.items.forEach((item, index) => {
    formData.append(`items[${index}][name]`, item.name);
    formData.append(`items[${index}][price]`, item.price.toString());
    formData.append(`items[${index}][available]`, String(item.available));
  });

  // Now you can send formData with fetch or axios
  // Example using fetch:
  fetch("/api/store", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log("Success:", data))
    .catch((err) => console.error("Error:", err));
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 bg-gray-100 p-10 rounded-lg">
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>
                {isLoading?<LoadingButton/>:<Button type="submit" className="bg-black text-white hover:text-black ">Submit</Button>}
            </form>
        </Form>

    )
};
export default ManageStoreForm;