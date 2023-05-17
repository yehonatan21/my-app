import React from "react";
import "./styles/App.css";
import Timer from "./conponent/Timer";
import Inbox from "./conponent/Inbox";
import { Calculator } from "./conponent/Calculator";
import Navbar from "./conponent/Navbar";
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import Login from "./conponent/Login";
import UserProvider from "./conponent/Context/UserContext";
import Register from "./conponent/Register";
import Outbox from "./conponent/Outbox";
import PrivateRoute from "./conponent/PrivateRoute";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<></>} />
              <Route path="/timer" element={<Timer />} />
              <Route
                path="/inbox"
                element={
                  <PrivateRoute>
                    <Inbox />
                  </PrivateRoute>
                }
              />
              <Route
                path="/outbox"
                element={
                  <PrivateRoute>
                    <Outbox />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </header>
    </div>
  );
};

export default App;
