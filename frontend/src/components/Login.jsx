import { Link, useNavigate } from "react-router";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../context/useAuth";

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

  const [isPending, startTransition] = useTransition();

  // for timer
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // for recaptcha automatically
  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
    );
    setRecaptchaVerifier(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    };
  }, []);

  // this is to request otp
  const requestOtp = async (e) => {
    e.preventDefault();
    setResendCountdown(60);

    startTransition(async () => {
      setError("");

      if (!recaptchaVerifier) {
        return setError("Captcha verification Failed");
      }

      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier,
        );

        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully.");
      } catch (err) {
        console.log(err);
        setResendCountdown(0);

        if (err.code === "auth/invalid-phone-number") {
          setError("Invalid phone number. Please check the number.");
        } else if (err.code === "auth/too-many-requests") {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      }
    });
  };

  // otp verification
  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");

      if (!confirmationResult) {
        setError("Please request OTP first.");
        return;
      }

      try {
        const result = await confirmationResult.confirm(otp);

        // updating context
        setCurrentUser(result.user);

        navigate("/FoodList");
      } catch (error) {
        console.log(error);

        setError("Failed to verify OTP. Please check the OTP.");
      }
    });
  };

  // for auto verifying the otp
  useEffect(() => {
    const hasEnteredAllDigits = otp.trim().length === 6;
    if (hasEnteredAllDigits) {
      (async () => {
        await verifyOtp();
      })();
    }
  }, [otp]);

  return (
    <div className="flex items-center justify-center bg-blue-50 min-h-screen md:pt-14">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        {!confirmationResult && (
          <form onSubmit={requestOtp} className="">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Login
            </h2>
            {/* Phone No */}
            <div className="mb-5">
              <label
                htmlFor="ph-no"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Phone No
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 shadow-sm"
                placeholder="+91 7894561230"
                required
              />
              <div className="mt-2 text-sm font-medium text-gray-800">
                <p>Not a user?</p>
                <Link to={"/Register"} className="underline">
                  Register
                </Link>
              </div>
            </div>
          </form>
        )}

        {confirmationResult && (
          <div className="mb-5 mt-5">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-800"
            >
              Enter OTP
            </label>
            <input
              type="tel"
              id="otp"
              value={otp}
              maxLength="6"
              pattern="\d{6}"
              onChange={(e) => setOtp(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>
        )}

        {/* Send OTP Button */}
        <div className="flex justify-center items-center">
          <button
            disabled={!phoneNumber || isPending || resendCountdown > 0}
            onClick={requestOtp}
            className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none shadow-sm cursor-pointer"
          >
            {resendCountdown > 0
              ? `Resend OTP in ${resendCountdown}`
              : isPending
                ? "Sending OTP"
                : "Send OTP"}
          </button>
        </div>

        <div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;
