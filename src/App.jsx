import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import Account from "./pages/Account";
import Places from "./pages/Places";
import PlacesForm from "./pages/PlacesFormPage";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import PlacePage from "./pages/PlacePage";
import { MyBooking } from "./pages/MyBooking";
axios.defaults.baseURL = "https://airbnb-api-wheat.vercel.app/";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />}>
            <Route index element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<MyBooking />} />
            <Route path="places" element={<Places />} />
            <Route path="places/new" element={<PlacesForm />} />
            <Route path="places/:id" element={<PlacesForm />} />
          </Route>
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
