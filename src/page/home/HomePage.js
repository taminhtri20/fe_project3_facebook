import Content from "../../components/Content";
import HeadContent from "../../components/HeadContent";
import Header from "../../components/Header";
import LeftContent from "../../components/LeftContent";
import RightContent from "../../components/RightContent";

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