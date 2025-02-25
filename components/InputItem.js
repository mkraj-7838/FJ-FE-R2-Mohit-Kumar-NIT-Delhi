'use client';
import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { MdMyLocation } from "react-icons/md";  
import { CgShapeSquare } from "react-icons/cg";  
import { ContextSource } from "../context/ContextSource";
import { ContextDestination } from '../context/ContextDestination';

// Dynamic import to prevent SSR issues
const GooglePlacesAutocomplete = dynamic(() => import('react-google-places-autocomplete'), { ssr: false });

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const {source, setSource} = useContext(ContextSource);
  const {destination, setDestination} = useContext(ContextDestination);

  const[placeholder, setPlaceholder]=useState(null);
  
  useEffect(()=>{
    type=='source'
    ?setPlaceholder('pickup Location')
    :setPlaceholder('dropoff Location')
  }, [type])


  const getLatAndLng = (place) => {
      
    
    if (!place) {
      if (type === 'source') {
        setSource(null);
      } else {
        setDestination(null);
      }
      return;
    }

    if (!place.value || !place.value.place_id) {
      console.error("Invalid place data:", place);
      return;
    }
    
    const placeId = place.value.place_id;
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
  
    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry.location) {
        if(type=='source'){
          setSource({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.formatted_address,
            label:place.name
          })
        }else{
          setDestination({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.formatted_address,
            label:place.name
          })
        }
  
      } else {
        console.error("Failed to fetch place details. Status:", status, "Place details:", placeDetails);
      }
    });
  };
  

  return (
    <div className='bg-slate-700 p-3 rounded-lg mt-3 flex items-center gap-4'>
      {type === 'source' ? <MdMyLocation className="text-white text-xl" /> : <CgShapeSquare className="text-white text-xl" />}

      <div className="w-full">
        <GooglePlacesAutocomplete 
          // apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          selectProps={{
            value,
            onChange: (place) => {
              getLatAndLng(place);
              setValue(place);
            },
            isClearable: true,
            components: { DropdownIndicator: false },
            styles: {
              control: (provided) => ({
                ...provided,
                backgroundColor: '#334155',
                color: 'white',
                border: 'none',
                boxShadow: 'none'
              }),
              placeholder: (provided) => ({
                ...provided,
                color: 'white'
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'white'
              }),
              input: (provided) => ({
                ...provided,
                color: 'white'
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: 'white'
              }),
              option: (provided, state) => ({
                ...provided,
                color: 'black',
                backgroundColor: state.isFocused ? '#E5E7EB' : 'white',
                fontWeight: state.isSelected ? 'bold' : 'normal'
              })
            },
            placeholder: placeholder,
            className: 'bg-transparent w-full outline-none',
          }}
        />
      </div>
    </div>
  );
}

export default InputItem;
