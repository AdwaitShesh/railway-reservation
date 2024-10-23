import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onPaymentComplete: () => void;
}

export default function PaymentForm({ amount, onPaymentComplete }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold">Payment Details</h3>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">Amount to pay: <span className="font-bold">₹{amount}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            placeholder="1234 5678 9012 3456"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            required
            pattern="\d{16}"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="MM/YY"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
              pattern="\d{4}"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="123"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
              pattern="\d{3}"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Pay ₹{amount}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>This is a demo payment form. No real transactions will occur.</p>
      </div>
    </div>
  );
}