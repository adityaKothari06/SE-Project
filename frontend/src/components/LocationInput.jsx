import { useState } from "react";

const LocationInput = ({ onLocationSelect }) => {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);

  // 📍 Get Current Location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 🔥 Reverse geocoding (OpenStreetMap)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();

          const address = data.display_name;

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state_district ||
            data.address?.state ||
            "";

          const payload = {
            address,
            city,
            lat: latitude,
            lng: longitude,
          };

          // ✅ Update local state
          setLocation(address);
          setCoords({ lat: latitude, lng: longitude });

          // ✅ Send to parent
          if (onLocationSelect) {
            onLocationSelect(payload);
          }
        } catch (err) {
          console.error(err);
          alert("Failed to fetch address");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Location permission denied or unavailable");
        setLoading(false);
      },
    );
  };

  // ✍️ Manual input handler
  const handleManualChange = (e) => {
    const value = e.target.value;

    setLocation(value);

    const getCityFromAddress = (address) => {
      const parts = address.split(",");
      return parts[parts.length - 3]?.trim() || "";
    };

    const payload = {
      address: value,
      city: getCityFromAddress(value), // ✅ ADD THIS
      lat: null,
      lng: null,
    };

    if (onLocationSelect) {
      onLocationSelect(payload);
    }
  };

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-800">
        Location
      </label>

      {/* Address Input */}
      <input
        type="text"
        value={location}
        onChange={handleManualChange}
        placeholder="Enter address"
        className="w-full border border-gray-300 p-2 rounded mb-3"
        required
      />

      {/* Current Location Button */}
      <button
        type="button"
        onClick={getCurrentLocation}
        className="w-full mb-3 bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? "Fetching location..." : "Use Current Location 📍"}
      </button>

      {/* Coordinates (optional display) */}
      {coords.lat && coords.lng && (
        <p className="text-xs text-gray-500">
          Lat: {coords.lat}, Lng: {coords.lng}
        </p>
      )}
    </div>
  );
};

export default LocationInput;
