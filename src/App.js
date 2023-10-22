import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

const Signup = lazy(() => import("./Components/Signup"));
const Login = lazy(() => import("./Components/Login"));
const Navbar = lazy(() => import("./Components/Navbar"));
const HomePage = lazy(() => import("./Components/HomePage"));
const AddDocument = lazy(() => import("./Components/AddDocument"));
const AddQr = lazy(() => import("./Components/AddQr"));
const AddGroup = lazy(() => import("./Components/AddGroup"));
const AddCustomer = lazy(() => import("./Components/AddCustomer"));
const AdminPage = lazy(() => import("./Components/Admin"));
const ScanDetails = lazy(() => import("./Components/ScanDetails"));

function App() {
  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route path="/addcustomer" element={<AddCustomer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id/addoc" element={<AddDocument />} />
          <Route path="/:id/addqr" element={<AddQr />} />
          <Route path="/addgroup" element={<AddGroup />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/scans" element={<ScanDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
