import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai';

const Container = styled.div`
  font-family: 'Segoe UI';
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ResetInfo = styled.p`
  text-align: center;
  color: #888;
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const TodoItem = styled.li`
  background-color: ${({ completed }) => (completed ? '#EAF6EC' : '#f4f4f4')};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

const TaskText = styled.span`
  flex-grow: 1;
`;

const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 5px;
`;

const DoneIcon = styled(AiOutlineCheckCircle)`
  color: #2ecc71;
  font-size: 20px;
`;

const DeleteIcon = styled(AiOutlineDelete)`
  color: #e74c3c;
  font-size: 20px;
`;

const AddInput = styled.input`
  border: none;
  border-radius: 3px;
  padding: 5px;
  margin-right: 10px;
  flex-grow: 1;
`;

const AddButton = styled.button`
  border: none;
  background-color: #0078d7;
  color: #fff;
  border-radius: 3px;
  padding: 7px;
  cursor: pointer;
`;

const TodoWindow = () => {
  const [todoList, setTodoList] = useState([]);
  const [subListText, setSubListText] = useState('');
  const [resetTime, setResetTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Calculate the reset time 24 hours from now
    const now = new Date();
    const reset = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    setResetTime(reset);

    // Calculate initial time left
    const initialTimeLeft = reset - now;
    setTimeLeft(initialTimeLeft);

    // Update the time left every second
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
    }, 1000);

    // Clear the todo list when reset time is reached
    const resetTimer = setTimeout(() => {
      setTodoList([]);
      setResetTime(null);
      clearInterval(timer);
    }, initialTimeLeft);

    return () => {
      clearInterval(timer);
      clearTimeout(resetTimer);
    };
  }, []);

  const handleAddTodo = () => {
    if (subListText.trim() !== '') {
      const updatedList = [...todoList, { text: subListText, completed: false }];
      setTodoList(updatedList);
      setSubListText('');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;
    setTodoList(updatedList);
  };

  const handleDeleteTask = (index) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  return (
    <Container>
      <Title>Todo Window</Title>
      {resetTime && (
        <ResetInfo>
          This list will reset in:{' '}
          {Math.floor(timeLeft / (1000 * 60 * 60))} hours,{' '}
          {Math.floor((timeLeft / (1000 * 60)) % 60)} minutes,{' '}
          {Math.floor((timeLeft / 1000) % 60)} seconds
        </ResetInfo>
      )}
      <TodoList>
        {todoList.map((item, index) => (
          <TodoItem key={index} completed={item.completed}>
            <TaskText>{item.text}</TaskText>
            <ActionButton onClick={() => handleToggleComplete(index)}>
              <DoneIcon />
            </ActionButton>
            <ActionButton onClick={() => handleDeleteTask(index)}>
              <DeleteIcon />
            </ActionButton>
          </TodoItem>
        ))}
      </TodoList>
      <div>
        <AddInput
          type="text"
          placeholder="Add a task..."
          value={subListText}
          onChange={(e) => setSubListText(e.target.value)}
        />
        <AddButton onClick={handleAddTodo}>Add Task</AddButton>
      </div>
    </Container>
  );
};

export default TodoWindow;
