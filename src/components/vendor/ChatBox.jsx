import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { GetConversationMessages, GetPrivateChatMessages } from '../../slices/vendor/ChatService';
import { useRef } from 'react';

function ChatBox({vendorId,userId,setUnread,setLastMessageStatus,lastMessageStatus}) {
    const dispatch=useDispatch();
    const [inputMessage, setInputMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [socketConnected,setSocketConnected]=useState(false);
    
  
    
  
    // useEffect to fetch messages (Replace this with your actual data fetching logic)
    
    const socketRef = useRef(null);
    const chatMessagesRef = useRef(null);

    
    useEffect(() => {

        const ENDPOINT = 'https://toasis.restinpillows.shop'; 
        // const ENDPOINT = 'http://localhost:5000';
        // socket = socketIOClient(ENDPOINT);
        socketRef.current = socketIOClient(ENDPOINT);
    
      if (userId) {
        // socket.emit('setup', userId);
        socketRef.current.emit('setup', vendorId);
      }
    //   socket.on('connected', () => setSocketConnected(true));
    socketRef.current.on('connected', () => setSocketConnected(true));
    
          dispatch(GetConversationMessages({vendorId,userId})).then((response)=>{
              // console.log(response?.payload?.data);
              const messages=response?.payload?.data;
              let chatId=response?.payload?.data[0].conversation;
            // socket.emit("join chat", chatId);
            socketRef.current.emit("join chat", chatId);
              const filteredMessages=messages?.map((message)=>{
                  if(message.vendorbody){
                     return message={
                          text: message.vendorbody.trim(),
                          sentBy: 'devlazar',
                          sentAt: parseInt(message.date, 10),
                          isChatOwner: true,
                      }
                  }else{
                      return message={
                          text: message.userbody.trim(),
                          sentBy: 'devlazar',
                          sentAt: parseInt(message.date, 10),
                          isChatOwner: false,
                      }
  
                  }
              })
              // console.log(filteredMessages);
              setChatMessages(filteredMessages)
          })
   
  
      return () => {
        // socket.disconnect();
        socketRef.current.disconnect();
      };
    }, [userId]);

    useEffect(() => {
        // Scroll to the bottom when component first renders
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }, [chatMessages,userId]);

    useEffect(() => {
        console.log("message recieved")

        // socket.on("message received", (newMessageRecieved) => {
        socketRef.current.on("message received", (newMessageRecieved) => {
          
          console.log("newMessageRecieved : ",newMessageRecieved)
          if ( !newMessageRecieved.recieverId ) {
            console.log("Something went wrong")
         }else{
            const newMessage = {
                text: newMessageRecieved.chat.trim(),
                sentBy: 'devlazar',
                sentAt: newMessageRecieved.date,
                isChatOwner: false,
              };
              setChatMessages((prevMessages) => [...prevMessages, newMessage]);
              setLastMessageStatus(true);
         }
        });
        
       
      },[]);
  
    // Handler for form submission
    const handleSubmit = async(e) => {

     
      const newMessage = {
          text: inputMessage.trim(),
          sentBy: 'devlazar',
          sentAt: new Date(),
          isChatOwner: true,
        };
  
      e.preventDefault();
      if (inputMessage.trim() !== '') {
          // const data=inputMessage.trim();
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        
        dispatch(GetPrivateChatMessages({vendorId,userId,data:inputMessage.trim()})).then((response)=>{
            console.log(response?.payload.data);
            let newMessage=response?.payload.data;
            // socket.emit("new message",newMessage);
            socketRef.current.emit("new message", newMessage);
        })
        setInputMessage('');
        setLastMessageStatus(true);
        
        
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-start min-h-[500px] sm:min-h-[500px] md:min-h-[500px] lg:min-h-[700px] xl:min-h-[700px]  text-gray-800">
        {/* Component Start */}
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto" ref={chatMessagesRef}>
            {chatMessages?.map((message, index) => (
              <div
                key={index}
                className={`flex w-full mt-2 space-x-3 max-w-xs ${
                  message?.isChatOwner ? 'ml-auto justify-end' : 'justify-start'
                }`}
              >
                {message?.isChatOwner ? (
                  <>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{message?.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {new Date(message?.sentAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{message?.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {new Date(message?.sentAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </>
                )}
              </div>
            ))}
          </div>
  
          <div className="bg-gray-300 p-4">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center">
                <input
                  className="flex-1 border rounded-md p-2 mr-2 text-sm"
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Component End  */}
      </div>
    );
  }

export default ChatBox

