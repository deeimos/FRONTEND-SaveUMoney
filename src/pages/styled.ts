import styled from "styled-components";

const Content = styled.div`
  display: flex;
  position:fixed;
  top: 0rem;
  left: 5vw;
  height: 100vh;
  width:  95%;
  box-sizing: border-box;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #D9D9D9;
`;

const Header = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 15vh;
  width: 75vw;
  padding-top: 1rem;
  padding-left: 5rem;
  background-color: #D9D9D9;
  z-index: 2;
`;

const Title = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 2.4rem;
  line-height: 3rem;
  text-align: left;
  letter-spacing: -0.1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Control = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  transform: translateX(-27vw);
  width: 15%;
  align-items: center;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3.2rem;
  width: 3.2rem;
  height: 1.2rem;
  background-color: rgb(0, 125, 255);
  color: #FFFFFF;
  z-index: 0;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ControlText = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: calc(100vh - 15vh);
  transform: translateY(20vh);
  padding-top: 1rem;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  overflow-y: auto;
  ::-webkit-scrollbar {
    height: 100%;
    width: 0.4rem;
    background: #ffffff;
    -webkit-border-radius: 1ex;
  }

  ::-webkit-scrollbar-thumb {
    background: #000000;
    -webkit-border-radius: 1ex;
  }

  & > *{
    flex-shrink: 0;
  }
`;

const Button = styled.button`
  display: flex;
  position: fixed;
  bottom: 7.6rem;
  right: 5rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3.2rem;
  width: 10.8rem;
  height: 3.2rem;
  background-color: rgb(0, 125, 255);
  color: #FFFFFF;
  z-index: 1;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.4rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;  
`;

export const SPage = { Content, Header, Title, Control, ControlButton, ControlText, Body, Button }