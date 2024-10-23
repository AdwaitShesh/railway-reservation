export interface Train {
    id: string;
    name: string;
    number: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    availableSeats: number;
    classes: ('1A' | '2A' | '3A' | 'SL')[];
  }
  
  export interface Seat {
    id: string;
    number: string;
    isBooked: boolean;
    class: '1A' | '2A' | '3A' | 'SL';
  }
  
  export interface Booking {
    id: string;
    trainId: string;
    seats: string[];
    totalPrice: number;
    date: string;
    passenger: {
      name: string;
      age: number;
      gender: 'male' | 'female' | 'other';
    };
  }