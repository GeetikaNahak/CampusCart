import { useParams } from "react-router-dom"

const SearchPage = () => {
    const {storeName}=useParams();
  return (
    <span>User Searched for {storeName}</span>
  )
}

export default SearchPage
