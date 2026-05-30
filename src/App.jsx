import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './views/public/LandingPage';
import Login from './views/auth/Login';
import SignUp from './views/auth/SignUp';
import ForgotPassword from './views/auth/ForgotPassword';
import AppLayout from './components/layouts/AppLayout';
import AuthLayout from './components/layouts/AuthLayout';
import DashboardAdmin from './views/admin/DashboardAdmin';
import ManageOffers from './views/admin/ManageOffers';
import CreateOffer from './views/admin/CreateOffer';
import SubmissionsList from './views/admin/SubmissionsList';
import UsersManagement from './views/admin/UsersManagement';
import DashboardClient from './views/client/DashboardClient';
import AvailableOffers from './views/client/AvailableOffers';
import OfferDetails from './views/client/OfferDetails';
import SubmitProposal from './views/client/SubmitProposal';
import MyDocuments from './views/client/MyDocuments';
import ProfileSettings from './views/client/ProfileSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route path="admin/dashboard" element={<DashboardAdmin />} />
          <Route path="admin/offers" element={<ManageOffers />} />
          <Route path="admin/new-offer" element={<CreateOffer />} />
          <Route path="admin/submissions" element={<SubmissionsList />} />
          <Route path="admin/users" element={<UsersManagement />} />
          <Route path="client/dashboard" element={<DashboardClient />} />
          <Route path="client/offers" element={<AvailableOffers />} />
          <Route path="client/offer/:id" element={<OfferDetails />} />
          <Route path="client/submissions" element={<SubmitProposal />} />
          <Route path="client/documents" element={<MyDocuments />} />
          <Route path="client/profile" element={<ProfileSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;