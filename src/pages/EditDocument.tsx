import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormInput from '../components/FormInput';

interface DocumentFormData {
  clientName: string;
  address: string;
  documentNumber: string;
  status: string;
  date: string;
  expirationDate?: string;
  guestUrl: string;
}

const EditDocument: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: 'quote' | 'invoice' }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<DocumentFormData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch document data
    setTimeout(() => {
      setValue('clientName', 'Acme Corp');
      setValue('address', '123 Main St, Anytown, USA');
      setValue('documentNumber', `${type === 'quote' ? 'Q' : 'INV'}-001`);
      setValue('status', 'draft');
      setValue('date', '2024-03-25');
      if (type === 'quote') {
        setValue('expirationDate', '2024-04-25');
      }
      setValue('guestUrl', `https://example.com/${type}s/guest/abc123`);
      setLoading(false);
    }, 1000);
  }, [id, type, setValue]);

  const onSubmit = (data: DocumentFormData) => {
    console.log('Submitted data:', data);
    // TODO: Implement API call to save changes
    navigate(`/${type}s`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Edit {type === 'quote' ? 'Quote' : 'Invoice'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Client Name"
          name="clientName"
          type="text"
          register={register}
          error={errors.clientName}
        />
        <FormInput
          label="Address"
          name="address"
          type="text"
          register={register}
          error={errors.address}
        />
        <FormInput
          label={`${type === 'quote' ? 'Quote' : 'Invoice'} Number`}
          name="documentNumber"
          type="text"
          register={register}
          error={errors.documentNumber}
        />
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="viewed">Viewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <FormInput
          label="Date"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
        {type === 'quote' && (
          <FormInput
            label="Expiration Date"
            name="expirationDate"
            type="date"
            register={register}
            error={errors.expirationDate}
          />
        )}
        <FormInput
          label="Guest URL"
          name="guestUrl"
          type="text"
          register={register}
          error={errors.guestUrl}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDocument;