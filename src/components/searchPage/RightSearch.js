import MainContent from "../homePage/MainContent";
import SearchPeople from "../SearchPeople";

const RightSearch = ({searchValue})=>{
    return(
        <div className="w-[744px] h-full bg-gray-100 min-h-screen ml-[730px] mt-20">
            <div className="">
                <SearchPeople searchValue={searchValue}/>
            </div>
            <div className="">
            <MainContent searchValue={searchValue}/>
            </div>
        </div>
    )
}
export default RightSearch;