import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleDarkMode } from '../store/slices/themeSlice';
import { LayoutDashboard, FileText, CreditCard, Users, Package, BarChart2, Settings, LogOut, Sun, Moon } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">SoInvoice</h1>
        </div>
        <nav className="mt-8">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/quotes" icon={<FileText size={20} />} label="Quotes" />
          <NavItem to="/invoices" icon={<FileText size={20} />} label="Invoices" />
          <NavItem to="/payments" icon={<CreditCard size={20} />} label="Payments" />
          <NavItem to="/clients" icon={<Users size={20} />} label="Clients" />
          <NavItem to="/products" icon={<Package size={20} />} label="Products" />
          <NavItem to="/reports" icon={<BarChart2 size={20} />} label="Reports" />
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {darkMode ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 mt-4">
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
    {icon}
    <span className="mx-3">{label}</span>
  </Link>
);

export default Layout;