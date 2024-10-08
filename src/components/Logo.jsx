import React from "react";

function Logo() {
  return (
    <div className="relative h-screen">
      <img
        src="/Vector.png"
        className="w-[131.53px] h-[39.41px] object-contain"
        alt="Logo" 
      />
      <img
        src="/vaibhav.jpg"
        className="absolute bottom-5 left-0 w-[48px] h-[48px] rounded-[50%] flex items-center justify-center object-contain"
        alt="profile"
      />
    </div>
  );
}

export default Logo;
