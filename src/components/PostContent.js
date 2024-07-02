const PostContent = ({ onInputClick }) => {
    return (
      <div className="bg-white rounded-md md:mx-12 md:mt-5 lg:mx-0 p-4 shadow-md">
        <div className="flex items-center">
          <img
            className="w-10 h-10 md:w-12 rounded-full"
            src="./images/18d97bf8ec274f791636.jpg"
          />
          <input
            placeholder="   Hey Minh, What do you think?"
            className="ml-4 text-md focus:outline-none bg-gray-100 w-full md:w-full p-2 rounded-full"
            onClick={onInputClick}
          />
        </div>
        <hr className="my-4"/>
        <div className="flex justify-between">
          <div className="flex items-center cursor-pointer hover:bg-gray-300 rounded-full p-2">
            <img
              src="./images1/icons8-video-camera-64.png"
              width={30}
            />
            <p className="ml-2">Live video</p>
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-300 rounded-full p-2">
            <img
              src="./images1/icons8-image-64.png"
              width={30}
            />
            <p className="ml-2">Image/video</p>
          </div>
          <div className="hidden md:flex items-center cursor-pointer hover:bg-gray-300 rounded-full p-2">
            <img
              src="./images1/icons8-reaction-64.png"
              width={30}
            />
            <p className="ml-2">Reaction</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PostContent;
  