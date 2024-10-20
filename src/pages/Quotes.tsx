import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Download, Mail, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockQuotes = [
  { id: 1, client: 'Acme Corp', amount: 1500, date: '2024-03-15', status: 'Pending' },
  { id: 2, client: 'Globex Inc', amount: 2000, date: '2024-03-20', status: 'Accepted' },
  { id: 3, client: 'Initech', amount: 1000, date: '2024-03-25', status: 'Rejected' },
];

const Quotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const filteredQuotes = mockQuotes.filter(quote =>
    quote.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Quotes</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Plus size={20} className="mr-2" />
          New Quote
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search quotes..."
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
                Amount
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
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
            {filteredQuotes.map((quote) => (
              <tr key={quote.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{quote.client}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">${quote.amount}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{quote.date}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold text-${quote.status === 'Accepted' ? 'green' : quote.status === 'Pending' ? 'yellow' : 'red'}-900 leading-tight`}>
                    <span aria-hidden className={`absolute inset-0 bg-${quote.status === 'Accepted' ? 'green' : quote.status === 'Pending' ? 'yellow' : 'red'}-200 opacity-50 rounded-full`}></span>
                    <span className="relative">{quote.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(quote.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {activeMenu === quote.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <Link to={`/quotes/${quote.id}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} className="inline-block mr-2" />
                            Edit Quote
                          </Link>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Download size={16} className="inline-block mr-2" />
                            Download PDF
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Mail size={16} className="inline-block mr-2" />
                            Send via Email
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <Trash2 size={16} className="inline-block mr-2" />
                            Delete Quote
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

export default Quotes;