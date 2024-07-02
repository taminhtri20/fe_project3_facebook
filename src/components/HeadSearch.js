const HeadSearch = () => {
    return (
        <div className="bg-white">
            <div className="flex h-[52px] items-center">
                <img
                    className="w-6 h-6 md:mx-2"
                    src="./images/arrow_back_24dp_FILL0_wght400_GRAD0_opsz24.png"
                />
                <div className="bg-gray-100 flex items-center w-4/5 md:w-[680px] ml-4 md:ml-0 h-10 rounded-full">
                    <input
                        placeholder="Search Facebook"
                        className="text-sm focus:outline-none bg-transparent w-full ml-3"
                    />
                    <img
                    className="w-5 h-5 mr-2"
                    src="./images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png"/>
                </div>
                <img
                className="w-6 h-6 ml-2 md:ml-2"
                src="./images/search_24dp_FILL0_wght400_GRAD0_opsz24.png"
                />
            </div>
            <div className="flex justify-between items-center h-[46px] mx-3">
                <div className="rounded-md bg-gray-300 md:text-lg w-[60px]"><p className="font-bold text-center">Post</p></div>
                <div className="rounded-md bg-gray-300 md:text-lg w-[60px]"><p className="font-bold text-center">People</p></div>
                <div className="rounded-md bg-gray-300 md:text-lg w-[60px]"><p className="font-bold text-center">Group</p></div>
                <div className="rounded-md bg-gray-300 md:text-lg w-[60px]"><p className="font-bold text-center">Reels</p></div>
                <div className="rounded-md bg-gray-300 md:text-lg w-[60px]"><p className="font-bold text-center">Picture</p></div>
                <div className="hidden md:block text-lg rounded-md bg-gray-300 w-[60px]"><p className="font-bold text-center">Video</p></div>
                <div className="hidden md:block text-lg rounded-md bg-gray-300 w-[60px]"><p className="font-bold text-center">Page</p></div>
                <div className="hidden md:block text-lg rounded-md bg-gray-300 w-[60px]"><p className="font-bold text-center">Add</p></div>
                <div className="hidden md:block text-lg rounded-md bg-gray-300 w-[60px]"><p className="font-bold text-center">Events</p></div>
                <div className="hidden md:block text-lg rounded-md bg-gray-300 w-[60px]"><p className="font-bold text-center">Time</p></div>
            </div>
        </div>
    )
}
export default HeadSearch;