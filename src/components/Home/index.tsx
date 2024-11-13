"use client";
import React, { useState, useCallback } from 'react';
import Image from 'next/image';

const galleryImages = [
  "/images/gallery/image.png",
  "/images/gallery/image1.png",
  "/images/gallery/image2.png",
  "/images/gallery/image3.png",
  "/images/gallery/image4.png",
  "/images/gallery/image.png",
  "/images/gallery/image1.png",
  "/images/gallery/image2.png"
];

const App = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showWishbox, setShowWishbox] = useState(false);
  // New invite form state
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [country, setCountry] = useState('');

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example, set based on your login state

  const handleWishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWish(e.target.value);
  };

  const handleSendWish = () => {
    if (wish.trim() !== "") {
      setWishes((prevWishes) => [...prevWishes, wish]);
      setWish(""); // Clear the input after sending
    }
  };


  const handleBackToSubmit = () => {
    setShowGallery(false);
    setShowWishbox(false);
    setError('');
    setIsSubmitted(true); // Returning to "isSubmitted" state
  };
  

  const handleLoginClick = () => {
    // Add your Google login logic here
    setIsLoggedIn(true);
  };
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Check if password is provided
    if (password.trim()) {
      // Valid password condition
      setIsSubmitted(true);
    } else {
      // No password provided, show invite form
      setShowInviteForm(true);
    }
  }, [password]);

  const handleInviteSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      whatsapp,
      eventName,
      eventDate,
      country
    });
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
     
      setTimeout(() => {
        setShowInviteForm(false);  // Go back to the password page after a successful submission
        setIsSubmitted(false);  // Reset the form submission state
        setPassword('');  // Optionally reset password field
      }, 2000); // Optional delay to show confirmation before resetting the page
    }
  }, [name, whatsapp, eventName, eventDate, country]);

  const handleMapClick = () => {
    // Check if geolocation is supported in the browser
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Construct the Google Maps URL with the latitude and longitude
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
          // Redirect to Google Maps with the current position
          window.location.href = googleMapsUrl;
        },
        (error) => {
          // Handle errors (e.g., if the user denies geolocation access)
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please check your browser settings.');
        }
      );
    } else {
      // If geolocation is not supported
      alert('Geolocation is not supported by your browser.');
    }
  };
  

  const handleGalleryClick = () => {
    setShowGallery(true); // Show gallery content
  };

  const handleWishboxClick = () => {
    setShowWishbox(true); // Show Wishbox content
  };


const handleShareClick = () => {
  const message = "Hey! Check out this awesome invite: https://example.com"; // Replace with your actual invite link
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  // Change the location of the current window to the WhatsApp share link
  window.location.href = whatsappUrl;
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

{!showInviteForm && !isSubmitted && !showGallery && !showWishbox && (
        <h1 className="absolute top-[300px] left-1/2 transform -translate-x-1/2 text-4xl font-semibold text-center text-gray-700 w-full">
          Happy Invite
        </h1>
      )}

{!showInviteForm && !isSubmitted && !showGallery && !showWishbox ? (
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
            className="absolute bottom-[80px] lg:bottom-[30px] w-[90%] max-w-sm py-3 bg-[#00796B] text-white font-semibold rounded-md hover:bg-[#00796B]-300 focus:outline-none focus:ring-2 focus:ring-black-500"
          >
            Create New Invite
          </button>
        </div>
          ) : showGallery ? (
            <div className="text-center mt-12">
             <h2 className="text-2xl font-bold text-center mb-6  fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 shadow-md">
             <button onClick={handleBackToSubmit} className="absolute top-2 left-5 text-black-500 text-xl">
            &#8592;
          </button>Gallery
          </h2>
          <div className="mt-20 grid grid-cols-2 gap-4">
      {galleryImages.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Gallery Image ${index + 1}`}
          width={200}
          height={200}
          className="object-cover rounded-md"
        />
      ))}
    </div>
            </div>
          ) : showWishbox ? (
            <div className="text-center mt-12 relative">
            {/* Gallery Header */}
            <h2 className="text-2xl font-bold text-center mb-6 fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 shadow-md">
            <button onClick={handleBackToSubmit} className="absolute top-2 left-5 text-black-500 text-xl">
            &#8592;
          </button> Wishes Box
            </h2>

            
      
            {/* Chat Box */}
            <div className="mt-16 p-4 w-full max-w-md mx-auto pb-24">
              <div className="text-left space-y-4">
                {/* Left-aligned Chat Bubbles */}
                <div className="bg-green-100 text-gray-800 p-3 rounded-lg rounded-bl-none shadow-md max-w-xs">
                  🎉 Happy Marriage Life
                </div>
                <div className="bg-blue-100 text-gray-800 p-3 rounded-lg rounded-bl-none shadow-md max-w-xs">
                  🎂 Happy Birthday to You
                </div>
                <div className="bg-green-100 text-gray-800 p-3 rounded-lg rounded-bl-none shadow-md max-w-xs">
                  🎈 Congratulations on Your Achievement
                </div>
                <div className="bg-blue-100 text-gray-800 p-3 rounded-lg rounded-bl-none shadow-md max-w-xs">
                  🌟 Wishing You Success in Your Career
                </div>
                <div className="bg-green-100 text-gray-800 p-3 rounded-lg rounded-bl-none shadow-md max-w-xs">
                  ✨ Have a Wonderful Day
                </div>
      
                {/* Displaying User Wishes on the Right */}
                {wishes.map((wish, index) => (
                  <div key={index} className="bg-yellow-100 text-gray-800 p-3 rounded-lg rounded-br-none shadow-md max-w-xs ml-auto">
                    {wish}
                  </div>
                ))}
              </div>
            </div>
      
            {/* Dynamic Google Login Button or Input Box */}
            <div className="fixed bottom-4 left-0 right-0 flex justify-center">
              {isLoggedIn ? (
                <div className="w-full max-w-md flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your wish..."
                    value={wish}
                    onChange={handleWishChange}
                  />
                  <button
                    className="bg-[#00796B] text-white font-bold py-2 px-4 rounded-lg"
                    onClick={handleSendWish}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <button
                  className="w-full max-w-md bg-[#00796B]  text-white font-bold py-2 px-4 rounded-lg"
                  onClick={handleLoginClick}
                >
                  Login with Google
                </button>
              )}
            </div>
          </div>
      ) : isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-center mb-6 lg:mt-[10px] fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 shadow-md">
           
          </h2>

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
            <div
              className="p-1 bg-blue-100 border border-blue-500 rounded-md shadow-md w-15 sm:w-22 md:w-20 lg:w-48 text-center cursor-pointer"
              onClick={handleMapClick}
            >
              <span className="text-blue-500 font-semibold">Map</span>
            </div>
            <div
              className="p-1 bg-blue-100 border border-blue-500 rounded-md shadow-md w-15 sm:w-22 md:w-20 lg:w-48 text-center cursor-pointer"
              onClick={handleMapClick}
            >
              <span className="text-blue-500 font-semibold">Map</span>
            </div>
            <div onClick={handleWishboxClick} className="p-1 bg-purple-100 border border-purple-500 rounded-md shadow-md w-[85px] sm:w-22 md:w-20 lg:w-48 text-center">
              <span className="text-purple-500 font-semibold w-1">Wishbox</span>
            </div>
            <div  onClick={handleGalleryClick} className="p-1 bg-red-100 border border-red-500 rounded-md shadow-md w-[65px] sm:w-32 md:w-40 lg:w-48 text-center">
              <span className="text-red-500 font-semibold">Gallery</span>
            </div>
            <div    onClick={handleShareClick} className="p-1 bg-orange-100 border border-orange-500 rounded-md shadow-md w-15 sm:w-32 md:w-40 lg:w-48 text-center">
              <span className="text-orange-500 font-semibold">Share</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start w-full px-4">
          <h2  className="text-2xl font-bold text-center mb-6 lg:mt-[40px] fixed top-0 left-0 right-0 bg-white z-10 px-4 py-2 shadow-md">
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
                className="w-full py-3 bg-[#00796B] text-white font-semibold rounded-md hover:bg-[#00796B]-600 focus:outline-none focus:ring-2 focus:ring-black-500 mt-[100px]"
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
