import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const PostModal = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // New state for the selected image
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({})

  const [post, setPost] = useState({
    title: '',
    content: '',
    user: {
      id: currentUser.id
    }
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
    const newErrors = {};
        for (let field in post) {
            if (!post[field]) {
                newErrors[field] = true;
            }
            if (post[field] !== "") {
                if (newErrors[field] !== false) {
                    delete newErrors[field];
                }
            }
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length <= 1) {
          try {
            const res = await axios.post(`http://localhost:8080/post/savePost`, post);
            if (res.data === "Upload success") {
              enqueueSnackbar(res.data, { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
              onClose();
              window.location.href = "/homePage";
            } else {
              enqueueSnackbar("Upload failed", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
              navigate("/homePage");
            }
          } catch (error) {
            console.error(error);
          }
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
      setPost((prevPost) => ({
        ...prevPost,
        content: imageUrl // Lưu đường dẫn của ảnh vào content
      }));
      setSelectedImage(false);
    }
  };
  
  const handleRemoveImage = () => {
    setImagePreview(null);
    setPost((prevPost) => ({
      ...prevPost,
      content: '' // Xóa đường dẫn của ảnh khi người dùng xóa ảnh
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white rounded-md shadow-lg transition-all duration-200 w-full md:w-2/3 lg:w-1/3 h-auto md:h-auto">
        <Post
          setIsActive={setIsActive}
          onClose={onClose}
          handleSubmit={handleSubmit}
          post={post}
          handleChange={handleChange}
          handleImageClick={handleImageClick} // Pass the image click handler
          selectedImage={selectedImage} // Pass the selected image
          imagePreview={imagePreview} // Pass the image preview
          handleImageChange={handleImageChange} // Pass the image change handler
          handleRemoveImage={handleRemoveImage} // Pass the remove image handler
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
          src="./images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png"
          alt="Close"
        />
      </div>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-4">
        <img className="rounded-full w-12 h-12" src="./images/18d97bf8ec274f791636.jpg" alt="logo" />
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
            className='w-6 -6'
            src='./images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png'
            />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <img className="w-6 cursor-pointer" src="./icons/theme.svg" alt="theme" onClick={handleImageClick} />
        <img className="w-6 cursor-pointer" src="./icons/smile.svg" alt="smile" onClick={handleImageClick} />
      </div>
      <div className="flex items-center justify-between mt-4 p-3 border rounded-md">
        <p className="text-sm font-medium text-gray-700">Add to Your Post</p>
        <ul className="flex space-x-2">
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="./icons/gallery.svg" alt="gallery" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="./icons/tag.svg" alt="tag" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="./icons/emoji.svg" alt="emoji" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="./icons/mic.svg" alt="mic" /></li>
          <li className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleImageClick}><img src="./icons/more.svg" alt="more" /></li>
        </ul>
      </div>
      <button type="submit" className="w-full mt-4 py-2 text-white font-medium rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none">Post</button>
    </form>
  </section>
);

export default PostModal;
