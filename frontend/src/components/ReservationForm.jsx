import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, useParams } from "react-router";

const ReservationForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();


  const [foodData, setFoodData] = useState(null);
  const [foodAmount, setFoodAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Food Data:", foodData);


  useEffect(() => {
    fetch(`http://localhost:8000/events/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const transformed = {
        id: data.id,
        institution_name: data.institution_name,
        foodName: data.food_type,
        donor: data.poc_name,
        location: data.city,
        quantity: data.food_quantity,
      };

      setFoodData(transformed);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to load food data");
    });

  }, [id]);


  const handleReserve = async () => {
    setError("");
    setSuccess("");
    const qty = Number(foodAmount);

    if (!qty || qty <= 0) {
      setError("Please enter valid food quantity");
      return;
    }

    if (qty > foodData.quantity) {
      setError("Cannot Reserve more than available quantity");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/reservations/${foodData.id}?recipient_uid=${currentUser.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity_requested: Number(foodAmount),
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend error:", data);
        throw new Error(data.detail || "Reservation Failed");
      }
      const currentFood = foodData;

      setFoodData((prev) => ({
      ...prev,
      quantity: prev.quantity - qty,
    }));

      setSuccess("Reservation successful! 🎉");

      setTimeout(() => {
        navigate(`/confirm/${currentFood.id}`, {
          state: {
            foodName: currentFood?.foodName,
            donor: currentFood?.donor,
            location: currentFood?.location,
            servings: qty,
            userName: currentUser?.firstName,
            userId: currentUser.uid,
          },
        });
      }, 800);
    } catch (err) {
      setError(err.message);
    }finally {
      setLoading(false);
    }
  };

  if (!foodData && !error) {
  return <div className="text-center mt-10">Loading...</div>;
}

if (error) {
  return <div className="text-center mt-10 text-red-500">{error}</div>;
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-blue-200 to-blue-300 mt-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Reserve Food</h2>

        {/* Food Info */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p><strong>Institution:</strong> {foodData.institution_name}</p>
          <p><strong>Food:</strong> {foodData.foodName}</p>
          <p><strong>Donor:</strong> {foodData.donor}</p>
          <p><strong>Location:</strong> {foodData.location}</p>
          <p><strong>Available:</strong> {foodData.quantity}</p>

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
          <label className="block text-sm mb-1">Approx Food (servings)</label>
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
          className="w-full py-3 text-white rounded-lg bg-linear-to-r from-blue-500 to-blue-600 hover:opacity-90"
        >
          {loading ? "Reserving..." : "Reserve"}
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
