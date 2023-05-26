import React, { useState, useEffect } from 'react';

const TodoWindow = () => {
  const [todoList, setTodoList] = useState([]);
  const [subListText, setSubListText] = useState('');
  const [resetTime, setResetTime] = useState(null);

  useEffect(() => {
    // Calculate the reset time 24 hours from now
    const now = new Date();
    const reset = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    setResetTime(reset);

    // Clear the todo list when reset time is reached
    const timer = setTimeout(() => {
      setTodoList([]);
      setResetTime(null);
    }, reset - now);

    return () => clearTimeout(timer);
  }, []);

  const handleAddSubList = () => {
    if (subListText.trim() !== '') {
      const updatedList = [...todoList, { text: subListText, subList: [] }];
      setTodoList(updatedList);
      setSubListText('');
    }
  };

  const handleAddTodo = (index) => {
    return (event) => {
      if (event.key === 'Enter' && event.target.value.trim() !== '') {
        const updatedList = [...todoList];
        updatedList[index].subList.push(event.target.value);
        setTodoList(updatedList);
        event.target.value = '';
      }
    };
  };

  return (
    <div>
      <h2>Todo Window</h2>
      {resetTime && (
        <p>
          This list will reset in: {Math.floor((resetTime - new Date()) / (1000 * 60 * 60))} hours
        </p>
      )}
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>
            {item.text}
            <ul>
              {item.subList.map((subItem, subIndex) => (
                <li key={subIndex}>{subItem}</li>
              ))}
              <li>
                <input
                  type="text"
                  placeholder="Add a todo..."
                  onKeyDown={handleAddTodo(index)}
                />
              </li>
            </ul>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add a sublist..."
          value={subListText}
          onChange={(e) => setSubListText(e.target.value)}
        />
        <button onClick={handleAddSubList}>Add Sublist</button>
      </div>
    </div>
  );
};

export default TodoWindow;
