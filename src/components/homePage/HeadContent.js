import React, { useState } from 'react';

const HeadContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: "./images/18d97bf8ec274f791636.jpg", title: "Create", icon: "./images/add_24dp_FILL0_wght400_GRAD0_opsz24 (1).png" },
    { src: "./images/18d97bf8ec274f791636.jpg", name: "Tạ Minh Trí", icon: "./images/18d97bf8ec274f791636.jpg" },
    { src: "./images/18d97bf8ec274f791636.jpg", name: "Tạ Minh Trí", icon: "./images/18d97bf8ec274f791636.jpg" },
    { src: "./images/18d97bf8ec274f791636.jpg", name: "Tạ Minh Trí", icon: "./images/18d97bf8ec274f791636.jpg" },
    { src: "./images/18d97bf8ec274f791636.jpg", name: "Tạ Minh Trí", icon: "./images/18d97bf8ec274f791636.jpg" },
    { src: "./images/18d97bf8ec274f791636.jpg", name: "Tạ Minh Trí", icon: "./images/18d97bf8ec274f791636.jpg" },
    { src: "./images/18d97bf8ec274f791636.jpg", name: "Tạ Minh Trí", icon: "./images/18d97bf8ec274f791636.jpg" },
    { src: "./images/18d97bf8ec274f791636.jpg", name: "Tạ Minh Trí", icon: "./images/18d97bf8ec274f791636.jpg" },
  ];

  const handleNext = () => {
    if (currentIndex < images.length - 2) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getTransformStyle = () => {
    return { transform: `translateX(-${currentIndex * 9.5}rem)` };
  };

  return (
    <div className="relative bg-gray-100 h-72 flex w-full shadow-md items-center justify-center">
      {currentIndex > 0 && (
        <button
          className="absolute left-0 md:ml-16 lg:ml-1.5 bg-gray-200 p-2 rounded-full focus:outline-none z-10"
          onClick={handlePrev}
        >
          <img 
          src='./images/arrow_back_24dp_FILL0_wght400_GRAD0_opsz24.png'
          width={20}
          />
        </button>
      )}

      <div className="flex items-center overflow-hidden md:mx-12 lg:mx-0 h-72">
        <div
          className="flex transition-transform duration-300"
          style={{
            ...getTransformStyle(),
            width: `${images.length * 9.25}rem`
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-36 h-64 mr-3 rounded-md flex flex-col relative flex-shrink-0 cursor-pointer"
            >
              <img
                className={`rounded-md  h-72 object-cover ${index === 0 ? 'rounded-tl-md rounded-tr-md' : ''}`}
                src={image.src}
                alt={image.name}
              />
              <div className={`${index === 0 ? 'bg-white h-16 rounded-bl-md rounded-br-md flex flex-col items-center justify-center relative' : 'absolute top-0 left-0 m-2 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center'}`}>
                {index === 0 ? (
                  <div className="absolute -top-10 transform translate-y-1/2">
                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                      <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                        <img
                          className="w-6 h-6"
                          src={image.icon}
                          alt="icon"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    className='w-[34px] h-[34px] rounded-full'
                    src={image.icon}
                    alt="icon"
                  />
                )}
              </div>
              <p className={`absolute mx-7 bottom-0 ml-12 m-2 text-sm font-bold ${index === 0 ? 'text-black' : 'text-white'}`}>
                {image.title}
              </p>
              <p className={`absolute bottom-0 left-0 m-2 text-sm font-bold ${index === 0 ? 'text-black' : 'text-white'}`}>
                {image.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {currentIndex < images.length - 2 && (
        <button
          className="absolute right-0 mr-3 md:mr-14 lg:mr-1 bg-gray-200 p-2 rounded-full focus:outline-none z-10"
          onClick={handleNext}
        >
          <img
          src='./images/arrow_forward_ios_24dp_FILL0_wght400_GRAD0_opsz24.png'
          width={20}
          />
        </button>
      )}
    </div>
  );
};

export default HeadContent;
