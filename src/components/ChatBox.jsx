import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 999;
`;

const Header = styled.div`
  padding: 10px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const Main = styled.div`
  height: calc(100% - 120px);
  padding: 10px;
  overflow-y: scroll;
  background-color: #fff;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageText = styled.p`
  background-color: #eaf6ec;
  padding: 10px;
  border-radius: 5px;
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  border: none;
  background-color: #0078d7;
  color: #fff;
  border-radius: 5px;
  padding: 7px;
  cursor: pointer;
`;

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Load chat history or initialize with empty array
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (savedMessages) {
      setMessages(savedMessages);
    } else {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    // Save chat messages to local storage
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: new Date().getTime(),
        text: inputText,
        sender: 'User1',
        timestamp: new Date().toLocaleString()
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
    }
  };

  const handleDeleteChat = () => {
    setMessages([]);
  };

  return (
    <Container>
      <Header>
        <Title>User1 - User2 Chat</Title>
      </Header>
      <Main>
        {messages.map((message) => (
          <MessageContainer key={message.id}>
            <UserProfileImage src="user1-profile-image.jpg" alt="User1 Profile" />
            <MessageContent>
              <MessageText>{message.text}</MessageText>
              <p>{message.timestamp}</p>
            </MessageContent>
          </MessageContainer>
        ))}
      </Main>
      <InputContainer>
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </Container>
  );
};

export default ChatBox;
