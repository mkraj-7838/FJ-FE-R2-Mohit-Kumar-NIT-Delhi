"use client"; // Enables client-side rendering

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "200"; // Retrieve the amount from query params, default to ₹200

  // State variables for handling card payment details
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("card"); // Default payment method is 'card'

  const router = useRouter(); // Hook for navigation

  // Function to handle payment submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    alert("Payment Successful!"); // Show a success message
    router.push("/"); // Redirect user to the homepage after successful payment
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-4">
      {/* Payment Card Container */}
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-96">
        {/* Display the payment amount */}
        <h2 className="text-2xl font-bold text-center mb-4">
          Great, that's ₹{amount}!
        </h2>

        {/* Payment Method Selection */}
        <div className="mb-4 p-3">
          <label className="flex items-center gap-2 mt-2">
            <input
              type="radio"
              name="payment-method"
              value="card"
              checked={selectedMethod === "card"}
              onChange={() => setSelectedMethod("card")}
            />
            Debit/Credit Card
          </label>
        </div>

        {/* Card Details Form - Shown only if "card" is selected */}
        {selectedMethod === "card" && (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Card Number Input */}
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
            <div className="flex gap-2">
              {/* Expiry Date Input */}
              <input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-1/2 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
                required
              />
              {/* CVV Input */}
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-1/2 p-3 rounded-md bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>
            {/* Submit Payment Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-bold mt-2"
            >
              Finish and Pay
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
