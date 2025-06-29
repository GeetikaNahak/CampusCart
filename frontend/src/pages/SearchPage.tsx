import { useSearchStore } from "@/api/StoreApi";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom"

const SearchPage = () => {
  const { storeName } = useParams();
  const { results, isLoading } = useSearchStore(storeName); // assuming useSearchStore gives isLoading too

  if (isLoading || !results?.data || !storeName) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium">Loading stores...</p>
      </div>
    );
  }

  return (
    <div className="grid gird-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        insert cuisines here:
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo total={results?.pagination.total} storeName={storeName} />
      </div>
    </div>
  );
}


export default SearchPage
