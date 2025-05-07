import React from 'react';
import bookImage from '../assets/book.png';
import backgroundImage from '../assets/background.jpg';
import GandalfScene from '../scenes/gandalfScene.jsx';
import { AppContent } from '../context/AppContext';
import { useContext } from 'react';

export default function Home() {
  const { userData } = useContext(AppContent);

  return (
    <main className="bg-primary-black w-full h-full pt-10 pb-30 relative overflow-y-hidden">
      <div className="flex flex-col md:flex-row w-full justify-center items-center px-4 md:px-0">
        {/* Left Image */}
        <div className="w-1/2 md:w-1/4 flex justify-center items-center mb-6 md:mb-0">
          <img
            src={bookImage}
            alt="sold book"
            className="w-[200px] md:w-36 h-auto"
          />
        </div>

        {/* Center Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-4 px-2">
          <h1 className="text-primary-white font-black 
                text-2xl sm:text-3xl md:text-5xl 
                leading-snug sm:leading-tight md:leading-snug">
            Welcome to the{' '}
            <span className="text-[#667AE9]">
              Raven&apos;s Quill {userData?.username || ''}
            </span>
          </h1>

          <h2 className="text-primary-white font-medium 
                        text-sm sm:text-base md:text-xl 
                        max-w-prose">
            At The Raven’s Quill, every book is a key to mastering your own kind of magic.
            From timeless classics to modern tales, our shelves are filled with stories
            and knowledge waiting to transform curious minds. Whether you seek adventure,
            wisdom, or inspiration, let the Raven guide you to discoveries that feel nothing
            short of wizardry.
          </h2>
        </div>

        {/* Right Image */}
        <div className="w-1/2 hidden md:w-1/4 md:flex justify-center items-center mt-6 md:mt-0">
          <img
            src={bookImage}
            alt="sold book"
            className="w-24 md:w-36 h-auto"
          />
        </div>
      </div>



      {/* background + 3D scene */}
      <div className="w-full h-[60vh] mt-10 flex flex-col justify-center items-center">
        <img
            src={backgroundImage}
            alt="wizard book shelf background"
            className="h-[500px] w-auto object-cover md:w-full md:h-auto shadow-5xl absolute"
        />
        <GandalfScene />
      </div>
    </main>
  );
}
