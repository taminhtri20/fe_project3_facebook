import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MainContent = ({ id, searchValue}) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [likeStates, setLikeStates] = useState({});
    const [commentStatus, setCommentStatus] = useState({});
    const pathName = window.location.pathname;
    const [commentContent, setCommentContent] = useState({
        user: {
            id: currentUser.id
        },
        content: ''
    });
    const [isCommentEmpty, setIsCommentEmpty] = useState(false);
    const commentTextareaRef = useRef(null);
    const [showComment, setShowComment] = useState({});

    const adjustTextareaHeight = () => {
        const textarea = commentTextareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const calculateTimeDifference = (createAt) => {
        const postDate = new Date(createAt);
        const now = new Date();
        const difference = now - postDate;

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            return `${days} days ago`;
        }
    };

    const openComment = (postId) => {
        setCommentStatus((prevStatus) => ({
            ...prevStatus,
            [postId]: !prevStatus[postId],
        }));
    };

    const handleCommentSubmit = async (e, postId) => {
        e.preventDefault();
        if (commentContent.content.trim() === '') {
            setIsCommentEmpty(true);
            return;
        }
        setIsCommentEmpty(false);
        const newComment = {
            ...commentContent,
            user: {
                id: currentUser.id
            },
        };
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
            await axios.post(`http://localhost:8080/comment?postId=${postId}`, newComment);
            setCommentContent({ user: { id: currentUser.id }, content: '' });
            setCommentStatus((prevStatus) => ({
                ...prevStatus,
                [postId]: false,
            }));
            fetchDataPost();
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };

    const likeButton = async (postId) => {
        if (likeStates[postId] === false) {
            const postLiked = posts.filter(post => post.id === postId);
            axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
            const res = await axios.put(`http://localhost:8080/post/likePost?idUserLike=${currentUser.id}`, postLiked[0]);
            if (pathName === "/profile/" + id) {
                const userPosts = res.data.filter(post => post.user.id == id);
                setPosts(userPosts);
            } else if(pathName === "/search"){
                const res1 = await axios.get(`http://localhost:8080/post/searchingPost?searchValue=${searchValue}`);
                setPosts(res1.data);
            } else {
                setPosts(res.data);
            }
            setLikeStates((prevLikeStates) => ({
                ...prevLikeStates,
                [postId]: !prevLikeStates[postId],
            }));
        } else {
            const postLiked = posts.filter(post => post.id === postId);
            axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
            const res = await axios.put(`http://localhost:8080/post/unlikePost?idUserLike=${currentUser.id}`, postLiked[0]);
            if (pathName === "/profile/" + id) {
                const userPosts = res.data.filter(post => post.user.id == id);
                setPosts(userPosts);
            }else if(pathName === "/search"){
                const res1 = await axios.get(`http://localhost:8080/post/searchingPost?searchValue=${searchValue}`);
                setPosts(res1.data);
            } else {
                setPosts(res.data);
            }
            setLikeStates((prevLikeStates) => ({
                ...prevLikeStates,
                [postId]: !prevLikeStates[postId],
            }));
        }
    };

    const fetchDataUser = async () => {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
            const res = await axios.get(`http://localhost:8080/users/${currentUser.id}`);
            setUserData(res.data);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    const fetchDataPost = async () => {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
            let res;
    
            if (pathName === "/profile/" + id) {
                res = await axios.get(`http://localhost:8080/post/findAllPost`);
                const userPosts = res.data.filter(post => post.user.id == id);
                setPosts(userPosts);
            } else if (pathName === "/search") {
                res = await axios.get(`http://localhost:8080/post/searchingPost?searchValue=${searchValue}`);
                setPosts(res.data);
            } else {
                res = await axios.get(`http://localhost:8080/post/findPostByUser?id=${currentUser.id}`);
                setPosts(res.data);
            }
            const initialLikeStates = res.data.reduce((acc, post) => {
                acc[post.id] = post.usersLiked.some(user => user.id === currentUser.id);
                return acc;
            }, {});
            setLikeStates(initialLikeStates);
        } catch (error) {
            console.error("Error fetching posts", error);
        }
    };
    

    const formDeletePost = (id) =>{
        document.body.style.overflow = 'hidden';
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this post?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
            reverseButtons: true,
            customClass: {
            container: 'swal-container flex items-center justify-center', // Center the container
            popup: 'bg-white rounded-lg shadow-md p-6', // Style the popup
            title: 'text-xl font-semibold',
            htmlContainer: 'text-sm text-gray-600',
            confirmButton: 'bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none ml-2', // Add margin to buttons if needed
            cancelButton: 'bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none ml-2', // Add margin to buttons if needed
            }
        }).then(res => {
            if(res.isConfirmed) {
                axios.delete(`http://localhost:8080/post/deletePost?id=${id}`).then(res =>{
                    Swal.fire({
                        icon: "success",
                        text: res.data
                      });
                    fetchDataPost();
                    document.body.style.overflow = '';
                })
            }
            document.body.style.overflow = '';
        })
    }

    useEffect(() => {
        fetchDataUser();
        fetchDataPost();
        adjustTextareaHeight();
    }, [id, searchValue]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 md:mx-12 lg:mx-0">
            {posts.map((item) => (
                <div key={item.id} className="bg-white mt-5 p-2 rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div className="flex mt-2">
                            <Link to={'/profile/' + item.user.id}>
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={`http://localhost:8080/images/${item.user.avatar}`}
                                    alt="User"
                                />
                            </Link>
                            <div className="ml-3">
                                <Link to={'/profile/' + item.user.id}>
                                    <p className="text-md font-bold">{item.user.firstName} {item.user.lastName}</p>
                                </Link>
                                <div className="flex">
                                    {item.user.id === currentUser.id ? (
                                        <p className="text-sm text-gray-800 opacity-50">{calculateTimeDifference(item.createAt)}</p>
                                    ) : (
                                        <p className="text-sm text-gray-800 opacity-50">{calculateTimeDifference(item.createAt)}</p>
                                    )}
                                    <img
                                        className="w-5 h-5 ml-2"
                                        src="../images/groups_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                        alt="Group"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="cursor-pointer">
                                <img
                                    className="w-7 h-7 rounded-full hover:bg-gray-200"
                                    src="../images/more_horiz_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                    alt="More options"
                                />
                            </div>
                            {item.user.id === currentUser.id &&(
                                <div className="ml-2 mr-2 cursor-pointer" onClick={()=>formDeletePost(item.id)}>
                                <img
                                    className="w-7 h-7 rounded-full hover:bg-gray-200"
                                    src="../images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                    alt="Close"
                                />
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-2 lg:ml-2">
                        <p>{item.title}</p>
                    </div>
                    <div>
                        {item.content && (
                            <img
                                src={`http://localhost:8080/images/${item.content}`}
                                alt="Post content"
                            />
                        )}
                    </div>
                    <div className="flex mt-2.5 items-center justify-between">
                        <div className="flex items-center">
                            <img
                                className="w-5 h-5"
                                src="../images1/Facebook-Like.png"
                                alt="Like"
                            />
                            <p className="text-sm ml-1 opacity-50">{item.usersLiked.length}</p>
                        </div>
                        <div className="text-sm ml-1 mr-2 opacity-50">
                            {item.comments.length} comment
                        </div>
                    </div>

                    <hr className="mt-2" />
                    <div className="flex mx-5 mt-2.5 justify-between mb-2">
                        <div
                            className={`flex lg:w-1/3 lg:h-7 items-center hover:bg-gray-300 rounded-md cursor-pointer mb-2 ${likeStates[item.id] ? 'text-blue-600' : ''}`}
                            onClick={() => likeButton(item.id)}
                        >
                            <img
                                className="w-5 h-5  lg:ml-14"
                                src={likeStates[item.id] ? "../icons/like.png" : "../images1/thumb_up_24dp_FILL0_wght400_GRAD0_opsz24.png"}
                                alt="Like"
                            />
                            <p className="ml-2">{likeStates[item.id] ? 'Like' : 'Like'}</p>
                        </div>
                        <div className="flex lg:w-1/3 lg:h-7 items-center hover:bg-gray-300 rounded-md cursor-pointer mb-2" onClick={() => openComment(item.id)}>
                            <img
                                className="w-5 h-5 lg:ml-10"
                                src="../images1/tooltip_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                alt="Comment"
                            />
                            <p className="ml-2">Comment</p>
                        </div>
                        <div className="mr-1.5 lg:w-1/3 lg:h-7 flex items-center hover:bg-gray-300 rounded-md cursor-pointer mb-2">
                            <img
                                className="w-5 h-5 lg:ml-14"
                                src="../images1/share_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                alt="Share"
                            />
                            <p className="ml-2">Share</p>
                        </div>
                    </div>
                    <hr className="mx-3"></hr>
                    {item.comments.slice(0, showComment[item.id] ? 1 : item.comments.length).map((item1) => (
                        <div key={item1.id} className="h-auto">
                            <div className="p-4 flex">
                                <div>
                                    <img
                                        className="w-10 h-9 rounded-full mt-1"
                                        src="../images/18d97bf8ec274f791636.jpg"
                                    />
                                </div>
                                <div className="ml-2 bg-gray-100 w-[300px] md:w-[570px] rounded-2xl">
                                    <div className="p-2">
                                        <div>
                                            <p className="font-bold text-sm">{item1.user.firstName} {item1.user.lastName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{item1.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {item.comments.length > 1 && (
                        <div className="flex justify-left mb-2 p-2">
                            <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => setShowComment({ ...showComment, [item.id]: !showComment[item.id] })}
                            >
                                {showComment[item.id] ? "See more comments" : `Hide comments`}
                            </button>
                        </div>
                    )}
                    {commentStatus[item.id] && (
                        <form onSubmit={(e) => handleCommentSubmit(e, item.id)}>
                            <hr className="mx-6" />
                            <div className="flex p-4 items-center">
                                <div className="items-center">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="../images/18d97bf8ec274f791636.jpg"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <textarea
                                        ref={commentTextareaRef}
                                        className={`ml-2 w-[290px] md:w-[590px] lg:w-[530px]  rounded-2xl bg-gray-200 resize-none overflow-hidden ${isCommentEmpty ? 'border-2 border-red-500' : ''}`}
                                        value={commentContent.content}
                                        onChange={(e) => {
                                            setCommentContent({ ...commentContent, content: e.target.value });
                                            adjustTextareaHeight();
                                            setIsCommentEmpty(e.target.value.trim() === '');
                                        }}
                                        placeholder="Write a comment..."
                                        rows={2}
                                        style={{ overflowWrap: "break-word", whiteSpace: "pre-wrap" }}
                                    />
                                    <button type="submit" className="w-4 h-4 -ml-10 mb-2 cursor-pointer">
                                        <img
                                            className=""
                                            src="../icons/paper-plane.png"
                                        />
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MainContent;
