import MainContent from "./MainContent";
import PostContent from "./PostContent";

const HeadProfile = () =>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return(
        <div>
            <div className="bg-gray-200 lg:bg-white h-full">
                <div className="bg-gray-200  h-36 md:h-72 lg:mx-72 lg:h-auto lg:rounded-md">
                    <div className="hidden lg:block lg:h-64 bg-gray-200 lg:rounded-md"></div>
                    <div className="hidden lg:block lg:h-52 bg-gray-200 lg:rounded-md"></div>
                </div> 
                <div className="bg-white">
                    <div className="lg:flex">
                    <div className="flex items-center justify-center lg:justify-normal lg:mx-80  lg:w-44">
                    <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center -mt-20 lg:-mt-10 lg:w-full">
                    <img
                    className="rounded-full"
                    src="./images/18d97bf8ec274f791636.jpg"
                    style={{width: '168px', height: '168px'}}
                    />
                    </div>
                </div>
                <div className="text-center mt-3 lg:-ml-80 lg:text-left lg:mt-7">
                    <h1 className="font-bold text-3xl">{currentUser.username}</h1>
                    <p className="opacity-50 text-md">200 friend</p>
                </div>
                    </div>
                <hr className="mx-5 mt-4 lg:mx-80"/>
                <div className="flex justify-between mx-5 mt-4 shadow-md lg:mx-80">
                    <div className="text-blue-600 border-b-2 font-bold border-blue-600 text-sm md:text-lg">Posts</div>
                    <div className="opacity-50 text-sm md:text-lg">Introduce</div>
                    <div className="opacity-50 hidden md:block text-sm md:text-lg">Friend</div>
                    <div className="opacity-50 hidden md:block text-sm md:text-lg">Picture</div>
                    <div className="opacity-50 hidden md:block text-sm md:text-lg">Video</div>
                    <div className="opacity-50 hidden md:block text-sm md:text-lg">Reels</div>
                    <div className="opacity-50">More</div>
                    <div className="w-8 h-8 rounded-md bg-gray-200 md:-mt-1">
                        <img
                        className="w-6 h-6 ml-1 mt-1"
                        src="./images/more_horiz_24dp_FILL0_wght400_GRAD0_opsz24.png"
                        />
                    </div>
                </div>
                </div>
                <div className="bg-white mx-5 md:mx-12 h-64 md:h-auto shadow-md mt-5 rounded-md lg:hidden">
                    <div className="mx-5 flex justify-between">
                    <h1 className="font-bold text-xl md:text-2xl md:mt-3">Picture</h1>
                    <p className="text-blue-600 mt-1 md:text-lg md:mt-4">See all photos</p>
                    </div>
                    <div className="mx-5 mt-3 flex justify-between">
                        <div>
                            <img
                            className="rounded-md w-24 h-24 md:w-52 md:h-52"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                        </div>
                        <div>
                            <img
                            className="rounded-md w-24 h-24 md:w-52 md:h-52"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                        </div>
                        <div>
                            <img
                            className="rounded-md w-24 h-24 md:w-52 md:h-52"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                        </div>
                    </div>
                    <div className="mx-5 mt-3 md:mt-1 flex justify-between">
                        <div>
                            <img
                            className="rounded-md w-24 h-24 md:w-52 md:h-52"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                        </div>
                        <div>
                            <img
                            className="rounded-md w-24 h-24 md:w-52 md:h-52"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                        </div>
                        <div>
                            <img
                            className="rounded-md w-24 h-24 md:w-52 md:h-52"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                        </div>
                    </div>
                    <div className="hidden md:block h-6"></div>
                </div>
                <div className="bg-white mx-5 md:mx-12 shadow-md mt-5 rounded-md h-auto lg:hidden">
                    <div className="flex justify-between mx-5">
                        <div className="mt-3">
                            <h1 className="font-bold text-xl md:text-2xl">Friend</h1>
                            <p className="opacity-50">200 friend</p>
                        </div>
                        <div className="mt-5">
                            <p className="text-blue-600 md:text-lg">See all friends</p>
                        </div>
                    </div>
                    <div className="flex justify-between mx-5 mt-4">
                        <div className="">
                            <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                        <div className="">
                        <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                        <div className="">
                        <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                    </div>
                    <div className="flex justify-between mx-5 mt-4">
                        <div className="">
                            <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                        <div className="">
                        <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                        <div className="">
                        <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                    </div>
                    <div className="flex justify-between mx-5 mt-4">
                        <div className="">
                            <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                        <div className="">
                        <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                        <div className="">
                        <img
                            className="w-24 h-24 md:w-52 md:h-52 rounded-md"
                            src="./images/18d97bf8ec274f791636.jpg"
                            />
                            <p className="font-bold md:text-lg">Ta Minh Tri</p>
                        </div>
                    </div>
                    <div className="h-2 md:h-6"></div>
                </div>
                <div className="h-6"></div>
            </div>
        </div>
    )
}
export default HeadProfile;