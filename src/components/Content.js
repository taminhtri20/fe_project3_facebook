import HeadContent from "./HeadContent";
import MainContent from "./MainContent";
import OpenModalPost from "./OpenModalPost";
import PostContent from "./PostContent";
import PostModal from "./PostModal";

const Content = ()=>{
    return(
        <div className="bg-gray-100 h-screen w-full lg:w-1/3 lg:mt-5 ml-auto mr-auto ">
            <HeadContent/> 
            {/* <PostContent/> */}
            <OpenModalPost/>
            {/* <PostModal/> */}
            <MainContent/> 
        </div>
    )
}
export default Content;