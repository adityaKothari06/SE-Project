import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router";

const ReservationForm = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const foodData = location.state;

  const [foodAmount, setFoodAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReserve = () => {
    setError("");
    setSuccess("");

    if (!foodAmount || foodAmount <= 0) {
      setError("Please enter valid food quantity");
      return;
    }

    setSuccess("Reservation successful! 🎉");

    setTimeout(() => {
      navigate("/confirm", {
        state: {
          foodName: foodData?.foodName,
          donor: foodData?.donor,
          location: foodData?.location,
          servings: foodAmount,
          userName: currentUser?.displayName,
        },
      });
    }, 1000);
  };

  if (!foodData) {
    return (
      <div className="text-center mt-10 text-red-500">
        No food selected. Please go back.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Reserve Food
        </h2>

        {/* Food Info */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p><strong>Food:</strong> {foodData?.foodName}</p>
          <p><strong>Donor:</strong> {foodData?.donor}</p>
          <p><strong>Location:</strong> {foodData?.location}</p>
        </div>

        {/* User */}
        <div className="mb-4">
          <label className="block text-sm mb-1">User Name</label>
          <input
            type="text"
            value={currentUser?.displayName || currentUser.firstName}
            disabled
            className="w-full px-4 py-3 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Mobile Number</label>
          <input
            type="text"
            value={currentUser?.phoneNumber || ""}
            disabled
            className="w-full px-4 py-3 rounded-lg border bg-gray-100"
          />
        </div>

        {/* Servings */}
        <div className="mb-5">
          <label className="block text-sm mb-1">
            Approx Food (servings)
          </label>
          <input
            type="number"
            value={foodAmount}
            onChange={(e) => setFoodAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleReserve}
          className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
        >
          Reserve
        </button>

        <div className="mt-4 text-center">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>

      </div>
    </div>
  );
};

export default ReservationForm;