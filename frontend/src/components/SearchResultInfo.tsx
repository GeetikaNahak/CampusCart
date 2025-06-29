import { Link } from "react-router-dom";

type Props={
    total:number |undefined;
    storeName:string| any;
}
const SearchResultInfo = ({total,storeName}:Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Stores found with {storeName}
        <Link to="/" className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Search for other Store</Link>
      </span>
      Insert sort dropdown here
    </div>
  )
}

export default SearchResultInfo
