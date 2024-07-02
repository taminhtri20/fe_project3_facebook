import MainContent from "./MainContent";
import OpenModalPost from "./OpenModalPost";
import PostContent from "./PostContent";

const RightProfile = () =>{
    return(
        <div>
            <div>
                <OpenModalPost/>
            </div>
            <div>
                <MainContent/>
            </div>
        </div>
    )   
}
export default RightProfile;