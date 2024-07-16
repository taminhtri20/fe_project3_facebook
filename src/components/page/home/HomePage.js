import Header from "../../homePage/Header";
import LeftContent from "../../homePage/LeftContent";
import Content from "../../homePage/Content";
import RightContent from "../../homePage/RightContent";

export default function HomePage() {
    return(
        <div className="w-full">
            <Header/>
            <div className="flex lg:mt-10">
            <LeftContent/>
            <Content/>
            <RightContent/>
            </div>
        </div>
    )
}