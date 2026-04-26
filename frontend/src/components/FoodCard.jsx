import { Link } from "react-router";

const FoodCard = ({
  id,
  donor,
  foodName,
  category,
  quantity,
  location,
  image,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl shadow-md transition overflow-hidden">
      {/* Left Side (Image) */}
      <div className="w-full md:w-1/3 h-40 bg-gray-200 flex items-center justify-center m-5 rounded-xl">
        <img
          src={image}
          alt={foodName}
          className="w-full h-40 object-fill rounded md:object-cover"
        />
      </div>

      {/* Right Side Content */}
      <div className="p-5 flex flex-col justify-between w-full md:w-2/3">
        {/* Title */}
        <h5 className="text-xl font-semibold text-gray-800 mb-2">{foodName}</h5>

        {/* Info */}
        <p className="text-sm text-gray-600 mb-1">👤 Donor: {donor}</p>
        <p className="text-sm text-gray-600 mb-1">🍽 Category: {category}</p>
        <p className="text-sm text-gray-600 mb-1">
          📦 Quantity: {quantity} servings
        </p>
        <p className="text-sm text-gray-600 mb-3">📍 Location: {location}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Reserve Pickup Button */}
          <Link
            to={`/reserve/${id}`} 
          >
            <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
              Reserve Pickup
            </button>
          </Link>

          {/* Read More */}
          <Link
            to={`/food/${id}`}
          >
            <button className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
