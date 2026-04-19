import { Link, useNavigate } from "react-router";
import { auth, db } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState, useTransition } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  // ⏱ resend timer
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // 🔐 recaptcha setup
  useEffect(() => {
    const verifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );

    setRecaptchaVerifier(verifier);

    return () => {
      verifier.clear();
    };
  }, []);

  // 📲 SEND OTP
  const requestOtp = async () => {
    startTransition(async () => {
      setError("");
      setSuccess("");

      if (!recaptchaVerifier) {
        setError("Captcha verification failed");
        return;
      }

      try {
        const formattedPhone = phoneNumber.startsWith("+91")
          ? phoneNumber
          : `+91${phoneNumber}`;

        // 🔍 Check if user exists
        const userRef = doc(db, "users", formattedPhone);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setError("User not registered. Please register first.");
          return;
        }

        setResendCountdown(60);

        const result = await signInWithPhoneNumber(
          auth,
          formattedPhone,
          recaptchaVerifier
        );

        setConfirmationResult(result);
        setSuccess("OTP sent successfully");
        setOtpSent(true);
      } catch (err) {
        console.error(err);
        setResendCountdown(0);
        setError("Failed to send OTP");
      }
    });
  };

  // 🔐 VERIFY OTP
  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");

      if (!confirmationResult) {
        setError("Please generate OTP first");
        return;
      }

      if (otp.length !== 6) {
        setError("Enter complete OTP");
        return;
      }

      try {
        await confirmationResult.confirm(otp);
      } catch (err) {
        console.error(err);
        setError("Invalid OTP");
      }
    });
  };

  useEffect(() => {
  if (currentUser) {
    navigate("/FoodList");
  }
}, [currentUser]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-br from-blue-100 via-blue-200 to-blue-300 pt-14">
      <div className="max-w-sm w-full bg-white p-8 rounded-xl shadow-lg flex flex-col justify-center">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* PHONE INPUT */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-800">
            Phone No
          </label>

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 w-full px-4 py-3"
            placeholder="+91XXXXXXXXXX"
          />
        </div>

        {/* OTP INPUT */}
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
                  const finalOtp = newOtp.join("").slice(0, 6);
                  setOtp(finalOtp);

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
                className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ))}
          </div>
        </div>

        {/* SIGNUP */}
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
            className="w-1/2 text-white bg-linear-to-r from-blue-500 to-blue-600 rounded-lg px-4 py-2.5 shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isPending
              ? "Processing..."
              : otpSent
              ? "Verify OTP"
              : "Generate OTP"}
          </button>
        </div>

        {/* MESSAGES */}
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