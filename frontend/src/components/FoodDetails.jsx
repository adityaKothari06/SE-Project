import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch if page refreshed
  useEffect(() => {
    if (!food) {
      fetch(`http://localhost:8000/events/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const transformed = {
            id: data.id,
            poc_name: data.poc_name,
            mobile: data.poc_mobile,
            foodName: data.food_type,
            quantity: data.food_quantity,
            city: data.city,
            address: data.address,
            pickupEnd: data.pickup_end,
            status: data.status,
            image: "https://source.unsplash.com/400x300/?food",
          };
          console.log(data);
          setFood(transformed);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          navigate("/FoodList");
        });
    }
  }, [id]);

  const [isExpired, setIsExpired] = useState(false);

useEffect(() => {
  if (!food?.pickupEnd) return;

  const interval = setInterval(() => {
    setIsExpired(new Date(food.pickupEnd + "Z") < new Date());
  }, 1000);

  return () => clearInterval(interval);
}, [food?.pickupEnd]);

  // loading instead of redirect
  if (loading || !food) {
    return <p className="mt-20 text-center">Loading...</p>;
  }

  const city = food?.city;

  // Reserve handler
  const handleReserve = () => {
    if (!currentUser) {
      navigate("/Login");
      return;
    }

    navigate(`/reserve/${id}`);
  };


  return (
    <div className="flex justify-center">
      <div className="p-6 mt-30 mb-15 max-w-3xl w-full shadow rounded-2xl">
        {/* Back */}
        <button
          onClick={() => navigate("/FoodList", { state: { city } })}
          className="mb-4 px-4 py-2 rounded-2xl hover:bg-gray-50"
        >
          ⬅ Back
        </button>

        <div className="p-5">
          {/* Image */}
          <img
            src={food.image}
            alt={food.foodName}
            className="w-full rounded-lg mb-4"
          />

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{food.foodName}</h1>

          {/* Info */}
          <p>
            <strong>Person of Contact Name:</strong> {food.poc_name}
          </p>
          <p>
            <strong>Contact:</strong> {"+91" + food.mobile}
          </p>
          <p>
            <strong>Quantity:</strong> {food.quantity}
          </p>
          <p>
            <strong>City:</strong> {food.city}
          </p>
          <p>
            <strong>Address:</strong> {food.address}
          </p>
          <p>
            <strong>Pickup Deadline:</strong>{" "}
            {new Date(food.pickupEnd + "Z").toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleReserve}
              disabled={isExpired}
              className={`px-4 py-2 rounded ${
                isExpired ? "bg-gray-400" : "bg-green-600 text-white"
              }`}
            >
              {isExpired ? "Expired" : "Reserve Pickup"}
            </button>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${food.address}`,
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
