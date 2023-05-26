import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiUserLine } from 'react-icons/ri';

const ChatBoxContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled(RiUserLine)`
  font-size: 24px;
  margin-right: 10px;
`;

const ConversationContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  position: relative;
  cursor: default;

  &:hover::after {
    content: attr(data-time);
    position: absolute;
    top: -2px;
    right: 0;
    background-color: #f2f2f2;
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
`;

const MessageProfileIcon = styled(ProfileIcon)`
  font-size: 18px;
  margin-right: 5px;
`;

const MessageContent = styled.div`
  background-color: #f2f2f2;
  padding: 8px;
  border-radius: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px;
`;

const InputField = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 2px solid #bdbcb9;
  border-radius: 10px;
  outline: none;
`;

const SendButton = styled.button`
  border: none;
  background-color: #0078d7;
  color: #fff;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
`;

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://your-websocket-server-url');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: new Date().getTime(),
        text: inputText,
        sender: 'User1',
        timestamp: new Date().toLocaleString(),
      };

      if (socket) {
        socket.send(JSON.stringify(newMessage));
      }

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
    }
  };

  return (
    <ChatBoxContainer>

      <Header>
        <ProfileIcon />
        <div>User1</div>
      </Header>
      <ConversationContainer>
        {messages.map((message) => (
          <Message key={message.id} data-time={message.timestamp}>
            <MessageProfileIcon />
            <MessageContent>{message.text}</MessageContent>
          </Message>
        ))}
      </ConversationContainer>
      <InputContainer>
        <InputField
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </ChatBoxContainer>
  );
};

export default ChatBox;
