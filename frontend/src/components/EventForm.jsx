import { useState } from "react";
import { useNavigate } from "react-router";
import LocationInput from "./LocationInput";

const EventForm = () => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);

  const [formData, setFormData] = useState({
    institutionName: "",
    address: "",
    pocName: "",
    pocMobile: "",
    approxFood: "",
    foodType: "Veg",
    durationMinutes: "", // how long to keep listing
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.institutionName ||
      !formData.address ||
      !formData.pocName ||
      !formData.pocMobile ||
      !formData.durationMinutes
    ) {
      alert("Please fill all required fields");
      return;
    }

    const now = new Date();
    const expiryTime = new Date(
      now.getTime() + formData.durationMinutes * 60 * 1000,
    );

    const submissionData = {
      ...formData,
      location: locationData?.address,
      lat: locationData?.lat,
      lng: locationData?.lng,
      submittedAt: now,
      expiryTime,
    };

    console.log("Submission Data:", submissionData);

    // 🔥 FUTURE API CALL
    /*
    fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
    */

    setSubmitted(true);

    // Redirect to FoodListing after 1 second
    setTimeout(() => {
      navigate("/FoodList", { state: { city: "" } });
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add Food Donation Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="institutionName"
          placeholder="Institution Name"
          value={formData.institutionName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitted}
        />

        {/* <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitted}
        /> */}

        <LocationInput
          onLocationSelect={(data) => {
            setLocationData(data);

            setFormData((prev) => ({
              ...prev,
              address: data.address,
            }));
          }}
        />

        <input
          type="text"
          name="pocName"
          placeholder="POC Name"
          value={formData.pocName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitted}
        />

        <input
          type="tel"
          name="pocMobile"
          placeholder="POC Mobile Number"
          value={formData.pocMobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitted}
        />

        <input
          type="number"
          name="approxFood"
          placeholder="Approx Food (Number of people)"
          value={formData.approxFood}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitted}
        />

        <select
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitted}
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>

        <input
          type="number"
          name="durationMinutes"
          placeholder="Keep listing for (minutes)"
          value={formData.durationMinutes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={submitted}
          required
        />

        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            submitted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={submitted}
        >
          {submitted ? "Submitted ✅" : "Submit Donation"}
        </button>
      </form>

      {submitted && (
        <p className="text-green-600 text-center mt-4">
          ✅ Donation added successfully! Redirecting...
          {console.log(formData)}
        </p>
      )}
    </div>
  );
};

export default EventForm;
