import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema=z.object({
    searchQuery:z.string({
        required_error:"Name is required",
    }),
});

export type SearchFrom= z.infer<typeof formSchema>

type Props={
    onSubmit:(formData:SearchFrom)=>void
    placeHolder:string;
    onReset?:()=>void;
}


const SearchBar = ({onSubmit,onReset,placeHolder}:Props) => {
    const form =useForm<SearchFrom>({
        resolver:zodResolver(formSchema),
    })
  return (
    <div>
      
    </div>
  )
}

export default SearchBar
