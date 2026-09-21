import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import GuestLayout from "./pages/guest/GuestLayout";
import HomePage from "./pages/guest/HomePage";
import RoomsPage from "./pages/guest/RoomsPage";
import RoomDetailPage from "./pages/guest/RoomDetailPage";
import BookingPage from "./pages/guest/BookingPage";
import PaymentPage from "./pages/guest/PaymentPage";
import MyBookingsPage from "./pages/guest/MyBookingsPage";
import GuestSettingsPage from "./pages/guest/SettingsPage";

import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import RoomsManagementPage from "./pages/admin/RoomsManagementPage";
import RoomUnitsPage from "./pages/admin/RoomUnitsPage";
import BookingsManagementPage from "./pages/admin/BookingsManagementPage";
import GuestListPage from "./pages/admin/GuestListPage";
import TaskManagementPage from "./pages/admin/TaskManagementPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <GuestLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/rooms/:roomTypeId/book" element={<BookingPage />} />
        <Route path="/rooms/:roomTypeId/payment" element={<PaymentPage />} />
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
        <Route path="/admin/guests" element={<GuestListPage />} />
        <Route path="/admin/tasks" element={<TaskManagementPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
