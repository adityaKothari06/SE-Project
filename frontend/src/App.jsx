import Navbar from "./components/Navbar";
import RegistrationPage from "./Pages/RegistrationPage";
import { Route, Routes } from "react-router";
import FoodListing from "./Pages/FoodListing";
import FoodDetails from "./components/FoodDetails";
import LoginPage from "./Pages/LoginPage";
import EventForm from "./components/EventForm";
import HomePage from "./Pages/HomePage";
import Terms from "./Pages/Terms";
import Home from "./Pages/Home";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";


const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<HomePage/>}/> */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/Register" element={<RegistrationPage />} />
          <Route path="/FoodList" element={
            <PrivateRoute><FoodListing /></PrivateRoute>
          } />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/AddDonation" element={<EventForm />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
