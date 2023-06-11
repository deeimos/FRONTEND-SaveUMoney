import styled from "styled-components";

const Body = styled.div`
  font-family: 'Verdana';
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  border-right: 0.1rem solid #000000;
  box-shadow: 0rem 0rem 2rem #5A5A5A;
  position: fixed;
  letter-spacing: -0.1rem;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 5.5vw;
  background-color: #18171C;
  z-index:1;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  box-sizing: border-box;
  // justify-content: center;
  align-items: center;
  width: 100%;
  height: 6.2vh;
  background-color: #18171C;
  border-top: 0.15rem solid #5A5A5A;

  &:first-child{
    justify-content: center;
    padding: 0;
    border-top: none;
  }
  &:last-child{
    border-bottom: 0.15rem solid #5A5A5A;
  }

  &:hover{
    background-color: #5A5A5A;
  }

  & > a{
    all: unset;
    display:flex;
    align-items: center;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    // text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #D9D9D9;
    width: 100%;
    height: 100%;
    padding-left: 0.5rem;
  }
`

const Logout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6.2vh;
  border: none;
  background-color: #18171C;
  color: #D9D9D9;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  border-top: 0.15rem solid #5A5A5A;
  border-bottom: 0.15rem solid #5A5A5A;

  &:hover{
    background-color: #5A5A5A;
  }
`


export const S = { Body, Sidebar, Item, Logout };