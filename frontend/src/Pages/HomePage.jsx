
const HomePage = () => {
  return (
    <div className="bg-blue-50 min-h-screen text-center py-20">

      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to The Zero Waste Pantry 🌱
      </h1>

      <p className="mt-6 text-gray-600">
        Shop sustainably and reduce waste.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-blue-600 text-white rounded-2xl px-6 py-3 hover:bg-blue-700">
          Shop Now
        </button>

        <button className="border border-gray-400 rounded-2xl px-6 py-3 hover:bg-gray-100">
          Learn More
        </button>
      </div>

    </div>
  );
};

export default HomePage;