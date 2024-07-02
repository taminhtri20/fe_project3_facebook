import React, { useState } from 'react';
import PostModal from './PostModal';
import PostContent from './PostContent';

const OpenModalPost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className={`relative ${isModalOpen ? 'overflow-hidden' : ''}`}>
        <PostContent onInputClick={() => setIsModalOpen(true)} />
        {isModalOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsModalOpen(false)}></div>
            <PostModal onClose={() => setIsModalOpen(false)} />
          </>
        )}
      </div>
    );
};

export default OpenModalPost;
