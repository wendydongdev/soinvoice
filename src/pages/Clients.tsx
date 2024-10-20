import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Eye, Edit, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockClients = [
  { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '123-456-7890' },
  { id: 2, name: 'Globex Inc', email: 'info@globex.com', phone: '987-654-3210' },
  { id: 3, name: 'Initech', email: 'support@initech.com', phone: '555-123-4567' },
];

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Clients</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Plus size={20} className="mr-2" />
          New Client
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search clients..."
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
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{client.name}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{client.email}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{client.phone}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(client.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {activeMenu === client.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <Link to={`/clients/${client.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Eye size={16} className="inline-block mr-2" />
                            View Details
                          </Link>
                          <Link to={`/clients/${client.id}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} className="inline-block mr-2" />
                            Edit Client
                          </Link>
                          <Link to={`/quotes/new?client=${client.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <FileText size={16} className="inline-block mr-2" />
                            Create Quote
                          </Link>
                          <Link to={`/invoices/new?client=${client.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <FileText size={16} className="inline-block mr-2" />
                            Create Invoice
                          </Link>
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <Trash2 size={16} className="inline-block mr-2" />
                            Delete Client
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

export default Clients;