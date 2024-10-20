import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';

export const exportToExcel = (data: any[], fileName: string) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(dataBlob, `${fileName}.xlsx`);
};

export const exportToCsv = (data: any[], fileName: string) => {
  const ws = utils.json_to_sheet(data);
  const csv = utils.sheet_to_csv(ws);
  const dataBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(dataBlob, `${fileName}.csv`);
};

export const exportToPdf = (data: any[], fileName: string) => {
  // Implement PDF export logic here
  // You may want to use a library like jsPDF for this
  console.log('PDF export not implemented yet');
};