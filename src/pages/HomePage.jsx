import React from 'react'
import styled from 'styled-components';

const HomePage = () => {
  return (
      <Container className="container">
          <div className="up-part">
              <h1>ProCatalyst</h1>
          </div>
            <div className="down-part"></div>
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
        justify-content: center;
        align-items: center;
        background-color: #f5f5f5;
    }

    .down-part {
        height: 50%;
        width: 100%;
        background-color: #f5f5f5;
    }

`

export default HomePage