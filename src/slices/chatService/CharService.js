import { message } from "antd";

export function useGetConversations() {


  const getConversations = () => {
    return fetch(`/vendor/chat-conversations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load chats');
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        message.error(error)
      });
  };

  return getConversations;
}

// get conversation messages based on
// to and from id's
export function useGetConversationMessages() {


  const getConversationMessages = (id) => {
    return fetch(`/vendor/chat-conversations/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load chats');
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        message.error(error)
      });
  };

  return getConversationMessages;
}

export function useSendConversationMessage() {


  const sendConversationMessage = (id, body) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: id, body: body }),
    };

    return fetch(`/vendor/chat-sendmessage/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not send message');
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        message.error(error)
      });
  };

  return sendConversationMessage;
}


export function useSendConversationMessageUser() {

  
    const sendConversationMessage = (id, body) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: id, body: body }),
      };
  
      return fetch(`/chat-sendmessage/${id}`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not send message');
          }
          return response.json();
        })
        .catch((error) => {
          console.error(error);
          message.error(error)
        });
    };
  
    return sendConversationMessage;
  }


  export function useGetConversationMessagesUser() {

  
    const getConversationMessages = (id) => {
      return fetch(`/chat-conversations/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not load chats');
          }
          return response.json();
        })
        .catch((error) => {
          console.error(error);
          message.error(error)
        });
    };
  
    return getConversationMessages;
  }



