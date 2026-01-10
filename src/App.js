import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
 import Menu from "./pages/Menu";
 import Cart from "./pages/Cart";
 import YourOrders from "./pages/YourOrders";
 
import AdminAllOrders from "./pages/AdminAllOrders"; 
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>

   <Route
  path="/cart"
  element={
    <PrivateRoute>
      <Cart />
    </PrivateRoute>
  }
/>    


<Route path="/admin/orders" element={<PrivateRoute><AdminAllOrders /></PrivateRoute >} />
<Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute    >} />

<Route
  path="/your-orders"
  element={
    <PrivateRoute>
      <YourOrders />
    </PrivateRoute>
  }
/>  

<Route
  path="/menu"
  element={
    <PrivateRoute>
      <Menu />
    </PrivateRoute>
  }
/>

        {/* Protected */}
        <Route
          path="/"
          element={
           
              <Home />
          
          }
        />

        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/verify"
          element={
            <PublicRoute>
              <VerifyOtp />
            </PublicRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
