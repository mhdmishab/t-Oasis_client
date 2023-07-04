import React from 'react';
import UserLoungeCard from './UserLoungeCard';

function SearchResults({ Lounges }) {
    console.log(Lounges,"search results")
  const filteredLounges = Lounges?.filter((lounge) => {
    return lounge.isBlocked === false && lounge.isApproved === 'approved';
  });
  console.log(filteredLounges,"search results")

  return (
    <div>
      {filteredLounges?.map((lounge) => {
        return <UserLoungeCard lounge={lounge} />;
      })}
    </div>
  );
}

export default SearchResults;
