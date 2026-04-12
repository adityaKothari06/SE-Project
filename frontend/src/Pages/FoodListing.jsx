import { useState, useEffect } from "react";
import FoodTable from "../components/FoodTable";
import { useLocation } from "react-router";

const FoodListing = () => {
  const [locationFilter, setLocationFilter] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleLocationFilter = (e) => {
    const value = e.target.value;
    setLocationFilter(value);

    if (value.trim() === "") {
      setSearchedCity("");
    }
  };

  const handleSearchClick = () => {
    if (locationFilter.trim() !== "") {
      setSearchedCity(locationFilter.trim());
    }
  };

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
    <div className="px-6 py-10 max-w-6xl mx-auto space-y-10">

      {/* Search */}
      <div className="flex justify-center">
        <div className="flex w-full max-w-2xl gap-2">
          <input
            type="text"
            placeholder="Search by city..."
            value={locationFilter}
            onChange={handleLocationFilter}
            onKeyDown={handleEnterKey}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <button
            onClick={handleSearchClick}
            disabled={!locationFilter.trim()}
            className={`px-5 py-2 rounded-lg text-white ${
              locationFilter.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </div>
      </div>

      {/* Empty State */}
      {!searchedCity && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Find food near you
          </h1>

          <p className="text-gray-600 mt-3 max-w-md">
            Search your city to discover available food donations.
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-md mt-8 w-full max-w-md">
            <p className="text-gray-500 text-sm">
              Start by entering your city above 👆
            </p>
          </div>

        </div>
      )}

      {/* Results */}
      {searchedCity && (
        <div className="space-y-6">

          <div className="text-center text-lg font-medium text-gray-700">
            Showing results for{" "}
            <span className="text-blue-600">{searchedCity}</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <FoodTable city={searchedCity} />
          </div>

        </div>
      )}
    </div>
  );
};

export default FoodListing;