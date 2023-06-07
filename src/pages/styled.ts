import styled from "styled-components";

const Content = styled.div`
  display: flex;
  position:fixed;
  top: 0rem;
  left: 5vw;
  min-height: 100%;
  width: 95vw;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #D9D9D9;
`;

const Header = styled.h1`
  display: flex;
  width: 100%;
  margin: 0;
  margin-top: 1.6rem;
  margin-left: 1.6rem;
  margin-bottom: 2rem;
`

const Body = styled.div`
  display: flex;
  postion: relative;
  justify-content: center;
  flex-direction: column;
`

const Button = styled.button`
  display: flex;
  position: fixed;
  bottom: 5.6rem;
  right: 15.6rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3.2rem;
  width: 10.8rem;
  height: 3.2rem;
  background-color: rgb(0, 125, 255);
  color: #FFFFFF;
  z-index: -1;  
`
export const SPage = { Content, Header, Body, Button }