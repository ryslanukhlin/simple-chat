import React from 'react';
import FrendsPage from '../component/FrendsPage';
import SearchFrends from '../component/SearchFrends';

const Frends: React.FC = () => {
    return (
        <>
            <SearchFrends />
            <hr />
            <FrendsPage />
        </>
    );
};

export default Frends;
