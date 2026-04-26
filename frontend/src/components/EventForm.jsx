import { useState } from "react";
import { useNavigate } from "react-router";
import LocationInput from "./LocationInput";
import { useAuth } from "../context/useAuth";

const EventForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);

  const [formData, setFormData] = useState({
    institutionName: "",
    address: "",
    pocName: "",
    pocMobile: "",
    approxFood: "",
    foodType: "Veg",
    durationMinutes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  //  Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!currentUser) {
      alert("Login first")
      return;
    }

    if (
      !formData.address ||
      !formData.pocName ||
      !formData.pocMobile ||
      !formData.durationMinutes
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/events/?donor_uid=${currentUser.uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institution_name: formData.institutionName,
            address: formData.address,
            city: locationData?.city,
            poc_name: formData.pocName,
            poc_mobile: formData.pocMobile,
            food_type: formData.foodType,
            food_quantity: Number(formData.approxFood),
            duration_minutes: Number(formData.durationMinutes),
          }),
        }
      );

      if (!res.ok) {
        console.log("error: ", res)
        throw new Error("Failed to create event");
      }

      const data = await res.json();
      console.log("Created Event:", data);

      setSubmitted(true);

      // Redirecting to list page
      setTimeout(() => {
        navigate("/FoodList", { state: { city: data.city } });
      }, 1000);

    } catch (err) {
      console.error("Error creating event:", err);
      alert("Error creating event");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-25 p-8 bg-white shadow-xl rounded-2xl mb-20">
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

        {/* Location Input */}
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
        </p>
      )}
    </div>
  );
};

export default EventForm;