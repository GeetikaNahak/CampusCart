import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const {control}=useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold"> Details</h2>
        <FormDescription>
            Enter the Details about the Store
        </FormDescription>
      </div>
      <div className="flex gap-4">
    <FormField
        
        control={control}
        name="storeName"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Store Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="e.g., Canteen A" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="e.g., Ground Floor, Block B" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="bg-white"
                placeholder="Describe what the store offers (e.g., meals, snacks, stationery)..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default DetailsSection

