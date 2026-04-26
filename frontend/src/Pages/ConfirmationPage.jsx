import { useNavigate, useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [foodData, setFoodData] = useState(location.state || null);
  const [error, setError] = useState(null);

  console.log("ID:", id);
  console.log("State:", foodData);

  useEffect(() => {
    if (!foodData) {
      fetch(`http://localhost:8000/events/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const transformed = {
            foodName: data.food_type,
            donor: data.poc_name,
            location: data.city,
          };
          setFoodData(transformed);
        })
        .catch(() => setError("Failed to load data"));
    }
  }, [id, foodData]);

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!foodData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const handleConfirm = async () => {
    try {
    const res = await fetch(
      `http://localhost:8000/reservations/${id}/collect?recipient_uid=${foodData?.userId}`,
      { method: "POST" }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.detail);

    setMessage("✅ Pickup confirmed successfully!");
    setTimeout(() => navigate("/FoodList"), 1500);
  } catch (err) {
    setMessage("❌ " + err.message);
  }
  };

  const handleCancel = async () => {
    try {
    const res = await fetch(
      `http://localhost:8000/reservations/${id}/unreserve?recipient_uid=${foodData?.userId}`,
      { method: "POST" }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.detail);

    setMessage("❌ Reservation cancelled. Slot released.");
    setTimeout(() => navigate("/FoodList"), 1500);
  } catch (err) {
    setMessage("❌ " + err.message);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Confirm Pickup</h2>

        {/* Summary */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p>
            <strong>Food:</strong> {foodData.foodName}
          </p>
          <p>
            <strong>Donor:</strong> {foodData.donor}
          </p>
          <p>
            <strong>Location:</strong> {foodData.location}
          </p>
          <p>
            <strong>Servings:</strong> {foodData?.servings}
          </p>
          <p>
            <strong>User:</strong> {foodData?.userName}
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-5 text-center">
          Please confirm once you have collected the food.
        </p>

        <button
          onClick={handleConfirm}
          className="w-full py-3 mb-3 text-white rounded-lg bg-green-600"
        >
          Confirm Pickup
        </button>

        <button
          onClick={handleCancel}
          className="w-full py-3 text-white rounded-lg bg-red-600"
        >
          Cancel / No-Show
        </button>

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
