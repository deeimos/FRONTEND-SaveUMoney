import styled from "styled-components";

const Body = styled.div`
  font-family: 'Verdana';
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
`

const RegContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.5rem #5A5A5A;
  padding: 1.8rem 3.2rem;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.5rem #5A5A5A;
  padding: 1.8rem 3.2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  width: 12.4rem;
  height: 2rem;
  background-color: #007dff;
  color: #ffffff;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const S = { Body, RegContent, LoginContent, Button }