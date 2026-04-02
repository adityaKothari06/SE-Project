import { Link } from "react-router";
import FoodCard from "./FoodCard";
import { useState, useEffect } from "react";

const FoodTable = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
      createdAt: new Date(),
      expiryTime: new Date(Date.now() + 5 * 60 * 1000), // 5 min
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
    {
      id: "3",
      donor: "Ramesh Kumar",
      foodName: "Veg Biryani",
      category: "Cooked Food",
      quantity: 10,
      location: "Delhi",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.1O4yDXeGOG3jjdOivuw00gHaE8?pid=Api&h=220&P=0",
      createdAt: new Date(),
      expiryTime: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    },
    {
      id: "4",
      donor: "Ramesh Kumar",
      foodName: "Veg Biryani",
      category: "Cooked Food",
      quantity: 10,
      location: "Delhi",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.1O4yDXeGOG3jjdOivuw00gHaE8?pid=Api&h=220&P=0",
      createdAt: new Date(),
      expiryTime: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔍 Filter + remove expired
  const filteredFood = foodData
    .filter((food) =>
      food.location.toLowerCase().includes((props.city).toLowerCase()),
    )
    .filter((food) => new Date(food.expiryTime) > currentTime);

  return (
    <div className="mt-5 px-4 space-y-6">
        <div className="flex flex-row-reverse">
          <Link to={'/AddDonation'}>
          <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-lg cursor-pointer">Add Donation</button>
          </Link>
        </div>

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Available Food Donations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-10">
        {filteredFood.length > 0 ? (
          filteredFood.map((food) => <FoodCard key={food.id} {...food} />)
        ) : (
          <p className="text-center text-gray-500">No available food</p>
        )}
      </div>
    </div>
  );
};

export default FoodTable;
