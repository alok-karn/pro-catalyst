// import logo from './logo.svg';
import './App.css';
// import HomePage from './pages/HomePage';
<<<<<<< HEAD
// import TodoWindow from './components/TodoWindow';
import ChatBox from './components/ChatBox';
=======
import TodoWindow from './components/TodoWindow';
import GithubProgressTracker from './components/GithubProgressTracker';
>>>>>>> cc2b6bc81e52da1ecd34f05555289071dbc7da9a
import styled from 'styled-components';

function App() {
  return (
    <Container className="App">
      
      {/* <HomePage /> */}
      {/* <TodoWindow /> */}
<<<<<<< HEAD
      <ChatBox />
=======
      <GithubProgressTracker/>
>>>>>>> cc2b6bc81e52da1ecd34f05555289071dbc7da9a
    </Container>
  );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
  
`

export default App;
