import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle, Paperclip } from 'lucide-react';

interface LineItem {
  id: number;
  item: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
}

interface Document {
  id: number;
  type: 'quote' | 'invoice';
  clientName: string;
  address: string;
  documentNumber: string;
  status: string;
  date: string;
  expirationDate?: string;
  lineItems: LineItem[];
  taxRate: number;
  discount: number;
  notes: string;
  attachments: string[];
  customFields: { [key: string]: string };
}

const DocumentDetails: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: 'quote' | 'invoice' }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch document data
    setTimeout(() => {
      setDocument({
        id: 1,
        type: type as 'quote' | 'invoice',
        clientName: 'Acme Corp',
        address: '123 Main St, Anytown, USA',
        documentNumber: `${type === 'quote' ? 'Q' : 'INV'}-001`,
        status: 'draft',
        date: '2024-03-25',
        expirationDate: type === 'quote' ? '2024-04-25' : undefined,
        lineItems: [
          { id: 1, item: 'Product A', description: 'Description for Product A', quantity: 2, unit: 'pcs', price: 100, discount: 0 },
          { id: 2, item: 'Service B', description: 'Description for Service B', quantity: 1, unit: 'hour', price: 150, discount: 10 },
        ],
        taxRate: 10,
        discount: 5,
        notes: 'Thank you for your business!',
        attachments: ['attachment1.pdf', 'attachment2.jpg'],
        customFields: { 'Project': 'Project X', 'Department': 'Sales' },
      });
      setLoading(false);
    }, 1000);
  }, [id, type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!document) {
    return <div>Document not found</div>;
  }

  const subtotal = document.lineItems.reduce((sum, item) => sum + (item.quantity * item.price * (1 - item.discount / 100)), 0);
  const taxAmount = subtotal * (document.taxRate / 100);
  const totalDiscount = subtotal * (document.discount / 100);
  const grandTotal = subtotal + taxAmount - totalDiscount;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">{type === 'quote' ? 'Quote' : 'Invoice'} Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{document.clientName}</h2>
            <p className="text-gray-600">{document.address}</p>
          </div>
          <div className="text-right">
            <pclassName="text-lg font-semibold">{document.documentNumber}</p>
            <p className="text-gray-600">Date: {document.date}</p>
            {document.expirationDate && <p className="text-gray-600">Expires: {document.expirationDate}</p>}
            <p className={`mt-2 inline-block px-2 py-1 rounded-full text-sm font-semibold ${
              document.status === 'approved' ? 'bg-green-200 text-green-800' :
              document.status === 'rejected' ? 'bg-red-200 text-red-800' :
              'bg-yellow-200 text-yellow-800'
            }`}>
              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
            </p>
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Unit Price</th>
              <th className="text-right py-2">Discount</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {document.lineItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.item}</td>
                <td className="py-2">{item.description}</td>
                <td className="text-right py-2">{item.quantity} {item.unit}</td>
                <td className="text-right py-2">${item.price.toFixed(2)}</td>
                <td className="text-right py-2">{item.discount}%</td>
                <td className="text-right py-2">${(item.quantity * item.price * (1 - item.discount / 100)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-6">
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax ({document.taxRate}%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount ({document.discount}%):</span>
              <span>-${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <p className="text-gray-600">{document.notes}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Attachments</h3>
          <ul className="list-disc list-inside">
            {document.attachments.map((attachment, index) => (
              <li key={index} className="flex items-center">
                <Paperclip size={16} className="mr-2" />
                <a href="#" className="text-blue-500 hover:underline">{attachment}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Custom Fields</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(document.customFields).map(([key, value]) => (
              <div key={key}>
                <span className="font-semibold">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;