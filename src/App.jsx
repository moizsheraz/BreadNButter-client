import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quarter1 from "./pages/Quarter1";
import Quarter2 from "./pages/Quarter2";
import Quarter3 from "./pages/Quarter3";
import Quarter4 from "./pages/Quarter4";
import Quarter1Details from "./pages/Quarter1Details";
import Quarter2Detail from "./pages/Quarter2Detail";
import FinancialStatement from "./pages/FinancialStatement";
import ProtectedRoute from "./pages/ProtectedRoute";
import IncomeStatement from "./pages/admin/UpdateIncomeStatement";
import UsersList from "./pages/admin/UsersList";
import UserDetails from "./pages/admin/UserDetails";

import Dashboard from "./pages/admin/Dashboard";
import Revenue from "./pages/admin/Revenue";
import UpdateQuarter2Info from "./pages/admin/UpdateQuarter2Info";

function App() {
  // const isAuthenticated = !!localStorage.getItem("breadToken");
  const { authUser } = useAuthContext();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   let User = JSON.parse(localStorage.getItem("breadUser"));
  //   if (User) {
  //     if (User.role === "admin") {
  //       navigate("/admin");
  //     }
  //   }
  // }, []);

  return (
    <Routes>
      {/* <Route element={<ProtectedRoute />}> */}
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* </Route> */}

      <Route element={<ProtectedRoute isAuthenticated={authUser} />}>
        <Route path="/quarter1" element={<Quarter1 />} />
        <Route path="/quarter1/:id" element={<Quarter1Details />} />
        <Route path="/quarter2" element={<Quarter2 />} />
        <Route path="/quarter2/:id" element={<Quarter2Detail />} />
        <Route path="/quarter3" element={<Quarter3 />} />
        <Route path="/quarter4" element={<Quarter4 />} />
        <Route path="/financialStatement" element={<FinancialStatement />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/revenue" element={<Revenue />} />
        <Route path="/admin/incomeStatement" element={<IncomeStatement />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id" element={<UserDetails />} />
        <Route path="/admin/quarter2" element={<UpdateQuarter2Info />} />
      </Route>
    </Routes>
  );
}

export default App;
