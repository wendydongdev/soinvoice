import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setInvoices, setLoading, setError, Invoice } from '../store/slices/invoicesSlice';
import { Plus, Search, MoreVertical, Edit, Download, Mail, DollarSign, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Invoices: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: invoices, loading, error } = useSelector((state: RootState) => state.invoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  useEffect(() => {
    dispatch(setLoading(true));
    // Simulating API call
    setTimeout(() => {
      const mockInvoices: Invoice[] = [
        { id: 1, clientName: 'Acme Corp', clientEmail: 'info@acme.com', invoiceNumber: 'INV-001', date: '2024-03-15', dueDate: '2024-04-14', items: [], subtotal: 1500, tax: 150, total: 1650, status: 'sent' },
        { id: 2, clientName: 'Globex Inc', clientEmail: 'billing@globex.com', invoiceNumber: 'INV-002', date: '2024-03-20', dueDate: '2024-04-19', items: [], subtotal: 2000, tax: 200, total: 2200, status: 'paid' },
        { id: 3, clientName: 'Initech', clientEmail: 'accounts@initech.com', invoiceNumber: 'INV-003', date: '2024-03-25', dueDate: '2024-04-24', items: [], subtotal: 1000, tax: 100, total: 1100, status: 'overdue' },
      ];
      dispatch(setInvoices(mockInvoices));
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Plus size={20} className="mr-2" />
          New Invoice
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Client
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{invoice.clientName}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{invoice.invoiceNumber}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{invoice.date}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">${invoice.total}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold text-${invoice.status === 'paid' ? 'green' : invoice.status === 'sent' ? 'yellow' : 'red'}-900 leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 bg-${invoice.status === 'paid' ? 'green' : invoice.status === 'sent' ? 'yellow' : 'red'}-200 opacity-50 rounded-full`}></span>
                    <span className="relative">{invoice.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(invoice.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {activeMenu === invoice.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <Link to={`/invoices/${invoice.id}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} className="inline-block mr-2" />
                            Edit Invoice
                          </Link>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Download size={16} className="inline-block mr-2" />
                            Download PDF
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Mail size={16} className="inline-block mr-2" />
                            Send via Email
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <DollarSign size={16} className="inline-block mr-2" />
                            Enter Payment
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <Trash2 size={16} className="inline-block mr-2" />
                            Delete Invoice
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;