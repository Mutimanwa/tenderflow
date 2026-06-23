import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ui/ProtectedRoute';
import LandingPage from './views/public/LandingPage';
import Login from './views/auth/Login';
import SignUp from './views/auth/SignUp';
import ForgotPassword from './views/auth/ForgotPassword';
import AppLayout from './components/layouts/AppLayout';
import AuthLayout from './components/layouts/AuthLayout';
import DashboardAdmin from './views/admin/DashboardAdmin';
import ManageOffers from './views/admin/ManageOffers';
import CreateOffer from './views/admin/CreateOffer';
import EditOffer from './views/admin/EditOffer';
import SubmissionsList from './views/admin/SubmissionsList';
import UsersManagement from './views/admin/UsersManagement';
import Settings from './views/admin/Settings';
import DashboardClient from './views/client/DashboardClient';
import AvailableOffers from './views/client/AvailableOffers';
import OfferDetails from './views/client/OfferDetails';
import SubmitProposal from './views/client/SubmitProposal';
import MyDocuments from './views/client/MyDocuments';
import ProfileSettings from './views/client/ProfileSettings';
import NewSubmission from './views/client/NewSubmission';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route element={<ProtectedRoute />}> 
          <Route path="admin/dashboard" element={<DashboardAdmin />} />
          <Route path="admin/offers" element={<ManageOffers />} />
          <Route path="admin/new-offer" element={<CreateOffer />} />
          <Route path="admin/edit-offer/:id" element={<EditOffer />} />
          <Route path="admin/submissions" element={<SubmissionsList />} />
          <Route path="admin/users" element={<UsersManagement />} />
          <Route path="admin/settings" element={<Settings />} />
          <Route path="client/dashboard" element={<DashboardClient />} />
          <Route path="client/offers" element={<AvailableOffers />} />
          <Route path="client/offer/:id" element={<OfferDetails />} />
          <Route path="client/submissions" element={<SubmitProposal />} />
          <Route path="client/documents" element={<MyDocuments />} />
          <Route path="client/new-submission/:offerId?" element={<NewSubmission />} />
          <Route path="profile" element={<ProfileSettings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;