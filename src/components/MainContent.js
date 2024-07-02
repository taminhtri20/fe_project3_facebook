import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainContent = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [likeStates, setLikeStates] = useState({});
    const pathName = window.location.pathname;

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

    const likeButton = async (postId) => {
        if (likeStates[postId] === false) {
            const postLiked = posts.filter(post => post.id === postId);
            axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
            const res = await axios.put(`http://localhost:8080/post/likePost?idUserLike=${currentUser.id}`, postLiked[0]);
            if (pathName === "/profile") {
                const userPosts = res.data.filter(post => post.user.id === currentUser.id);
                setPosts(userPosts);
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
            if (pathName === "/profile") {
                const userPosts = res.data.filter(post => post.user.id === currentUser.id);
                setPosts(userPosts);
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
            const res = await axios.get(`http://localhost:8080/post/findAllPost`);
            if (pathName === "/profile") {
                const userPosts = res.data.filter(post => post.user.id === currentUser.id);
                setPosts(userPosts);
            } else {
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

    useEffect(() => {
        fetchDataUser();
        fetchDataPost();
    }, [currentUser.id, currentUser.accessToken]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 md:mx-12 lg:mx-0">
            {posts.map((item) => (
                <div key={item.id} className="bg-white mt-5 rounded-md shadow-md">
                    <div className="flex justify-between">
                        <div className="flex mt-2">
                            <Link to={'/profile/'+item.user.id}>
                            <img
                                className="w-10 h-10 rounded-full lg:ml-2"
                                src="./images/18d97bf8ec274f791636.jpg"
                                alt="User"
                            />
                            </Link>
                            <div className="ml-3">
                                <Link to={'/profile/'+item.user.id}>
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
                                        src="./images/groups_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                        alt="Group"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <img
                                    className="w-7 h-7 rounded-full"
                                    src="./images/more_horiz_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                    alt="More options"
                                />
                            </div>
                            <div className="ml-2 mr-2">
                                <img
                                    className="w-7 h-7 rounded-full"
                                    src="./images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                    alt="Close"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 lg:ml-2">
                        <p>{item.title}</p>
                    </div>
                    <div>
                        {item.content && (
                            <img
                                src={item.content}
                                alt="Post content"
                            />
                        )}
                    </div>
                    <div className="flex mt-2.5 items-center">
                        <img
                            className="w-5 h-5"
                            src="./images1/Facebook-Like.png"
                            alt="Like"
                        />
                        <p className="text-sm ml-1 opacity-50">{item.usersLiked.length}</p>
                    </div>
                    <hr className="mt-2"/>
                    <div className="flex mx-5 mt-2 justify-between items-center">
                        <div
                            className={`lg:w-1/3 lg:h-7 flex items-center hover:bg-gray-300 rounded-md cursor-pointer mb-2 ${likeStates[item.id] ? 'text-blue-600' : ''}`}
                            onClick={() => likeButton(item.id)}
                        >
                            <img
                                className="w-5 h-5  lg:ml-14"
                                src={likeStates[item.id] ? "./icons/like.png" : "./images1/thumb_up_24dp_FILL0_wght400_GRAD0_opsz24.png"}
                                alt="Like"
                            />
                            <p className="ml-2">{likeStates[item.id] ? 'Like' : 'Like'}</p>
                        </div>
                        <div className="flex lg:w-1/3 lg:h-7 items-center hover:bg-gray-300 rounded-md cursor-pointer mb-2">
                            <img
                                className="w-5 h-5 lg:ml-10"
                                src="./images1/tooltip_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                alt="Comment"
                            />
                            <p className="ml-2">Comment</p>
                        </div>
                        <div className="mr-1.5 lg:w-1/3 lg:h-7 flex items-center hover:bg-gray-300 rounded-md cursor-pointer mb-2">
                            <img
                                className="w-5 h-5 lg:ml-14"
                                src="./images1/share_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                alt="Share"
                            />
                            <p className="ml-2">Share</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainContent;
