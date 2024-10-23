import React, { useState } from 'react';
import { stations } from '../data/stations';
import { Calendar, MapPin, Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (from: string, to: string, date: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(from, to, date);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2.5 px-3 focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select station</option>
              {stations.map((station) => (
                <option key={station} value={station}>{station}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2.5 px-3 focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select station</option>
              {stations.map((station) => (
                <option key={station} value={station}>{station}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2.5 px-3 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
      >
        <Search className="h-5 w-5" />
        Search Trains
      </button>
    </form>
  );
}