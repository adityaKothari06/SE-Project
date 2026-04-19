import Navbar from "./components/Navbar";
import RegistrationPage from "./Pages/RegistrationPage";
import { Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";
import FoodListing from "./Pages/FoodListing";
import FoodDetails from "./components/FoodDetails";
import LoginPage from "./Pages/LoginPage";
import EventForm from "./components/EventForm";
import HomePage from "./Pages/HomePage";
import Terms from "./Pages/Terms";
import Profile from "./Pages/Profile";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

import ReservationForm from "./components/ReservationForm";
import ConfirmationPage from "./Pages/ConfirmationPage";

const AppContent = () => {
  const location = useLocation();

  // Fix scroll issue after navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/SignUp" element={<RegistrationPage />} />

          <Route
            path="/FoodList"
            element={
              <PrivateRoute>
                <FoodListing />
              </PrivateRoute>
            }
          />

          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/AddDonation" element={<EventForm />} />

          <Route
            path="/Profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/reserve/:id"
            element={
              <PrivateRoute>
                <ReservationForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/confirm/:id"
            element={
              <PrivateRoute>
                <ConfirmationPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;