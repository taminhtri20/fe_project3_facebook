import HeadSearch from "../../components/HeadSearch";
import Header from "../../components/Header";
import LeftSearch from "../../components/LeftSearch";
import MainContent from "../../components/MainContent";
import RightSearch from "../../components/RightSearch";

export default function PageSearch (){
    return(
        <div className="bg-gray-200 h-full">
            <div className="lg:hidden">
            <HeadSearch/>
            <div className="">
            <MainContent/>
            </div>
            </div>
            <div className="hidden lg:block bg-gray-100">
                <Header/>
                <div className="flex">
                <LeftSearch/>
                <RightSearch/>
                </div>
            </div>
        </div>
    )
}