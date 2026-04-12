import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [message, setMessage] = useState("");

  if (!data) {
    return (
      <div className="text-center mt-10 text-red-500">
        Invalid access. Please reserve food first.
      </div>
    );
  }

  const handleConfirm = () => {
    setMessage("✅ Pickup confirmed successfully!");

    setTimeout(() => {
      navigate("/FoodList");
    }, 1500);
  };

  const handleCancel = () => {
    setMessage("❌ Reservation cancelled. Slot released.");

    setTimeout(() => {
      navigate("/FoodList");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Confirm Pickup
        </h2>

        {/* Summary */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p><strong>Food:</strong> {data.foodName}</p>
          <p><strong>Donor:</strong> {data.donor}</p>
          <p><strong>Location:</strong> {data.location}</p>
          <p><strong>Servings:</strong> {data.servings}</p>
          <p><strong>User:</strong> {data.userName}</p>
        </div>

        <p className="text-sm text-gray-600 mb-5 text-center">
          Please confirm once you have collected the food.
        </p>

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          className="w-full py-3 mb-3 text-white rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
        >
          Confirm Pickup
        </button>

        {/* Cancel */}
        <button
          onClick={handleCancel}
          className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90"
        >
          Cancel / No-Show
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.includes("❌") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;