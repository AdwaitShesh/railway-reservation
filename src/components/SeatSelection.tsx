import React, { useState } from 'react';
import { Seat } from '../types';

interface SeatSelectionProps {
  trainId: string;
  onSeatSelect: (seats: string[]) => void;
}

export default function SeatSelection({ trainId, onSeatSelect }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate dummy seats for demonstration
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const classes = ['1A', '2A', '3A', 'SL'];
    
    classes.forEach((cls) => {
      for (let i = 1; i <= 20; i++) {
        seats.push({
          id: `${cls}-${i}`,
          number: `${i}`,
          isBooked: Math.random() > 0.7,
          class: cls as any
        });
      }
    });
    
    return seats;
  };

  const seats = generateSeats();

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Select Seats</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(['1A', '2A', '3A', 'SL'] as const).map(cls => (
          <div key={cls} className="border rounded-lg p-4">
            <h4 className="text-lg font-medium mb-3">{cls}</h4>
            <div className="grid grid-cols-4 gap-2">
              {seats
                .filter(seat => seat.class === cls)
                .map(seat => (
                  <button
                    key={seat.id}
                    disabled={seat.isBooked}
                    onClick={() => toggleSeat(seat.id)}
                    className={`
                      p-2 rounded-md text-center transition-colors
                      ${seat.isBooked 
                        ? 'bg-gray-200 cursor-not-allowed' 
                        : selectedSeats.includes(seat.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 hover:border-blue-500'
                      }
                    `}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-gray-300 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
        </div>

        <button
          onClick={() => onSeatSelect(selectedSeats)}
          disabled={selectedSeats.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}