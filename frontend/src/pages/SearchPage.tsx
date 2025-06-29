import { useSearchStore } from "@/api/StoreApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState={
  searchQuery:string;

}


const SearchPage = () => {
  const { storeName } = useParams();
  const [searchState,setSearchState]=useState<SearchState>({
    searchQuery:"",
  })

  

  const { results, isLoading } = useSearchStore(searchState,storeName); // assuming useSearchStore gives isLoading too

  

  if (isLoading || !results?.data || !storeName) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium">Loading stores...</p>
      </div>
    );
  }
  const handleSearchQuery=(searchFormData:SearchForm)=>{
    setSearchState((prevState)=>({
      ...prevState,
      searchQuery:searchFormData.searchQuery,
    }));
  };
  const resetSearch=()=>{
    setSearchState((prevState)=>({
      ...prevState,
      searchQuery:"",
    }));
  }
  return (
    <div className="grid gird-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines here:</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar searchQuery={searchState.searchQuery} placeHolder="Search by Cuisines" onSubmit={handleSearchQuery} onReset={resetSearch}/>
        <SearchResultInfo
          total={results?.pagination.total}
          storeName={storeName}
        />
        {results.data.map((store) => (
          <SearchResults key={store._id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
