"use client";
import React, { useState, useCallback } from 'react';
import Image from 'next/image';

const App = () => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showInviteForm, setShowInviteForm] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // New invite form state
  const [name, setName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowInviteForm(true);
  }, []);

  const handleInviteSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!name) errors.name = 'Name is required.';
    
    if (!whatsapp || !/^\d{10,15}$/.test(whatsapp)) {
      errors.whatsapp = 'Please enter a valid WhatsApp number.';
    }
    if (!eventName) errors.eventName = 'Event Name is required.';
    if (!eventDate || new Date(eventDate) <= new Date()) {
      errors.eventDate = 'Please select a valid future date.';
    }
    if (!country) errors.country = 'Country is required.';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true); // Show the greeting message after successful submission
    }
  }, [name, whatsapp, eventName, eventDate, country]);

  const handleMapClick = () => {
    // Replace this URL with any Google Maps link you want to navigate to.
    window.location.href = 'https://www.google.com/maps';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-4 relative">
      {!showInviteForm && !isSubmitted && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/logo/logo.jpg"  // Replace with your image source
            alt="Logo"
            width={170}
            height={150}
            className="object-contain"
          />
        </div>
      )}

      {!showInviteForm && !isSubmitted && (
        <h1 className="absolute top-[300px] left-1/2 transform -translate-x-1/2 text-4xl font-semibold text-center text-gray-700 w-full">
          Happy Invite
        </h1>
      )}

      {!showInviteForm && !isSubmitted ? (
        <div className="flex flex-col items-center space-y-4 w-full px-4 lg:mt-[180px]">
          <form className="flex flex-col space-y-4 w-full max-w-md mx-auto mt-10 sm:mt-12 md:mt-16 lg:mt-20">
            <input
              type="password"
              placeholder="Enter the Invite Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="p-3 lg:w-[85%] sm:w-full lg:ml-[36px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-sm sm:text-base md:text-lg lg:text-xl"
            />
            {error && <p className="text-red-500 text-center text-xs sm:text-sm md:text-base">{error}</p>}
          </form>
          <button
            type="submit"
            onClick={handleSubmit}
            className="absolute bottom-[80px] lg:bottom-[30px] w-[90%] max-w-sm py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black-500"
          >
            Create New Invite
          </button>
        </div>
      ) : isSubmitted ? (
        <div className="text-center">
        {/* Line with some space above it */}
        <h2 className="text-2xl font-bold text-center mb-6 lg:mt-[10px] fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 shadow-md">
            
          </h2>
        
        {/* Line Text with some space between each line */}
        <div className="text-1xl font-bold text-green-500 lg:mt-[50px] mt-[-40px]">
          Line1
          <br />
          <hr className="border-t-2 border-gray-300 mt-8 mb-4" />
          Line2
          <br />
          <hr className="border-t-2 border-gray-300 mt-8 mb-4" />
          Line3
          <br />
          <hr className="border-t-2 border-gray-300 mt-8 mb-4" />
          Line4
          <br />
          <hr className="border-t-2 border-gray-300 mt-8 mb-4" />
          Line5
          <br />
          <hr className="border-t-2 border-gray-300 mt-8 mb-4" />
          Line10
        </div>
      
        {/* Boxes in a single line */}
        <div className="flex flex-wrap justify-start mt-10 gap-2">
          {/* Map Box */}
          <div
        className="p-1 bg-blue-100 border border-blue-500 rounded-md shadow-md w-15 sm:w-22 md:w-20 lg:w-48 text-center cursor-pointer"
        onClick={handleMapClick} // Add click event to open Google Maps
      >
        <span className="text-blue-500 font-semibold">Map</span>
      </div>
      
          {/* Map Box (second) */}
          <div
        className="p-1 bg-blue-100 border border-blue-500 rounded-md shadow-md w-15 sm:w-22 md:w-20 lg:w-48 text-center cursor-pointer"
        onClick={handleMapClick} // Add click event to open Google Maps
      >
        <span className="text-blue-500 font-semibold">Map</span>
      </div>
      
          {/* Wishbox Box */}
          <div className="p-1 bg-purple-100 border border-purple-500 rounded-md shadow-md w-[85px] sm:w-22 md:w-20 lg:w-48 text-center">
            <span className="text-purple-500 font-semibold w-1">Wishbox</span>
          </div>
      
          {/* Gallery Box */}
          <div className="p-1 bg-red-100 border border-red-500 rounded-md shadow-md w-[65px] sm:w-32 md:w-40 lg:w-48 text-center">
            <span className="text-red-500 font-semibold">Gallery</span>
          </div>
      
          {/* Share Box */}
          <div className="p-1 bg-orange-100 border border-orange-500 rounded-md shadow-md w-15 sm:w-32 md:w-40 lg:w-48 text-center">
            <span className="text-orange-500 font-semibold">Share</span>
          </div>
        </div>
      </div>
      
      

      ) : (
        <div className="flex flex-col items-center justify-start w-full px-4">
          <h2 className="text-2xl font-bold text-center mb-6 lg:mt-[40px] fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 shadow-md">
             Create New Invite
          </h2>
          <form onSubmit={handleInviteSubmit} className="flex flex-col space-y-4 w-full max-w-md mt-[160px]">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}

            <input
              type="text"
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.whatsapp && <p className="text-red-500">{formErrors.whatsapp}</p>}

            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.eventName && <p className="text-red-500">{formErrors.eventName}</p>}

            <input
              type="date"
              placeholder="Event Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.eventDate && <p className="text-red-500">{formErrors.eventDate}</p>}

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-3 mb-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.country && <p className="text-red-500">{formErrors.country}</p>}

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black-500 mt-[100px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
