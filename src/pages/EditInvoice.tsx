import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { Invoice, LineItem, updateInvoice, setCurrentInvoice } from '../store/slices/invoicesSlice';
import FormInput from '../components/FormInput';

const EditInvoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentInvoice, loading, error } = useSelector((state: RootState) => state.invoices);

  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Invoice>({
    defaultValues: currentInvoice || {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (id && (!currentInvoice || currentInvoice.id !== Number(id))) {
      // Fetch the invoice data
      // For now, we'll use mock data
      const mockInvoice: Invoice = {
        id: Number(id),
        clientName: "Acme Corp",
        clientEmail: "info@acmecorp.com",
        invoiceNumber: `INV-${id.padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [
          { id: 1, description: "Product A", quantity: 2, unitPrice: 100, total: 200 },
          { id: 2, description: "Service B", quantity: 1, unitPrice: 150, total: 150 },
        ],
        subtotal: 350,
        tax: 35,
        total: 385,
        status: "draft",
      };
      dispatch(setCurrentInvoice(mockInvoice));
    }
  }, [id, currentInvoice, dispatch]);

  useEffect(() => {
    if (currentInvoice) {
      Object.entries(currentInvoice).forEach(([key, value]) => {
        setValue(key as keyof Invoice, value);
      });
    }
  }, [currentInvoice, setValue]);

  const onSubmit = (data: Invoice) => {
    dispatch(updateInvoice(data));
    navigate('/invoices');
  };

  const calculateTotals = () => {
    const items = watch('items');
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = subtotal * 0.1; // Assuming 10% tax rate
    const total = subtotal + tax;

    setValue('subtotal', subtotal);
    setValue('tax', tax);
    setValue('total', total);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentInvoice) return <div>Invoice not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput label="Client Name" name="clientName" register={register} error={errors.clientName} />
        <FormInput label="Client Email" name="clientEmail" register={register} error={errors.clientEmail} />
        <FormInput label="Invoice Number" name="invoiceNumber" register={register} error={errors.invoiceNumber} />
        <FormInput label="Date" name="date" type="date" register={register} error={errors.date} />
        <FormInput label="Due Date" name="dueDate" type="date" register={register} error={errors.dueDate} />

        <div>
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="flex space-x-2 mb-2">
              <input
                {...register(`items.${index}.description` as const)}
                placeholder="Description"
                className="flex-grow p-2 border rounded"
              />
              <input
                {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                type="number"
                placeholder="Quantity"
                className="w-20 p-2 border rounded"
                onChange={() => calculateTotals()}
              />
              <input
                {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                type="number"
                placeholder="Unit Price"
                className="w-24 p-2 border rounded"
                onChange={() => calculateTotals()}
              />
              <button type="button" onClick={() => remove(index)} className="p-2 bg-red-500 text-white rounded">
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ id: Date.now(), description: '', quantity: 0, unitPrice: 0, total: 0 })}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Add Item
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <div>
            <p>Subtotal: ${watch('subtotal')}</p>
            <p>Tax: ${watch('tax')}</p>
            <p className="font-bold">Total: ${watch('total')}</p>
          </div>
        </div>

        <div>
          <label className="block mb-2">Status</label>
          <select {...register('status')} className="w-full p-2 border rounded">
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Save Invoice
        </button>
      </form>
    </div>
  );
};

export default EditInvoice;