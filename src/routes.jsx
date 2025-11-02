import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Public Pages
import Home from './public-routes/home/Home';
import Markets from './public-routes/markets/Markets';
import MarketDetail from './public-routes/markets/MarketDetail';
import Trading from './public-routes/trading/Trading';
import SpotTrading from './public-routes/trading/SpotTrading';
import FuturesTrading from './public-routes/trading/FuturesTrading';
import Login from './public-routes/auth/Login';
import Register from './public-routes/auth/Register';
import ForgotPassword from './public-routes/auth/ForgotPassword';
import HelpCenter from './public-routes/help/HelpCenter';
import Contact from './public-routes/help/Contact';
import Blog from './public-routes/blog/Blog';
import BlogPost from './public-routes/blog/BlogPost';

// Customer Pages
import CustomerDashboard from './customer-routes/dashboard/Dashboard';
import CustomerOverview from './customer-routes/dashboard/Overview';
import CustomerWallet from './customer-routes/wallet/Wallet';
import Deposit from './customer-routes/wallet/Deposit';
import Withdraw from './customer-routes/wallet/Withdraw';
import Trade from './customer-routes/trade/Trade';
import Orders from './customer-routes/orders/Orders';
import OrderHistory from './customer-routes/orders/OrderHistory';
import Earn from './customer-routes/earn/Earn';
import Staking from './customer-routes/earn/Staking';
import Security from './customer-routes/security/Security';
import TwoFA from './customer-routes/security/TwoFA';

// Business Pages
import BusinessDashboard from './business-routes/dashboard/BusinessDashboard';
import Merchant from './business-routes/merchant/Merchant';
import PaymentGateway from './business-routes/merchant/PaymentGateway';
import BusinessReports from './business-routes/reports/BusinessReports';

// Admin Pages
import AdminDashboard from './admin-routes/dashboard/AdminDashboard';
import UserManagement from './admin-routes/users/UserManagement';
import UserDetail from './admin-routes/users/UserDetail';
import KYCManagement from './admin-routes/kyc/KYCManagement';
import TransactionManagement from './admin-routes/transactions/TransactionManagement';
import SystemSettings from './admin-routes/system/SystemSettings';

// Layouts
import HomeLayout from './components/layout/HomeLayout';
import CustomerLayout from './components/layout/CustomerLayout';
import BusinessLayout from './components/layout/BusinessLayout';
import AdminLayout from './components/layout/AdminLayout';
import MainLayout from './components/layout/MainLayout';

// Additional Components
import VerifyMFA from './public-routes/auth/VerifyMFA';
import MFASetup from './public-routes/auth/MFASetup';
import Unauthorized from './public-routes/auth/Unauthorized';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles, requireMFA = true }) => {
    const { user, mfaRequired, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (requireMFA && user.mfa_verified === false && mfaRequired) {
        return <Navigate to="/verify-mfa" state={{ from: location }} replace />;
    }

    return children;
};

// Layout Wrappers
const HomeRoutesWrapper = () => (
    <HomeLayout>
        <Outlet />
    </HomeLayout>
);

const CustomerRoutesWrapper = () => {
    return (
        <ProtectedRoute allowedRoles={['customer', 'admin']}>
            <CustomerLayout>
                <Outlet />
            </CustomerLayout>
        </ProtectedRoute>
    );
};

const BusinessRoutesWrapper = () => {
    return (
        <ProtectedRoute allowedRoles={['business', 'merchant', 'admin']}>
            <BusinessLayout>
                <Outlet />
            </BusinessLayout>
        </ProtectedRoute>
    );
};

const AdminRoutesWrapper = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        </ProtectedRoute>
    );
};

const TradingRoutesWrapper = () => (
    <MainLayout>
        <Outlet />
    </MainLayout>
);

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes with Home Layout */}
            <Route element={<HomeRoutesWrapper />}>
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/market/:pair" element={<MarketDetail />} />
                <Route path="/about" element={<div>About Us</div>} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/help/:article" element={<HelpCenter />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postId" element={<BlogPost />} />
                <Route path="/price" element={<div>Price Page</div>} />
            </Route>

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-mfa" element={<VerifyMFA />} />
            <Route path="/setup-mfa" element={<MFASetup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Trading Routes with Main Layout */}
            <Route element={<TradingRoutesWrapper />}>
                <Route path="/trading" element={<Trading />} />
                <Route path="/trading/:pair" element={<Trading />} />
                <Route path="/spot" element={<SpotTrading />} />
                <Route path="/futures" element={<FuturesTrading />} />
                <Route path="/trade/spot/:pair" element={<Trade />} />
                <Route path="/trade/futures/:pair" element={<Trade />} />
            </Route>

            {/* Customer Protected Routes */}
            <Route element={<CustomerRoutesWrapper />}>
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/dashboard/overview" element={<CustomerOverview />} />
                <Route path="/dashboard/wallet" element={<CustomerWallet />} />
                <Route path="/dashboard/wallet/:currency" element={<CustomerWallet />} />
                <Route path="/dashboard/deposit" element={<Deposit />} />
                <Route path="/dashboard/deposit/:currency" element={<Deposit />} />
                <Route path="/dashboard/withdraw" element={<Withdraw />} />
                <Route path="/dashboard/withdraw/:currency" element={<Withdraw />} />
                <Route path="/dashboard/history" element={<OrderHistory />} />
                <Route path="/dashboard/history/deposits" element={<OrderHistory />} />
                <Route path="/dashboard/history/withdrawals" element={<OrderHistory />} />
                <Route path="/dashboard/history/trades" element={<OrderHistory />} />
                <Route path="/dashboard/security" element={<Security />} />
                <Route path="/dashboard/security/2fa" element={<TwoFA />} />
                <Route path="/dashboard/security/devices" element={<Security />} />
                <Route path="/dashboard/security/activity" element={<Security />} />
                <Route path="/dashboard/referral" element={<div>Referral</div>} />
                <Route path="/dashboard/api-keys" element={<div>API Keys</div>} />
                <Route path="/dashboard/settings" element={<div>Settings</div>} />
                <Route path="/dashboard/settings/profile" element={<div>Profile Settings</div>} />

                {/* Trading Orders */}
                <Route path="/orders/active" element={<Orders />} />
                <Route path="/orders/history" element={<OrderHistory />} />
                <Route path="/order/:orderId" element={<div>Order Detail</div>} />

                {/* Earn Routes */}
                <Route path="/earn" element={<Earn />} />
                <Route path="/earn/staking" element={<Staking />} />
                <Route path="/earn/savings" element={<Earn />} />
                <Route path="/earn/pool-x" element={<Earn />} />
                <Route path="/earn/lending" element={<Earn />} />
                <Route path="/earn/defi" element={<Earn />} />
            </Route>

            {/* Business Protected Routes */}
            <Route element={<BusinessRoutesWrapper />}>
                <Route path="/business/dashboard" element={<BusinessDashboard />} />
                <Route path="/business/merchant" element={<Merchant />} />
                <Route path="/business/payment-gateway" element={<PaymentGateway />} />
                <Route path="/business/transactions" element={<div>Business Transactions</div>} />
                <Route path="/business/settlement" element={<div>Settlement</div>} />
                <Route path="/business/api-management" element={<div>API Management</div>} />
                <Route path="/business/reports" element={<BusinessReports />} />
                <Route path="/business/invoicing" element={<div>Invoicing</div>} />
                <Route path="/business/settings" element={<div>Business Settings</div>} />

                {/* Institutional Routes */}
                <Route path="/institutional/overview" element={<div>Institutional Overview</div>} />
                <Route path="/institutional/otc" element={<div>OTC Trading</div>} />
                <Route path="/institutional/custody" element={<div>Custody</div>} />
                <Route path="/institutional/liquidity" element={<div>Liquidity</div>} />
                <Route path="/institutional/prime" element={<div>Prime Services</div>} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<AdminRoutesWrapper />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/users/:userId" element={<UserDetail />} />
                <Route path="/admin/kyc" element={<KYCManagement />} />
                <Route path="/admin/kyc/:applicationId" element={<KYCManagement />} />
                <Route path="/admin/transactions" element={<TransactionManagement />} />
                <Route path="/admin/deposits" element={<TransactionManagement />} />
                <Route path="/admin/withdrawals" element={<TransactionManagement />} />
                <Route path="/admin/trading-pairs" element={<SystemSettings />} />
                <Route path="/admin/fees" element={<SystemSettings />} />
                <Route path="/admin/security" element={<SystemSettings />} />
                <Route path="/admin/system-health" element={<SystemSettings />} />
                <Route path="/admin/reports" element={<div>Admin Reports</div>} />
                <Route path="/admin/settings" element={<SystemSettings />} />
                <Route path="/admin/support-tickets" element={<div>Support Tickets</div>} />
                <Route path="/admin/support-tickets/:ticketId" element={<div>Ticket Detail</div>} />
            </Route>

            {/* Support Routes */}
            <Route path="/support" element={<HelpCenter />} />
            <Route path="/support/tickets" element={<div>Support Tickets</div>} />
            <Route path="/support/tickets/new" element={<div>New Ticket</div>} />
            <Route path="/support/tickets/:ticketId" element={<div>Ticket Detail</div>} />
            <Route path="/support/live-chat" element={<div>Live Chat</div>} />

            {/* Legal Routes */}
            <Route path="/terms" element={<div>Terms of Service</div>} />
            <Route path="/privacy" element={<div>Privacy Policy</div>} />
            <Route path="/cookie-policy" element={<div>Cookie Policy</div>} />
            <Route path="/aml-kyc" element={<div>AML/KYC Policy</div>} />
            <Route path="/regulation" element={<div>Regulation</div>} />
            <Route path="/legal" element={<div>Legal</div>} />

            {/* API Documentation */}
            <Route path="/api-docs" element={<div>API Documentation</div>} />
            <Route path="/api-docs/rest" element={<div>REST API Docs</div>} />
            <Route path="/api-docs/websocket" element={<div>WebSocket API Docs</div>} />

            {/* 404 Not Found */}
            <Route path="/404" element={<div>Page Not Found</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;