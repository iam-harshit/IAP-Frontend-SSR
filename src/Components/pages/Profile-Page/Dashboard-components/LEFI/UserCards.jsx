import React from 'react';
import UserCard from '@/Components/pages/Profile-Page/Dashboard-components/LEFI/UserCard.jsx';


const UserCards = ({ users, rowsToShow }) => {
  return (
    <div className="user-cards">
      {users.slice(0, rowsToShow * 3).map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserCards;