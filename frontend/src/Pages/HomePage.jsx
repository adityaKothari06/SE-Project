const HomePage = () => {
  return (
    <div className="bg-blue-50 min-h-screen">

      {/* MAIN STATEMENT */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight">
          Food is wasted every day  
          while millions go hungry.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          India produces enough food, yet many sleep hungry.
        </p>
      </section>

      {/* IMPACT CARDS (INDIA DATA) */}
      <section className="py-16 px-6 max-w-6xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Hunger */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-red-400 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">190M+</h2>
            <p className="text-gray-600 mt-2">
              people in India are undernourished
            </p>
          </div>

          {/* Food Waste */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-400 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">68M Tons</h2>
            <p className="text-gray-600 mt-2">
              food wasted every year in India
            </p>
          </div>

          {/* Child Malnutrition */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-400 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">35%</h2>
            <p className="text-gray-600 mt-2">
              children under 5 are malnourished
            </p>
          </div>

          {/* Food Recovery (approx impact type stat) */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-400 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">10M+</h2>
            <p className="text-gray-600 mt-2">
              meals can be recovered daily if waste is managed
            </p>
          </div>

        </div>

      </section>

      {/* QUOTE */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <p className="text-xl text-gray-700 italic">
          “If you can’t feed a hundred people, feed one.”
        </p>

        <p className="mt-4 text-gray-500">
          — Mother Teresa
        </p>
      </section>

    </div>
  );
};

export default HomePage;