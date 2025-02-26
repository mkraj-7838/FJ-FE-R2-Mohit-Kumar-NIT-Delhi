import React, { useEffect, useContext, useState } from "react";
import { 
  DirectionsRenderer, 
  GoogleMap, 
  MarkerF, 
  OverlayViewF 
} from "@react-google-maps/api";

import { ContextSource } from "../context/ContextSource";
import { ContextDestination } from "../context/ContextDestination";

function GoogleMapSection() {
  // Retrieve source and destination locations from context
  const { source, setSource } = useContext(ContextSource);
  const { destination, setDestination } = useContext(ContextDestination);

  // Define the map container size dynamically based on screen width
  const containerStyle = {
    width: "100%",
    height: window.innerWidth < 768 ? "50vh" : "85vh", // Adjust height based on screen size
  };

  // Set the initial center position of the map (Delhi by default)
  const [center, setCenter] = useState({
    lat: 28.6,
    lng: 77.2,
  });

  // State to store map instance and directions
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  // Update map center when the source location changes
  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });
    }
  }, [source, map]);

  // Update map center when the destination location changes
  useEffect(() => {
    if (destination && destination.lat && destination.lng && map) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
  }, [destination, map]);

  // Function to calculate the route from source to destination
  const directionRoute = () => {
    if (!source || !destination || !source.lat || !source.lng || !destination.lat || !destination.lng) {
      console.log("Source or Destination is missing");
      return;
    }
  
    const DirectionsService = new google.maps.DirectionsService();

    // Request driving directions
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else if (status === "ZERO_RESULTS") {
          alert("No route found between these locations. Try choosing different locations.");
          setDirections(null);
        } else {
          console.error("Error fetching route:", status, result);
          alert("Something went wrong while fetching the route. Please try again.");
        }
      }
    );
  };

  // Call the direction route function when source or destination changes
  useEffect(() => {
    if (map) directionRoute(); // Ensure map is loaded before calling API
  }, [source, destination, map]);

  // Handle map load event
  const onLoad = (map) => {
    setMap(map);
    if (source && source.lat && source.lng) {
      setCenter({ lat: source.lat, lng: source.lng });
      map.setZoom(12);
    } else {
      map.setZoom(9);
    }
  };

  // Handle map unmount event
  const onUnmount = () => {
    setMap(null);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={9}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "a7ca371e1b14ff59" }} // Custom map ID
    >
      {/* Display marker for source location */}
      {source && source.lat && source.lng && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/source.png",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          {/* Overlay label for source location */}
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName="overlayMouseTarget"
          >
            <div className="bg-white px-2 py-1 text-center font-bold rounded-md shadow-md border border-gray-300">
              <p className="text-black text-sm">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Display marker for destination location */}
      {destination && destination.lat && destination.lng && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/dest.png",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          {/* Overlay label for destination location */}
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName="overlayMouseTarget"
          >
            <div className="bg-white px-2 py-1 text-center font-bold rounded-md shadow-md border border-gray-300">
              <p className="text-black text-sm">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {/* Display the route between source and destination */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#000", // Set route color to black
              strokeWeight: 5,
            },
            suppressMarkers: true, // Hide default markers
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
