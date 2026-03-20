import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import LoginScreen from "./screens/LoginScreen";
import BookStackScreen from "./screens/BookStackScreen";
import ATMQueueScreen from "./screens/ATMQueueScreen";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/stack"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <BookStackScreen />
                </PrivateLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/queue"
            element={
              <PrivateRoute>
                <PrivateLayout>
                  <ATMQueueScreen />
                </PrivateLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}