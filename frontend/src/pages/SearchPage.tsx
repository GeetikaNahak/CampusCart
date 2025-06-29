import { useSearchStore } from "@/api/StoreApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { storeName } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });

  const { results, isLoading } = useSearchStore(searchState, storeName);

  const handleSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  if (isLoading || !results?.data || !storeName) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium">Loading stores...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar for cuisines */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Filter by Cuisine</h2>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-blue-600">Indian</button></li>
            <li><button className="hover:text-blue-600">Chinese</button></li>
            <li><button className="hover:text-blue-600">Snacks</button></li>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-6">
          <SearchBar
            searchQuery={searchState.searchQuery}
            placeHolder="Search by cuisine..."
            onSubmit={handleSearchQuery}
            onReset={resetSearch}
          />

          <SearchResultInfo
            total={results?.pagination.total}
            storeName={storeName}
          />

          {results.data.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No results found. Try a different cuisine!
            </p>
          )}

          <div className="grid gap-4">
            {results.data.map((store) => (
              <div
                key={store._id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <SearchResults store={store} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;