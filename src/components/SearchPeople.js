import axios from "axios";
import { useEffect, useState } from "react";

const SearchPeople = ({ searchValue }) => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(2); // Số lượng người hiển thị ban đầu
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const fetchPeople = async () => {
        setLoading(true);
        axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.accessToken;
        const res = await axios.get(`http://localhost:8080/friend/search?searchValue=${searchValue}`);
        setTimeout(() => {
            setPeople(res.data);
            setLoading(false); // Kết thúc loading
        }, 500);
    };

    useEffect(() => {
        fetchPeople();
    }, [searchValue]);

    const handleShowMore = () => {
        setVisibleCount(people.length); // Hiển thị toàn bộ người dùng
    };

    return (
        <div className="bg-white h-auto shadow-md rounded-md p-4">
            {loading ? (
                <div className="flex items-center justify-center absolute inset-0 bg-opacity-75 bg-gray-500 z-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                people.length === 0 ? (
                    <p className="p-2 text-center">No Result</p>
                ) : (
                    <>
                        {people.slice(0, visibleCount).map((item) => (
                            <div className="p-2 flex items-center justify-between" key={item.id}>
                                <div className="flex w-1/2 items-center">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="./images/18d97bf8ec274f791636.jpg"
                                        alt="Avatar"
                                    />
                                    <p className="ml-2 font-bold">{item.firstName} {item.lastName}</p>
                                </div>
                                <div className="mr-[10px] w-[80px] h-[25px] bg-blue-500 rounded-md cursor-pointer flex items-center">
                                    <img
                                        className="w-6 h-6"
                                        src="./icons/add-friend-svgrepo-com.svg"
                                        alt="Add icon"
                                    />
                                    <p className="text-md md:text-lg ml-1.5 text-white">Add</p>
                                </div>
                            </div>
                        ))}
                        {visibleCount < people.length && (
                            <button
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md w-full"
                                onClick={handleShowMore}
                            >
                                More
                            </button>
                        )}
                    </>
                )
            )}
        </div>
    );
};

export default SearchPeople;
