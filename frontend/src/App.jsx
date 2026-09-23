import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";

import PublicHomePage from "./pages/public/PublicHomePage";

import GuestLayout from "./pages/guest/GuestLayout";
import HomePage from "./pages/guest/HomePage";
import RoomsPage from "./pages/guest/RoomsPage";
import RoomDetailPage from "./pages/guest/RoomDetailPage";
import PaymentPage from "./pages/guest/PaymentPage";
import PaymentSuccessPage from "./pages/guest/PaymentSuccessPage";
import MyBookingsPage from "./pages/guest/MyBookingsPage";
import GuestSettingsPage from "./pages/guest/SettingsPage";

import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import RoomsManagementPage from "./pages/admin/RoomsManagementPage";
import RoomUnitsPage from "./pages/admin/RoomUnitsPage";
import BookingsManagementPage from "./pages/admin/BookingsManagementPage";
import WalkInBookingPage from "./pages/admin/WalkInBookingPage";
import GuestListPage from "./pages/admin/GuestListPage";
import TaskManagementPage from "./pages/admin/TaskManagementPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicHomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route
        element={
          <ProtectedRoute>
            <GuestLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/rooms/:roomTypeId/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/settings" element={<GuestSettingsPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/rooms" element={<RoomsManagementPage />} />
        <Route path="/admin/room-types/:id/rooms" element={<RoomUnitsPage />} />
        <Route path="/admin/bookings" element={<BookingsManagementPage />} />
        <Route path="/admin/bookings/new" element={<WalkInBookingPage />} />
        <Route path="/admin/guests" element={<GuestListPage />} />
        <Route path="/admin/tasks" element={<TaskManagementPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
