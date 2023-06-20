import styled from "styled-components";

const Header = styled.p`
  display:flex;
  justify-content: center;
  width: 20rem;
  width: 20rem;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0rem 0.5rem;
  margin-bottom: 1rem;

  & + .login__form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & + .login__form > input{
    display: flex;
    margin-top: 1.2rem;
    height: 2rem;
    width: 16.8rem;
    font-size: 1rem;
    line-height: 1.2rem;
    padding: 0.2rem 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #D9D9D9;
    font-color: #000000;
  }
  
  & + .login__form > button{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0.5rem;
    width: 16.8rem;
    height: 2rem;
    margin-top: 1.2rem;
    background-color: #007dff;
    color: #ffffff;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const Error = styled.div`
  color: red;
`


export const S = { Header, Error};