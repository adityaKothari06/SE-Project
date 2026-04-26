import FoodCard from "./FoodCard";
import { useState, useEffect } from "react";

const FoodTable = ({ city }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/events?city=${city || ""}`
      );
      const data = await res.json();

      console.log("Fetched events:", data);
      setFoodData(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [city]);

  // ⏱ Timer for expiry
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔁 Transform backend → UI format
  const transformedFood = foodData.map((event) => ({
    id: event.id,
    donor: event.poc_name,
    foodName: event.food_type,
    category: "Donation",
    quantity: event.food_quantity,
    location: event.city,
    image: "https://source.unsplash.com/400x300/?food",
    createdAt: event.created_at,
    expiryTime: event.pickup_end,
  }));

  // 🔍 Filter + remove expired
  const filteredFood = transformedFood
  .filter((food) => {
  const expiry = new Date(food.expiryTime + "Z"); // force UTC
  return expiry > currentTime;
})
  

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="mt-5 px-4 space-y-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Available Food Donations
      </h2>

      <div className="grid grid-cols-1 gap-10">
        {filteredFood.length > 0 ? (
          filteredFood.map((food) => (
            <FoodCard key={food.id} {...food} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No available food
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodTable;