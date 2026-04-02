import { useState, useEffect } from "react";
import FoodTable from "../components/FoodTable";
import { useLocation } from "react-router";

const FoodListing = () => {
  const [locationFilter, setLocationFilter] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleLocationFilter = (e) => {
    const value = e.target.value;
    setLocationFilter(value);

    // Resetting the ui if cleared
    if (value.trim() === "") {
      setSearchedCity("");
    }
  };

  // handle Search click
  const handleSearchClick = () => {
    if (locationFilter.trim() !== "") {
      setSearchedCity(locationFilter.trim());
    }
  };

  // enter to search
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.city) {
      setLocationFilter(location.state.city);
      setSearchedCity(location.state.city);
    }
  }, [location.state]);

  return (
    <div className="mt-25 px-4 space-y-6">
      {/* Search bar */}
      <div className="flex items-center justify-center gap-2 w-full">
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter || ""}
          onChange={handleLocationFilter}
          onKeyDown={handleEnterKey}
          className="flex-1 max-w-md p-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleSearchClick}
          disabled={!locationFilter || !locationFilter.trim()}
          className={`px-4 py-2 rounded text-white whitespace-nowrap ${
            locationFilter && locationFilter.trim()
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>

      {/* Default Message */}
      {!searchedCity && (
        <div className="text-xl text-center text-gray-600">Select City..</div>
      )}

      {searchedCity && (
        <>
          <div className="text-lg text-center font-semibold">
            Showing results for:{" "}
            <span className="text-blue-600">{searchedCity}</span>
          </div>

          <FoodTable city={searchedCity} />
        </>
      )}
    </div>
  );
};

export default FoodListing;
