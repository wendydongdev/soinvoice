import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Quotes from './pages/Quotes';
import Invoices from './pages/Invoices';
import EditInvoice from './pages/EditInvoice';
import Payments from './pages/Payments';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Notification from './components/Notification';

function App() {
  return (
    <Router>
      <Notification />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/quotes"
          element={
            <Layout>
              <Quotes />
            </Layout>
          }
        />
        <Route
          path="/invoices"
          element={
            <Layout>
              <Invoices />
            </Layout>
          }
        />
        <Route
          path="/invoices/:id/edit"
          element={
            <Layout>
              <EditInvoice />
            </Layout>
          }
        />
        <Route
          path="/payments"
          element={
            <Layout>
              <Payments />
            </Layout>
          }
        />
        <Route
          path="/clients"
          element={
            <Layout>
              <Clients />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;