import { useParams, useLocation, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";

const FoodDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [isReserved, setIsReserved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canUnreserve, setCanUnreserve] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const city = location.state?.city;

  const foodData = [
    {
      id: "1",
      donor: "Ramesh Kumar",
      foodName: "Veg Biryani",
      category: "Cooked Food",
      quantity: 10,
      location: "Delhi",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.1O4yDXeGOG3jjdOivuw00gHaE8?pid=Api&h=220&P=0",
      description: "Freshly cooked veg biryani from a wedding event.",
    },
    {
      id: "2",
      donor: "Anita Sharma",
      foodName: "Sandwich Packets",
      category: "Packed Food",
      quantity: 25,
      location: "Gurgaon",
      image: "https://source.unsplash.com/400x300/?sandwich",
      createdAt: new Date(),
      expiryTime: new Date(Date.now() + 2 * 60 * 1000),
    },
  ];

  const food = foodData.find((item) => item.id === id);

  useEffect(() => {
    let timer;

    if (canUnreserve && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setCanUnreserve(false);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, canUnreserve]);

  // 🔥 ONLY CHANGE HERE
  const handleReserve = () => {
    if (!currentUser) {
      navigate("/Login");
      return;
    }

    navigate("/reserve", {
      state: {
        foodId: food.id,
        foodName: food.foodName,
        donor: food.donor,
        location: food.location,
        quantity: food.quantity,
      },
    });
  };

  const handleUnreserve = () => {
    setIsReserved(false);
    setCanUnreserve(false);
    setTimeLeft(0);
  };

  if (!food) return <p className="mt-20 text-center">Food not found</p>;

  return (
    <div className="p-6 mt-20 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/FoodList", { state: { city } })}
        className="mb-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{food.foodName}</h1>

      <img
        src={food.image}
        alt={food.foodName}
        className="w-full h-fit object-cover rounded-lg mb-4"
      />

      <p><strong>Donor:</strong> {food.donor}</p>
      <p><strong>Location:</strong> {food.location}</p>

      <div className="mt-6 flex gap-4 items-center">

        {/* 🔥 Reserve → now redirects */}
        <button
          onClick={handleReserve}
          className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
        >
          Reserve Pickup
        </button>

        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${food.location}`
            )
          }
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Get Directions
        </button>

      </div>
    </div>
  );
};

export default FoodDetails;