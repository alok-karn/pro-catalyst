import React,{useEffect, useState} from 'react'
import { AiOutlineMessage } from 'react-icons/ai';
import ChatBox from '../components/ChatBox';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { useSpring, animated } from 'react-spring';
import Slide from 'react-reveal/Fade';


const HomePage = () => {
    const [showChat, setShowChat] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let typingTime;

        const handleTyping = () => {
            setIsTyping(true);

            clearTimeout(typingTime);

            typingTime = setTimeout(() => {
                setIsTyping(false);
                setShowChat(false);
            }, 30000);
        }

        document.addEventListener('keydown', handleTyping);

        return () => {
            document.removeEventListener('keydown', handleTyping);
            clearTimeout(typingTime);
        }
    }, []);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    const springProps = useSpring({
        // opacity: 1,
        // from: { opacity: 0 }, 
        from: { transform: 'translate3d(0, -100%, 0)', opacity: 0 },
        to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
 
    })

  return (
      <Container className="container">
          <div className="up-part">
              
                  <animated.h1 className="headline" style={springProps}>
                      <Slide top>
                          <span>ProCatalyst</span>
                     </Slide>
                  </animated.h1>
              
              <Slide left delay={500}>
                  <SloganLine className="slogan" >
                     Come on' BRO, Kuch toh karo !!!
                  </SloganLine>
              </Slide>
          </div>
          <div className="down-part">
              <ChatButton className={`chat-icon ${isTyping ? 'typing' : ''}`} onClick={toggleChat}>
                  <ChatIcon />
              </ChatButton>
              <CSSTransition
                  in={showChat}
                  timeout={300}
                  classNames="chatBox"
                  unmountOnExit
              >
                  <ChatBox />
              </CSSTransition>
            </div>
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .up-part {
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: column;
        column-gap: 20px;
        justify-content: center;
        align-items: center;
        background-color: #00B9AE;
    }

    .headline {
        font-size: 5rem;
        color: #f5f5f5;
        margin-bottom: 20px;
    }

    .headline span {
        display: inline-block;
    }

    .slogan {
        font-size:1.5rem;
        color: #f5f5f5;
    }

    .down-part {
        height: 50%;
        width: 100%;
        background-color: #02c3bd;
    }

`

const ChatButton = styled.button`
    position: fixed;
    display: flex;
    bottom: 20px;
    right: 20px;
    background-color: #fff;
    border:none;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #f1f1f1;
    }
    &.typing {
        background-color: #f1f1f1;
    }
`

const ChatIcon = styled(AiOutlineMessage)`
    font-size: 1.5rem;
    color: #02c3bd;
`

const SloganLine = styled(animated.div)`
    overflow:hidden;
    white-space: nowrap;
`


export default HomePage