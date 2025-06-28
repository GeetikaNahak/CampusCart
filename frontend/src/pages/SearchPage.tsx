import { useSearchStore } from "@/api/StoreApi";
import { useParams } from "react-router-dom"

const SearchPage = () => {
    const {storeName}=useParams();
    const {results}=useSearchStore(storeName);
  return (
    <span>User Searched for {storeName}  
    <span>
      {results?.data.map((store)=>
      <span>found-{store.storeName} - {store.description}</span>
      )}
    </span>
    </span>
  )
}

export default SearchPage
