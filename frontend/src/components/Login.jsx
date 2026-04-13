import { Link, useNavigate } from "react-router";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../context/useAuth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [otpSent, setOtpSent] = useState(false); // 🔥 NEW

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
    setRecaptchaVerifier(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    };
  }, []);

  const requestOtp = async () => {
    startTransition(async () => {
      setError("");

      if (!recaptchaVerifier) {
        return setError("Captcha verification Failed");
      }

      try {
        const formattedPhone = phoneNumber.startsWith("+91")
          ? phoneNumber
          : `+91${phoneNumber}`;

        const userRef = doc(db, "users", formattedPhone);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          setError("User not registered. Please register first.");
          return;
        }

        setResendCountdown(60);

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          formattedPhone,
          recaptchaVerifier
        );

        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully.");
        setOtpSent(true); // 🔥 IMPORTANT
      } catch (err) {
        console.log(err);
        setResendCountdown(0);
        setError("Failed to send OTP.");
      }
    });
  };

  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");

      if (!confirmationResult) {
        setError("Please generate OTP first.");
        return;
      }

      try {
        const result = await confirmationResult.confirm(otp);

        const phone = result.user.phoneNumber;
        const userRef = doc(db, "users", phone);
        const userSnap = await getDoc(userRef);

        let userData = {};
        if (userSnap.exists()) {
          userData = userSnap.data();
        }

        setCurrentUser({
          ...result.user,
          ...userData,
        });

        navigate("/FoodList");
      } catch (error) {
        setError("Invalid OTP.");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 md:pt-14">
      <div className="max-w-sm w-full bg-white p-8 rounded-xl shadow-lg min-h-[450px] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Phone */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-800">
            Phone No
          </label>

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 w-full px-4 py-3"
            placeholder="+91 7894561230"
          />
        </div>

        {/* OTP BOXES */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-800">
            Enter OTP
          </label>

          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index] || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/, "");
                  let newOtp = otp.split("");
                  newOtp[index] = value;
                  setOtp(newOtp.join("").slice(0, 6));

                  if (value && e.target.nextSibling) {
                    e.target.nextSibling.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    !otp[index] &&
                    e.target.previousSibling
                  ) {
                    e.target.previousSibling.focus();
                  }
                }}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ))}
          </div>
        </div>

        {/* Signup */}
        <div className="mb-4 text-sm">
          Not a user?{" "}
          <Link to="/SignUp" className="text-blue-600 underline">
            Sign up
          </Link>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={otpSent ? verifyOtp : requestOtp}
            disabled={!phoneNumber || isPending}
            className="w-1/2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg px-4 py-2.5 shadow-md disabled:opacity-50"
          >
            {isPending
              ? "Processing..."
              : otpSent
              ? "Verify OTP"
              : "Generate OTP"}
          </button>
        </div>

        {/* Messages */}
        <div className="mt-4 text-center">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;