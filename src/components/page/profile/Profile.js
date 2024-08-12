import HeadProfile from "../../profile/HeadProfile";
import Header from "../../homePage/Header";
import LeftProfile from "../../profile/LeftProfile";
import MainContent from "../../homePage/MainContent";
import OpenModalPost from "../../OpenModalPost";
import RightProfile from '../../profile/RightProfile';
import { useParams } from "react-router";

export default function Profile({params}) {
    const {id} = useParams();
    return (
        <div className="bg-gray-200 h-full">
            <Header />
            <div>
                <HeadProfile id={`${id}`}/>
            </div>
            <div className="lg:hidden">
                <div className="mx-5 mt-5 lg:hidden">
                    <OpenModalPost/>
                </div>
                <div className="mx-5 mt-5 lg:hidden">
                    <MainContent id={`${id}`}/>
                </div>
            </div>
            <div className="hidden lg:flex justify-between lg:mx-80 mt-2">
                <div className="rounded-md h-full w-1/3" style={{ position: '-webkit-sticky',   position: 'sticky',   top: '20px'}}>
                    <LeftProfile/>
                </div>
                <div className="rounded-md w-3/5">
                    <RightProfile id={`${id}`}/>
                </div>
            </div>
            <div className="h-8"></div>
        </div>
    )
}
