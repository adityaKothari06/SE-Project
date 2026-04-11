import { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Registration = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formattedPhone = phone.startsWith("+91")
        ? phone
        : `+91${phone}`;

      // 🔍 Check if already exists
      const userRef = doc(db, "users", formattedPhone);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setError("User already exists. Please login.");
        return;
      }

      // Save to Firestore
      await setDoc(userRef, {
        phone: formattedPhone,
        firstName,
        lastName,
        createdAt: new Date(),
      });

      alert("Registered successfully ✅");

      // Redirect to login
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <form
        onSubmit={handleRegister}
        className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl text-center mb-5">Register</h2>

        {/* Phone */}
        <div className="mb-5">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full border-b-2 border-gray-300 py-2.5 outline-none focus:border-blue-500"
            placeholder="Phone Number"
            required
          />
        </div>

        {/* First Name */}
        <div className="mb-5">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full border-b-2 border-gray-300 py-2.5 outline-none focus:border-blue-500"
            placeholder="First Name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-5">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="block w-full border-b-2 border-gray-300 py-2.5 outline-none focus:border-blue-500"
            placeholder="Last Name"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700"
        >
          Register
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default Registration;