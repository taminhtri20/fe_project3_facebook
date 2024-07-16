import MainContent from "../homePage/MainContent";
import OpenModalPost from "../OpenModalPost";

const RightProfile = ({id}) =>{
    return(
        <div>
            <div>
                <OpenModalPost/>
            </div>
            <div>
                <MainContent id={`${id}`}/>
            </div>
        </div>
    )   
}
export default RightProfile;