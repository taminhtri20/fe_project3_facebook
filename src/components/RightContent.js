const RightContent = () => {
    return (
        <div className="hidden lg:block bg-gray-100 mt-10 w-1/3 h-screen fixed top-0 right-0">
            <div className="w-1/2 float-right mr-10 mt-5">
                <p className="text-xl text-gray-800 opacity-80">Sponsored</p>
                <div className="flex items-center mt-3 hover:bg-gray-300 cursor-pointer rounded-md">
                    <img
                        className="w-1/2 rounded-md"
                        src="./images1/441971919_120210710958440063_5182708933870804812_n.jpg"
                    />
                    <div className="ml-5 ">
                        <p className="">Master KoreanVN</p>
                        <p className="text-sm opacity-60">masterkorean.vn</p>
                    </div>
                </div>
                <div className="flex items-center mt-4 hover:bg-gray-300 cursor-pointer rounded-md">
                    <img
                        className="w-1/2 rounded-md"
                        src="./images1/448497320_120212905664970749_7895339378347390663_n.jpeg"
                    />
                    <div className="ml-5">
                        <p>StaynFun</p>
                        <p className="text-sm opacity-60">book.vinpearl.com</p>
                    </div>
                </div>

                <hr className="mr-2 mt-3" />

                <div className="mt-4">
                    <div className="flex items-center">
                        <p className="text-xl text-gray-800 opacity-80">Contact person</p>
                        <div className="flex ">
                            <div className="rounded-full hover:bg-gray-200 cursor-pointer ml-20">
                                <img
                                    src="./images/search_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                    width={25}
                                />
                            </div>
                            <div className="rounded-full hover:bg-gray-200 cursor-pointer ml-5">
                                <img
                                    src="./images/menu_24dp_FILL0_wght400_GRAD0_opsz24.png"
                                    width={25}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center hover:bg-gray-300 rounded-md cursor-pointer">
                        <div className="relative ml-2 h-12 ">
                            <img
                                className="w-9 h-9 mt-2 rounded-full"
                                src="./images/18d97bf8ec274f791636.jpg"
                                alt="User"
                            />
                            <div className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <p className="ml-5">Ta Minh Tri</p>
                    </div>
                </div>

                <hr className="mr-2 mt-3" />
                <div>
                    <p className="text-xl mt-4 text-gray-800 opacity-80">Group chat</p>
                    <div></div>
                    <div className="hover:bg-gray-300 h-12 mt-5 cursor-pointer rounded-md flex items-center">
                        <div className="ml-2 w-10 h-10 rounded-full bg-gray-200 ">
                            <img
                                className="w-8 h-9 lg:w-6 lg:h-6 lg:ml-2 lg:mt-1.5 ml-1"
                                src="./images/add_24dp_FILL0_wght400_GRAD0_opsz24.png"
                            />
                        </div>
                        <p className="ml-5 text-md opacity-60">Create new group</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RightContent;
