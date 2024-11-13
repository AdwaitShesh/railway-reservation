import { useState } from 'react';
import { Train as TrainIcon } from 'lucide-react';
import SearchForm from './components/SearchForm';
import TrainList from './components/TrainList';
import SeatSelection from './components/SeatSelection';
import PaymentForm from './components/PaymentForm';
import { Train } from './types';
import { trains } from './data/trains';

function App() {
  const [step, setStep] = useState<'search' | 'list' | 'seats' | 'payment' | 'confirmation'>('search');
  const [searchResults, setSearchResults] = useState<Train[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSearch = (from: string, to: string) => {
    // Simulate API call with filtered results
    const results = trains.filter(train => 
      train.from.toLowerCase() === from.toLowerCase() &&
      train.to.toLowerCase() === to.toLowerCase()
    );
    setSearchResults(results);
    setStep('list');
  };

  const handleTrainSelect = (train: Train) => {
    setSelectedTrain(train);
    setStep('seats');
  };

  const handleSeatSelect = (seats: string[]) => {
    setSelectedSeats(seats);
    setStep('payment');
  };

  const handlePaymentComplete = () => {
    setStep('confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <TrainIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Railway Reservation System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {step === 'search' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Search Trains</h2>
            <SearchForm onSearch={handleSearch} />
          </div>
        )}

        {step === 'list' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Available Trains</h2>
            <TrainList trains={searchResults} onSelect={handleTrainSelect} />
          </div>
        )}

        {step === 'seats' && selectedTrain && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Select Seats - {selectedTrain.name}</h2>
            <SeatSelection trainId={selectedTrain.id} onSeatSelect={handleSeatSelect} />
          </div>
        )}

        {step === 'payment' && selectedTrain && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Payment</h2>
            <PaymentForm 
              amount={selectedTrain.price * selectedSeats.length} 
              onPaymentComplete={handlePaymentComplete} 
            />
          </div>
        )}

        {step === 'confirmation' && selectedTrain && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your tickets have been booked successfully.</p>
            <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
              <p className="text-sm text-gray-600">Train: {selectedTrain.name}</p>
              <p className="text-sm text-gray-600">From: {selectedTrain.from}</p>
              <p className="text-sm text-gray-600">To: {selectedTrain.to}</p>
              <p className="text-sm text-gray-600">Seats: {selectedSeats.join(', ')}</p>
            </div>
            <button
              onClick={() => setStep('search')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Another Ticket
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
