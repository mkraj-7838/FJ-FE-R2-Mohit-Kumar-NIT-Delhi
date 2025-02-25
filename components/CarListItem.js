import Image from "next/image";
import React from "react";
import { HiUser } from "react-icons/hi2";

function CarListItem({ car, distance }) {
  return (
    <div>
      {/* Main container for each car item */}
      <div className="flex item-center justify-between mt-">
        {/* Left section containing car image and details */}
        <div className="flex items-center border-gray-300 gap-4">
          {/* Car image */}
          <Image src={car.image} width={100} height={100} alt={car.name} />

          <div>
            {/* Car name and seat count */}
            <h2 className="font-semibold text-[14px] flex gap-1 items-center">
              {car.name}
              <span className="flex gap-1 font-normal text-[14px] items-center">
                <HiUser /> {car.seat} {/* Icon representing seat count */}
              </span>
            </h2>
            
            {/* Car description */}
            <p className="text-[10px]">{car.desc}</p>
          </div>
        </div>

        {/* Right section displaying calculated fare */}
        <h2 className="text-[14px] font-semibold">
          INR. {(car.amount * distance * 40).toFixed(2)} {/* Fare calculation formula */}
        </h2>
      </div>
    </div>
  );
}

export default CarListItem;
