import { Link } from "react-router-dom";

const LeftContent = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <div className="hidden lg:block bg-gray-100 w-1/3 h-screen mt-10 fixed top-0 left-0">
            <Link to={'/profile/'+currentUser.id}>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images/18d97bf8ec274f791636.jpg"
                    />
                </div>
                <p className="ml-3 text-sm">Minh Trí</p>
            </div>
            </Link>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images1/icons8-friend-32.png"
                    />
                </div>
                <p className="ml-3 text-sm">Friends</p>
            </div>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images/icons8-time-64.png"
                    />
                </div>
                <p className="ml-3 text-sm">Celebrate</p>
            </div>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images1/icons8-saved-64.png"
                    />
                </div>
                <p className="ml-3 text-sm">Saved</p>
            </div>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images1/icons8-group-64.png"
                    />
                </div>
                <p className="ml-3 text-sm">Group</p>
            </div>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images1/icons8-video-64.png"
                    />
                </div>
                <p className="ml-3 text-sm">Video</p>
            </div>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images1/icons8-store-64.png"
                    />
                </div>
                <p className="ml-3 text-sm">Store</p>
            </div>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images1/icons8-newsfeed-64.png"
                    />
                </div>
                <p className="ml-3 text-sm">News Feed</p>
            </div>
            <div className="flex items-center ml-3 mt-5 w-1/2 hover:bg-gray-300 cursor-pointer rounded-md p-2">
                <div className="">
                    <img 
                    className="rounded-full w-9 h-9"
                    src="./images1/stat_minus_1_24dp_FILL0_wght400_GRAD0_opsz24.png"
                    />
                </div>
                <p className="ml-3 text-sm">More</p>
            </div>
            <hr className="ml-5 w-2/3 border-1"/>
            <div className="mt-3 ml-5 ">
                <p className="text-xl text-gray-800 opacity-80">Your shortcut</p>
            </div>
        </div>
    )
}
export default LeftContent;
