import { Train } from '../types';
import { Clock, Train as TrainIcon } from 'lucide-react';

interface TrainListProps {
  trains: Train[];
  onSelect: (train: Train) => void;
}

export default function TrainList({ trains, onSelect }: TrainListProps) {
  return (
    <div className="space-y-4">
      {trains.map((train) => (
        <div key={train.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <TrainIcon className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">{train.name}</h3>
                <span className="text-sm text-gray-500">#{train.number}</span>
              </div>
              
              <div className="mt-2 flex items-center gap-4">
                <div>
                  <p className="text-xl font-bold">{train.departureTime}</p>
                  <p className="text-sm text-gray-600">{train.from}</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-0.5 bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {train.duration}
                  </div>
                </div>
                
                <div>
                  <p className="text-xl font-bold">{train.arrivalTime}</p>
                  <p className="text-sm text-gray-600">{train.to}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">₹{train.price}</p>
                <p className="text-sm text-gray-500">{train.availableSeats} seats left</p>
              </div>
              
              <button
                onClick={() => onSelect(train)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {train.classes.map((cls) => (
              <span key={cls} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                {cls}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}