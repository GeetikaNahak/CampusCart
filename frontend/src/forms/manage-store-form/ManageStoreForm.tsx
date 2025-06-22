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
import { Store } from "@/types";
import { useEffect } from "react";

export const formSchema = z
  .object({
    storeName: z.string({
      required_error: "Restaurant name is required",
    }),
    location: z.string({
      required_error: "City is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    items: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type StoreFormData = z.infer<typeof formSchema>;

type Props = {
  store?:Store;
  onSave: (storeFormData: FormData) => void;
  isLoading: boolean;
};

const ManageStoreForm = ({store, onSave, isLoading }: Props) => {
  const form = useForm<StoreFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      items: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if(!store)return;
    
    
    const updatedStore={
      ...store,
      
    }
    form.reset(updatedStore);
  }, [form,store])
  

  const onsubmit = (formDataJson: StoreFormData) => {
    const formData = new FormData();

    formData.append("storeName", formDataJson.storeName);
    formData.append("location", formDataJson.location);
    formData.append("description", formDataJson.description);

    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    if (formDataJson.imageUrl) {
      formData.append("imageUrl", formDataJson.imageUrl);
    }

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.items.forEach((item, index) => {
      formData.append(`items[${index}][name]`, item.name);
      formData.append(`items[${index}][price]`, item.price.toString());
    });

    formData.append("lastUpdated", Date.now().toString());

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="space-y-8 bg-gray-100 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-black text-white hover:text-black">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageStoreForm;
