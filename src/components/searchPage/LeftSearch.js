const LeftSearch = ()=>{
    return(
        <div className="w-[360px] bg-white h-screen mt-10 fixed top-0 left-0 mt-14 shadow-md rounded-md">
            <div className="p-4">
                <h1 className="font-bold text-2xl">Result Searching</h1>
                <hr className="mt-3"/>
                <div className="mt-2">
                <h1 className="font-bold text-lg">Filter</h1>
                <div className="flex items-center mt-2 rounded-md bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-blue-600 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/wysiwyg_24dp_FILL0_wght400_GRAD0_opsz24.svg"
                    />
                    </div>
                    <p className="ml-3">All</p>
                </div>
                <div className="flex items-center mt-2 rounded-md hover:bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-gray-200 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/icons8-group-64.png"
                    />
                    </div>
                    <p className="ml-3">Friend</p>
                </div>
                <div className="flex items-center mt-2 rounded-md hover:bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-gray-200 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/icons8-newsfeed-64.png"
                    />
                    </div>
                    <p className="ml-3">Newsfeed</p>
                </div>
                <div className="flex items-center mt-2 rounded-md hover:bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-gray-200 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/icons8-image-64.png"
                    />
                    </div>
                    <p className="ml-3">Picture</p>
                </div>
                <div className="flex items-center mt-2 rounded-md hover:bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-gray-200 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/icons8-video-64.png"
                    />
                    </div>
                    <p className="ml-3">Video</p>
                </div>
                <div className="flex items-center mt-2 rounded-md hover:bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-gray-200 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/icons8-store-64.png"
                    />
                    </div>
                    <p className="ml-3">Market</p>
                </div>
                <div className="flex items-center mt-2 rounded-md hover:bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-gray-200 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/icons8-time-64.png"
                    />
                    </div>
                    <p className="ml-3">Time</p>
                </div>
                <div className="flex items-center mt-2 rounded-md hover:bg-gray-100 h-[50px]">
                    <div className="rounded-full w-10 h-10 bg-gray-200 ml-2">
                    <img
                    className="w-6 h-6 ml-2 mt-2"
                    src="./images1/icons8-saved-64.png"
                    />
                    </div>
                    <p className="ml-3">Saved</p>
                </div>
                </div>
            </div>
        </div>
    )
}
export default LeftSearch;