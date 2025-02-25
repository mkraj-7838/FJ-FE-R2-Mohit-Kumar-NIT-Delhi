"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Button component with type restrictions for "button", "submit", or "reset"
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

// Card component for displaying grouped information
const Card = ({ children, className }) => (
  <div
    className={`bg-slate-900 text-gray-900 p-6 rounded-lg shadow-lg ${className}`}
  >
    {children}
  </div>
);
const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-100">{children}</h2>
);
const CardContent = ({ children }) => <div className="mt-3">{children}</div>;

// Reusable button component with styles
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
}) => (
  <button
    type={type}
    className={`px-4 py-2 font-semibold rounded-md ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Input field component with styling
const Input = ({ value, onChange, placeholder }) => (
  <input
    className="w-full p-3 border rounded-md text-gray-900 focus:ring focus:ring-blue-300"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default function RideBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get ride details from the URL query parameters
  const carName = searchParams.get("car") || "Sedan";
  const amount = searchParams.get("amount") || "200";
  const eta = searchParams.get("eta") || "5";

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    "Driver: I'll be there in 5 minutes.",
  ]);
  const [loading, setLoading] = useState(true);

  // Simulating API loading time
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handles sending a chat message
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatHistory([...chatHistory, `You: ${message}`]);
      setMessage("");

      // Simulate driver response
      setTimeout(() => {
        setChatHistory((prev) => [...prev, "Driver: Almost there!"]);
      }, 1500);
    }
  };

  // Handles ride cancellation
  const handleCancelRide = () => {
    if (confirm("Are you sure you want to cancel the ride?")) {
      router.push("/"); // Redirect to homepage
    }
  };

  // Redirects to payment page with amount in the URL
  const handlePayment = () => {
    router.push(`/payment?amount=${amount}`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center gap-4 p-4 bg-black">
      {loading ? (
        // Show loading animation while searching for a driver
        <div className="text-white text-2xl font-bold animate-pulse">
          🚕 Finding your driver... Please wait!
        </div>
      ) : (
        <>
          {/* 🚗 Ride Details Section */}
          <Card className="w-full md:w-[40%] translate-y-[-35px]">
            <CardTitle>🚖 Your Ride Details</CardTitle>
            <CardContent>
              <div className="flex items-center gap-4">
                {/* Driver's profile picture */}
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Driver"
                  className="w-20 h-20 rounded-full border-2 border-blue-500"
                />
                <div>
                  {/* Driver's name and car details */}
                  <p className="text-lg font-semibold text-gray-100">
                    👨‍✈️ Ravi Kumar
                  </p>
                  <p className="text-sm text-gray-500">
                    🔢 Car No: DL 2C AB 1234
                  </p>
                </div>
              </div>
              <hr className="my-3 border-gray-300" />

              {/* Display ride details dynamically */}
              <p className="text-lg text-gray-100">
                🚗 <span className="font-semibold text-gray-100">Car:</span>{" "}
                {carName}
              </p>
              <p className="text-lg text-gray-100">
                ⏳ <span className="font-semibold">ETA:</span> {eta} minutes
              </p>
              <p className="text-lg text-gray-100">
                💰 <span className="font-semibold">Fare:</span> ₹{amount}
              </p>

              {/* Action buttons for cancelling ride or proceeding to payment */}
              <div className="flex gap-4 mt-5">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleCancelRide}
                >
                  Cancel Ride
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handlePayment}
                >
                  Pay ₹{amount}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 💬 Chat Section */}
          <Card className="w-full md:w-[40%] translate-y-[-35px]">
            <CardTitle>💬 Chat with Driver</CardTitle>
            <CardContent>
              {/* Chat history displayed in a scrollable box */}
              <div className="h-[180px] overflow-y-auto mb-4 p-3 bg-gray-100 font-semibold rounded-md">
                {chatHistory.map((msg, index) => (
                  <p key={index} className="mb-2 text-gray-800">
                    {msg}
                  </p>
                ))}
              </div>

              {/* Chat input form */}
              <form onSubmit={handleChatSubmit}>
                <div className="flex items-center space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {}}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
