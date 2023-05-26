// import logo from './logo.svg';
import './App.css';
// import HomePage from './pages/HomePage';

// import TodoWindow from './components/TodoWindow';
import ChatBox from './components/ChatBox';

import TodoWindow from './components/TodoWindow';
import GithubProgressTracker from './components/GithubProgressTracker';

import styled from 'styled-components';

function App() {
  return (
    <Container className="App">
      
      {/* <HomePage /> */}
      {/* <TodoWindow /> */}

      <ChatBox />

      {/* <GithubProgressTracker/> */}

    </Container>
  );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
  
`

export default App;
