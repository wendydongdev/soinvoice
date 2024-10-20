import React from 'react';
import { Download } from 'lucide-react';
import { exportToExcel, exportToCsv, exportToPdf } from '../utils/exportData';

interface ExportButtonProps {
  data: any[];
  fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, fileName }) => {
  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    switch (format) {
      case 'excel':
        exportToExcel(data, fileName);
        break;
      case 'csv':
        exportToCsv(data, fileName);
        break;
      case 'pdf':
        exportToPdf(data, fileName);
        break;
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="export-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <Download className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          Export
        </button>
      </div>
      <div
        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="export-menu"
      >
        <div className="py-1" role="none">
          <button
            onClick={() => handleExport('excel')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Export as Excel
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportButton;