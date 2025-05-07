import React from 'react';
import '../index.css';

export default function Spinner() {

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="custom-loader " />
      </div>
    </>
  );
}
