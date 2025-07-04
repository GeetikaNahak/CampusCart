import { FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form"

const ImageSection = () => {
    const {control, watch}=useFormContext();
    const existingImageUrl=watch("imageUrl");


  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Upload Image</h2>
            <FormDescription>
                Add an Image that will be displayed on the Store Listing in the search results. Adding new image will overwrite the existing one.
            </FormDescription>
        </div> 
        <div className="flex"></div>
   
    <div className="flex flex-col gap-8 w-[50%]">
        {existingImageUrl&&(
            <AspectRatio ratio={16/9}>
                <img src={existingImageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
        )}
        <FormField
            control={control}
            name="imageFile"
            render={({field})=>(
                <FormItem>
                    <FormControl>
                        <Input className="bg-white" type="file" accept=".jpg, .jpeg, .png" onChange={(event)=>field.onChange(event.target.files?event.target.files[0]:null)}/>
                    </FormControl>
                </FormItem>
            )}
        
        />
    </div>
    </div>
  )
}

export default ImageSection
