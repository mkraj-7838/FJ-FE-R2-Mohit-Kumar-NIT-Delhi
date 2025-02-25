"use client";

import { useState } from "react";
import { Star } from "lucide-react";

// Custom Toast Hook
const useToast = () => {
  const toast = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    alert(`${title}: ${description}`);
  };
  return { toast };
};

// Button Component
const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    className="p-3  px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-300 transition"
    onClick={onClick}
  >
    {children}
  </button>
);

// Textarea Component
const Textarea = ({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
  className?: string;
}) => (
  <textarea
    className="w-full p-2 border border-gray-500 bg-black text-white rounded-md"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

// Card Components
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className=" border border-gray-700 rounded-lg shadow-md w-full bg-black text-white p-6">
    {children}
  </div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);
const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className=" text-lg font-semibold">{children}</h2>
);
const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-400">{children}</p>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

// Ride History Data
const initialRideHistory = [
  {
    id: 1,
    date: "2023-06-01",
    fare: 25.5,
    driver: "John Doe",
    rating: 5,
    feedback: "",
  },
  {
    id: 2,
    date: "2023-06-03",
    fare: 30.0,
    driver: "Jane Smith",
    rating: 4,
    feedback: "",
  },
  {
    id: 3,
    date: "2024-10-15",
    fare: 28.75,
    driver: "Alice Johnson",
    rating: 1,
    feedback: "",
  },
  {
    id: 4,
    date: "2024-09-22",
    fare: 45.0,
    driver: "Robert Brown",
    rating: 5,
    feedback: "",
  },
  {
    id: 5,
    date: "2024-08-19",
    fare: 20.0,
    driver: "Emily White",
    rating: 3,
    feedback: "",
  },
  {
    id: 6,
    date: "2024-07-05",
    fare: 35.5,
    driver: "Michael Davis",
    rating: 4,
    feedback: "",
  },
  {
    id: 7,
    date: "2024-06-03",
    fare: 30.0,
    driver: "Jane Smith",
    rating: 1,
    feedback: "",
  },
  {
    id: 8,
    date: "2024-05-20",
    fare: 22.0,
    driver: "Chris Wilson",
    rating: 5,
    feedback: "",
  },
];

export default function History() {
  const [rideHistory, setRideHistory] = useState(initialRideHistory);
  const { toast } = useToast();

  const handleRating = (id: number, rating: number) => {
    setRideHistory((prevHistory) =>
      prevHistory.map((ride) => (ride.id === id ? { ...ride, rating } : ride))
    );
  };

  const handleFeedback = (id: number, feedback: string) => {
    setRideHistory((prevHistory) =>
      prevHistory.map((ride) => (ride.id === id ? { ...ride, feedback } : ride))
    );
  };

  const submitFeedback = (id: number) => {
    const ride = rideHistory.find((r) => r.id === id);
    if (ride) {
      console.log("Submitting feedback:", {
        id,
        rating: ride.rating,
        feedback: ride.feedback,
      });
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white p-6">
    {/* Left - Ride History */}
    <div className="w-2/3 pr-4">
      <h1 className="text-4xl font-bold mb-6">Ride History</h1>
  
      {/* Scrollable Ride List */}
      <div className="h-[75vh] overflow-y-auto bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700">
        <div className="flex flex-col gap-6">
          {rideHistory.map((ride) => (
            <Card key={ride.id} >
              <CardHeader>
                <CardTitle >Ride on {ride.date}</CardTitle>
                <CardDescription >Driver: {ride.driver}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-300">Fare: <span className="font-semibold">${ride.fare.toFixed(2)}</span></p>
  
                {/* Star Rating */}
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`cursor-pointer h-6 w-6 transition ${
                        star <= ride.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                      }`}
                      onClick={() => handleRating(ride.id, star)}
                    />
                  ))}
                </div>
  
                {/* Feedback Input */}
                <Textarea
                  placeholder="Leave your feedback here..."
                  value={ride.feedback}
                  onChange={(e) => handleFeedback(ride.id, e.target.value)}
                  className="mb-4 w-full p-3 rounded-md border border-gray-600 bg-black text-white"
                />
  
                {/* Submit Button */}
                <Button onClick={() => submitFeedback(ride.id)} >
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  
    {/* Right - Summary Section */}
    <div className="w-1/3 pl-4 mt-16">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-4">Summary</h2>
        
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-300">Total Rides</p>
          <p className="text-2xl font-bold">{rideHistory.length}</p>
        </div>
  
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-300">Total KM Traveled</p>
          <p className="text-2xl font-bold">{(rideHistory.length * 8.5).toFixed(1)} km</p>
        </div>
  
        <div>
          <p className="text-lg font-semibold text-gray-300">Money Saved (Compared to Cabs)</p>
          <p className="text-2xl font-bold">${(rideHistory.length * 5).toFixed(2)}</p>
        </div>
      </div>
    </div>
  </div>
  

  );
}
