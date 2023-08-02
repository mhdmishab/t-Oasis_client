import React, { useState } from 'react';
import ChatBox from './ChatBox';
import Conversations from './Conversations.jsx';

const Chat = () => {
  const [user, setUser] = useState(null);
  const vendorToken = localStorage.getItem('vendorToken');
    const parsedVendorToken = JSON.parse(vendorToken);
    const vendorId = parsedVendorToken?.vendorId;

  return (
    <>
          <div className="flex flex-col sm:flex-row gap-4">
  <div className="w-full sm:w-1/3">
    <div className="h-full bg-white rounded-lg shadow-md">
      <div className="border-b">
        <ul className="flex">
          <li className="w-full py-2 text-center cursor-pointer text-green-500 border-b-2 border-green-500">
            Chats
          </li>
        </ul>
      </div>
      <Conversations setUser={setUser} vendorId={vendorId} />
    </div>
  </div>
  <div className="flex-1">
    {user && <ChatBox userId={user} vendorId={vendorId} />}
  </div>
</div>


    </>
  );
};

export default Chat;

