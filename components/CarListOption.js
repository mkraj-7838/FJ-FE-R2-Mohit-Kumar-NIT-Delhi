"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CarListData } from "../utils/CarListData";
import { SharingListData } from "../utils/SharingListData";
import CarListItem from "./CarListItem";

function CarListOption({ distance, isSharing }) {
  // State to track the selected car and loading state
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  // Choose between shared rides or private rides
  const listData = isSharing ? SharingListData : CarListData;

  // Simulate loading effect before displaying ride options
  useEffect(() => {
    setLoading(true);
    setActiveIndex(null);
    setSelectedCar(null);

    const timer = setTimeout(() => {
      setLoading(false);
      if (listData.length > 0) {
        setActiveIndex(0); // Set the first car as default selection
        setSelectedCar(listData[0]);
      }
    }, 3000); // Simulate a 3s loading time

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [listData]);

  return (
    <div className="mt-2 p-2 overflow-auto h-[350px]">
      {/* Display the ride category */}
      <h2 className="text-[22px] font-bold">
        {isSharing ? "Shared Rides" : "Recommended"}
      </h2>

      {/* Display loading message while searching for rides */}
      {loading ? (
        <div className="flex justify-center items-center h-full text-lg font-semibold">
          🚗 Searching for the best rides...
        </div>
      ) : (
        // Display available ride options
        listData.map((item, index) => (
          <div
            key={item.id}
            className={`cursor-pointer p-2 px-4 rounded-md border-white
              ${activeIndex === index ? "border-[3px]" : ""}`} // Highlight the selected ride
            onClick={() => {
              setActiveIndex(index);
              setSelectedCar(item);
            }}
          >
            {/* Render individual car list item */}
            <CarListItem car={item} distance={distance} />
          </div>
        ))
      )}

      {/* Display "Book Ride" button when a car is selected */}
      {!loading && selectedCar?.name && (
        <div className="flex justify-between fixed rounded-lg bottom-8 bg-white text-black p-2 shadow-xl w-full md:w-[30%] border-[1px] items-center">
          <h2 className="font-bold text-lg text-black">Book Ride</h2>
          <button
            className="p-3 bg-black text-white rounded-lg text-center"
            onClick={() =>
              router.push(`/RideBooking`)
            }
          >
            Request {selectedCar.name}
          </button>
        </div>
      )}
    </div>
  );
}

export default CarListOption;
