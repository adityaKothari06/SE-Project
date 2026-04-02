import { Link } from "react-router";

const Login = () => {
  return (
    <div className="flex items-center justify-center bg-blue-50 min-h-screen md:pt-14">
      <div></div>
      <form className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 shadow-sm"
            placeholder="name@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 placeholder-gray-400 shadow-sm"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Checkbox */}
        <label htmlFor="remember" className="flex items-center mb-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-100 focus:ring-2 focus:ring-blue-200"
            required
          />
          <p className="ml-2 text-sm font-medium text-gray-800 select-none">
            I agree with the{" "}
            <Link to="/terms-and-conditions" className="text-blue-600 hover:underline">
              terms and conditions
            </Link>
            .
          </p>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none shadow-sm"
        >
          Submit
        </button>

        <div className="mt-2 text-sm font-medium text-gray-800">
          <p>Not a user?</p>
          <Link to={"/Register"} className="underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

