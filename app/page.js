"use client";
import { useState } from "react";
import GoogleMapSection from "../components/GoogleMapSection";
import SearchSection from "../components/SearchSection";
import { ContextSource } from "../context/ContextSource";
import { ContextDestination } from "../context/ContextDestination";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (

    
    <ContextSource.Provider value={{ source, setSource }}>
    <ContextDestination.Provider value={{ destination, setDestination }}>
      <LoadScript 
        libraries={["places"]} 
        googleMapsApiKey={"AIzaSyDRRHxHjC3zPBj2th5dluhHMdaiA8N4Ics"}
      >
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Search Section - Full width on small screens, splits on larger screens */}
          <div className="w-full">
            <SearchSection />
          </div>
  
          {/* Google Map Section - Responsive */}
          <div className="md:col-span-2 h-full">
          <GoogleMapSection />
        </div>
  
        </div>
      </LoadScript>
    </ContextDestination.Provider>
  </ContextSource.Provider>
  
  );
}
