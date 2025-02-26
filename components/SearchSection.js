"use client";
import React, { useEffect, useContext, useState } from "react";
import InputItem from "./InputItem";
import CarListOption from "./CarListOption";
import { ContextSource } from "../context/ContextSource";
import { ContextDestination } from "../context/ContextDestination";

function SearchSection() {
  const { source, setSource } = useContext(ContextSource);
  const { destination, setDestination } = useContext(ContextDestination);

  const [distance, setDistance] = useState(null);
  const [isSharing, setIsSharing] = useState(false); // ✅ Toggle State for Ride Sharing

  const calculateDistance = () => {
    if (
      !source ||
      !destination ||
      typeof source.lat !== "number" ||
      typeof source.lng !== "number" ||
      typeof destination.lat !== "number" ||
      typeof destination.lng !== "number"
    ) {
      alert("Please select valid locations.");
      return;
    }

    const sourceLatLng = new google.maps.LatLng(source.lat, source.lng);
    const destinationLatLng = new google.maps.LatLng(
      destination.lat,
      destination.lng
    );

    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      sourceLatLng,
      destinationLatLng
    );

    setDistance(dist * 0.0006213712); // Convert meters to miles
  };

  useEffect(() => {
    console.log("Updated Source:", source);
    console.log("Updated Destination:", destination);
  }, [source, destination]);

  return (
    <div className="relative ">
      <div className="p-2 md:p-4 border-[5px] border-gray-700 rounded-xl">
        {/* Header with "Get a ride" and Ride Sharing Toggle */}
        <div className="flex items-center justify-between my-2">
          <div className="text-[20px] font-bold">Get a ride</div>
          <div className="flex items-center gap-2">
            <div className="text-[20px] font-bold">Ride Sharing:</div>
            <button
              className={`p-2 w-16 rounded-full transition ${
                isSharing ? "bg-green-500" : "bg-gray-500"
              }`}
              onClick={() => setIsSharing(!isSharing)}
            >
              {isSharing ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <InputItem type="source" />
        <InputItem type="destination" />

        {/* Search Button */}
        <button
          className="p-3 bg-white w-full mt-5 text-black rounded-lg"
          onClick={calculateDistance}
        >
          Search
        </button>
      </div>

      {/* Advertisement Box - Only Show Before Search */}
      {distance === null && (
        <div className=" pl-1 mt-4">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-300">Total Rides</p>
            <p className="text-lg font-bold">12</p>
          </div>
    
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-300">Total KM Traveled</p>
            <p className="text-lg font-bold">88 km</p>
          </div>
    
          <div>
            <p className="text-lg font-semibold text-gray-300">Money Saved (Compared to Cabs)</p>
            <p className="text-lg font-bold">1786 Rs.</p>
          </div>
        </div>
      </div>
      )}

      {/* Ride Options - Shown after Search */}
      {distance !== null && (
        <CarListOption distance={distance} isSharing={isSharing} />
      )}
    </div>
  );
}

export default SearchSection;
