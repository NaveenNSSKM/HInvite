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
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#E0F7FA] p-4 relative">
      {!showInviteForm && !isSubmitted && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/logo/logo.png"  // Replace with your image source
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
        <form className="flex flex-col space-y-6 w-full max-w-md mx-auto mt-10 sm:mt-12 md:mt-16 lg:mt-20">
  <input
    type="password"
    placeholder="Enter the Invite Password"
    value={password}
    onChange={handlePasswordChange}
    required
    className="p-8 lg:w-[85%] sm:w-full lg:ml-[36px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-sm sm:text-base md:text-lg lg:text-xl h-12 sm:h-14 md:h-16" // Added responsive height
  />
  {error && <p className="text-red-500 text-center text-xs sm:text-sm md:text-base">{error}</p>}
</form>

          <button
            type="submit"
            onClick={handleSubmit}
            className="h-[60px] absolute bottom-[80px] text-[20px] lg:bottom-[30px] w-[85%] max-w-sm py-3 bg-[#00796B] text-white font-semibold rounded-md hover:bg-[#00796B]-300 focus:outline-none focus:ring-2 focus:ring-black-500"
          >
            Create New Invite
          </button>
        </div>
          ) : showGallery ? (
            <div className="text-center mt-12">
             <div className="text-2xl h-16 rounded-bl-lg rounded-br-lg font-bold text-center mb-6 bg-[#00796B]  fixed top-0 left-0 right-0 rounded-bl-lg rounded-br-lg z-10 px-4 py-2 shadow-md">
             <button onClick={handleBackToSubmit} className="absolute top-5 left-5 text-black-500 text-xl text-white">
            &#8592;
          </button><h2 className='text-white mt-3'>Gallery</h2>
          </div>
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
            <div className="text-2xl h-16 rounded-bl-lg rounded-br-lg font-bold text-center mb-6 bg-[#00796B]  fixed top-0 left-0 right-0 rounded-bl-lg rounded-br-lg z-10 px-4 py-2 shadow-md">
             <button onClick={handleBackToSubmit} className="absolute top-5 left-5 text-black-500 text-xl text-white">
            &#8592;
          </button><h2 className='text-white mt-3'>Wish Box</h2>
          </div>

            
      
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
               

                <div className="w-full  max-w-md flex space-x-2 bg-[#00796B] rounded-lg z-10 px-4 py-2 shadow-md">
                  <input
                    type="text"
                    className="flex-1 p-2 h-[53px] border border-gray-300 rounded-lg "
                    placeholder="Enter your wishes!!!!"
                    value={wish}
                    onChange={handleWishChange}
                  />
                  <button
                    className="bg-white text-[#00796B] white font-bold py-2 px-4 rounded-lg"
                    onClick={handleSendWish}
                  >
                    Send
                  </button>
                </div>
                
              ) : (
                <button
                  className="w-[88%] h-16 max-w-md bg-[#00796B]  text-white font-bold py-2 px-4 rounded-lg"
                  onClick={handleLoginClick}
                >
                  <h2 className='text-2xl'>Login with Google</h2>
                </button>
              )}
            </div>
          </div>
      ) : isSubmitted ? (
        <div className="text-center">
          <div className="text-2xl h-16 font-bold text-center mb-6 lg:mt-[10px] fixed top-0 left-0 right-0 bg-[#00796B] z-10 px-4 py-2 shadow-md rounded-bl-lg rounded-br-lg">
  <h2 className='mt-3 text-white text-2xl'>Home</h2>
</div>


          <div className="text-1xl font-bold text-black-500 lg:mt-[50px] mt-[-40px]">
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
          <div className="bg-[#00796B] w-full  p-3  rounded-lg mt-[150px] mb-[30px] flex justify-end">
          <div className="flex flex-wrap justify-start mt-10 gap-4">
            <div
              className="p-1  w-15 sm:w-22 md:w-20 lg:w-48 text-center cursor-pointer"
              onClick={handleMapClick}
            >
            <div className="flex justify-center mt-[-15px]">
      <Image src="/images/Home/globe.png" alt="Map Icon" width={30} height={30} className=" mb-1" />
    </div>
    <span className="text-white font-semibold ">Map</span>
            </div>
            <div
              className="p-1  w-15 sm:w-22 md:w-20 lg:w-48 text-center cursor-pointer"
              onClick={handleMapClick}
            >
               <div className="flex justify-center mt-[-15px]">
      <Image src="/images/Home/globe.png" alt="Map Icon" width={30} height={30} className=" mb-1" />
    </div>
              <span className="text-white font-semibold">Map</span>
            </div>
            <div onClick={handleWishboxClick} className="p-1  w-[85px] sm:w-22 md:w-20 lg:w-48 text-center">
            <div className="flex justify-center mt-[-15px]">
      <Image src="/images/Home/wishlist.png" alt="Map Icon" width={30} height={30} className=" mb-1" />
    </div>
              <span className="text-white font-semibold w-1">Wishbox</span>
            </div>
            <div  onClick={handleGalleryClick} className="p-1  text-center">
            <div className="flex justify-center mt-[-15px]">
      <Image src="/images/Home/image.png" alt="Map Icon" width={30} height={30} className=" mb-1" />
    </div>
              <span className="text-white font-semibold">Gallery</span>
            </div>
            <div    onClick={handleShareClick} className="p-1  text-center">
            <div className="flex justify-center mt-[-15px]">
      <Image src="/images/Home/vector.png" alt="Map Icon" width={30} height={30} className=" mb-1" />
    </div>
              <span className="text-white font-semibold">Share</span>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start w-full px-4">
          <div  className=" bg-[#00796B] rounded-bl-lg rounded-br-lg h-[70px] text-2xl font-bold text-center text-white mb-6 lg:mt-[50px] fixed top-0 left-0 right-0  z-10 px-4 py-2 shadow-md">
         <h2 className='mt-5'>Create New Invite</h2> 
          </div>
          <form onSubmit={handleInviteSubmit} className="flex flex-col space-y-4 w-full max-w-md mt-[120px]">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 h-16 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            />
            {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}

            <input
              type="text"
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="p-3 h-16  border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            />
            {formErrors.whatsapp && <p className="text-red-500">{formErrors.whatsapp}</p>}

            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="p-3 h-16 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            />
            {formErrors.eventName && <p className="text-red-500">{formErrors.eventName}</p>}

            <input
              type="date"
              placeholder="Event Date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="p-3  h-16 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            />
            {formErrors.eventDate && <p className="text-red-500">{formErrors.eventDate}</p>}

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-3 h-16 mb-12 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            />
            {formErrors.country && <p className="text-red-500">{formErrors.country}</p>}

            <div>
              <button
                type="submit"
                className=" h-[60px] w-full py-3 bg-[#00796B] text-[20px] text-white font-semibold rounded-md hover:bg-[#00796B]-600 focus:outline-none focus:ring-2 focus:ring-black-500 mt-[100px]"
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
