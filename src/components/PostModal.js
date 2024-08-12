import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostModal = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null); // State to hold the selected file
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const [post, setPost] = useState({
    title: '',
    content: '',
    userId: currentUser.id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('file', file); // Append file to FormData
    formData.append('content', "");
    formData.append('userId', post.userId); // Ensure this matches the backend userId param name

    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
      const res = await axios.post('http://localhost:8080/post/savePost', formData);

      // Simulate a delay of 5 seconds
      setTimeout(() => {
        setIsLoading(false); // Set loading state to false after delay
        if (res.data === 'Upload success') {
          enqueueSnackbar(res.data, { variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'top' } });
          onClose();
          window.location.href = "homePage";
        } else {
          enqueueSnackbar('Upload failed', { variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'top' } });
          window.location.href = "homePage";
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error uploading post', { variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'top' } });
      setIsLoading(false); // Ensure loading state is set to false on error
    }
  };

  const handleImageClick = () => {
    setSelectedImage(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFile(file); // Set the selected file
      setPost((prevPost) => ({
        ...prevPost,
        content: imageUrl
      }));
      setSelectedImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFile(null); // Clear the selected file
    setPost((prevPost) => ({
      ...prevPost,
      content: ''
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white rounded-md shadow-lg transition-all duration-200 w-full md:w-2/3 lg:w-1/3 h-auto md:h-auto">
        {isLoading && (
          <div className="flex items-center justify-center absolute inset-0 bg-opacity-75 bg-gray-500 z-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <Post
          setIsActive={setIsActive}
          onClose={onClose}
          handleSubmit={handleSubmit}
          post={post}
          handleChange={handleChange}
          handleImageClick={handleImageClick}
          selectedImage={selectedImage}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          errors={errors}
        />
      </div>
    </div>
  );
};

const Post = ({ setIsActive, onClose, handleSubmit, post, handleChange, handleImageClick, selectedImage, imagePreview, handleImageChange, handleRemoveImage, errors }) => (
  <section className="post w-full p-4 md:p-8">
    <div className="flex justify-between items-center border-b border-gray-300 pb-2 lg:-mt-4">
      <header className="text-lg font-semibold text-center w-full">Create Post</header>
      <div className="rounded-full w-8 h-8 bg-gray-200 cursor-pointer flex items-center justify-center ml-auto" onClick={() => { setIsActive(false); onClose(); }}>
        <img
          className="w-6 h-6"
          src="../images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png"
          alt="Close"
        />
      </div>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-4">
        <img className="rounded-full w-12 h-12" src="../images/18d97bf8ec274f791636.jpg" alt="logo" />
        <div className="ml-3">
          <p className="font-medium text-lg">Ta Minh Tri</p>
          <div className="flex items-center cursor-pointer bg-gray-200 rounded-full px-2 py-1 mt-1" onClick={() => setIsActive(true)}>
            <i className="fas fa-user-friends text-xs"></i>
            <span className="text-sm ml-1">Friends</span>
            <i className="fas fa-caret-down text-xs ml-1"></i>
          </div>
        </div>
      </div>
      <textarea
        name='title'
        value={post.title}
        onChange={handleChange}
        className={`w-full mt-4 p-2 border ${errors.title ? 'border-red-500' : 'border-gray-100'} rounded-md focus:outline-none resize-none`}
        placeholder="What's on your mind, Minh?"
        spellCheck="false"></textarea>
      {selectedImage && !imagePreview && (
        <div className="mt-4 flex justify-center items-center border-dashed border-2 border-gray-300 rounded-md p-4">
          <input type="file" onChange={handleImageChange} className="hidden" id="file-input" />
          <label htmlFor="file-input" className="cursor-pointer text-blue-500">Select Image</label>
        </div>
      )}
      {imagePreview && (
        <div className="mt-4 flex justify-center relative">
          <img src={imagePreview} alt="Selected" className="w-1/2 h-auto rounded-md" />
          <button 
            type="button" 
            className="absolute top-0 right-20 bg-gray-200 text-white rounded-full p-1" 
            onClick={handleRemoveImage}
          >
            <img
              className='w-6 h-6'
              src='../images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png'
              alt="Close"
            />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <img className="w-6 cursor-pointer" src="../icons/theme.svg" alt="theme" onClick={handleImageClick} />
        <img className="w-6 cursor-pointer" src="../icons/smile.svg" alt="smile" onClick={handleImageClick} />
      </div>
      <div className="flex items-center justify-between mt-4 p-3 border rounded-md">
        <p className="text-sm font-medium text-gray-700">Add to Your Post</p>
        <ul className="flex space-x-2">
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="../icons/gallery.svg" alt="gallery" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="../icons/tag.svg" alt="tag" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="../icons/emoji.svg" alt="emoji" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="../icons/mic.svg" alt="mic" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="../icons/more.svg" alt="more" /></li>
        </ul>
      </div>
      <button type="submit" className="w-full mt-4 py-2 text-white font-medium rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none">Post</button>
    </form>
  </section>
);

export default PostModal;
