import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/AuthContext";
import UpdateUserDataForm from "./features/authentication/UpdateUserDataForm";
import NewBooking from "./features/bookings/NewBooking";
import CabinDetails from "./features/cabins/CabinDetails";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Checkin from "./pages/Checkin";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime:0,
    },
  },
});

export default function App() {
  return (
    <AuthContextProvider> 
      
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="checkin/:bookingId" element={<Checkin />} />
          <Route path="cabins/:id" element={<CabinDetails />} />
          <Route path="profile" element={<UpdateUserDataForm />} />
          <Route path="new-booking" element={<NewBooking />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>

    <Toaster 
    position="top-center"
    gutter={12}
    containerClassName="m-8"
    toastOptions={{
      duration: 5000,
      style: {
        background: "#363636",
        color: "#fff",
      },
    }}
    />

    </QueryClientProvider>
    
    </AuthContextProvider>
  );
}
