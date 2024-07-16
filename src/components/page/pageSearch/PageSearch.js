import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import HeadSearch from '../../searchPage/HeadSearch';
import MainContent from '../../homePage/MainContent';
import LeftSearch from '../../searchPage/LeftSearch';
import RightSearch from '../../searchPage/RightSearch';
import Header from '../../homePage/Header';
import SearchPeople from '../../SearchPeople';

export default function PageSearch() {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('searchValue');
    return (
        <div className="bg-gray-200 h-full lg:h-screen">
            <div className="lg:hidden h-screen">
                <HeadSearch searchValue1={searchValue}/>
                <div>
                    <div className='md:mx-12 mt-5'>
                        <SearchPeople searchValue={searchValue}/>
                    </div>
                    <div>
                    <MainContent searchValue={searchValue}/>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block bg-gray-100">
                <Header searchValue={searchValue}/>
                <div className="flex">
                    <LeftSearch />
                    <RightSearch searchValue={searchValue}/>
                </div>
            </div>
        </div>
    );
}
