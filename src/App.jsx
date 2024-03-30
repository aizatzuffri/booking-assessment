import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BookingsPage from "./pages/BookingsPage";
import BookNowPage from "./pages/BookNowPage";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./components/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/booknow" element={<BookNowPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}