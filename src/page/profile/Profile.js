import HeadProfile from "../../components/HeadProfile";
import Header from "../../components/Header";
import LeftProfile from "../../components/LeftProfile";
import MainContent from "../../components/MainContent";
import OpenModalPost from "../../components/OpenModalPost";
import PostContent from "../../components/PostContent";
import RightProfile from "../../components/RightProfile";

export default function Profile() {
    return (
        <div className="bg-gray-200 h-full">
            <Header />
            <div>
                <HeadProfile/>
            </div>
            <div className="lg:hidden">
                <div className="mx-5 mt-5 lg:hidden">
                    <OpenModalPost/>
                </div>
                <div className="mx-5 mt-5 lg:hidden">
                    <MainContent/>
                </div>
            </div>
            <div className="hidden lg:flex justify-between lg:mx-80 mt-2">
                <div className="rounded-md h-full" style={{ position: '-webkit-sticky',   position: 'sticky',   top: '20px'}}>
                    <LeftProfile/>
                </div>
                <div className="rounded-md" style={{ width: '685px' }}>
                    <RightProfile/>
                </div>
            </div>
            <div className="h-8"></div>
        </div>
    )
}
