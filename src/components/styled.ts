import styled from "styled-components";

const Body = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  padding-bottom: 5rem;
`;

const Items = styled.div`
  display: flex;
  width: 60rem;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.6rem 0rem;
  margin-right: 1.5rem;
  margin-bottom: 2.4rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.5rem #5A5A5A;
`

const ActionItem = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0rem 0rem 0.1rem #5A5A5A;
  margin: 0.6rem 2.4rem;
  padding: 0.5rem 1rem;
`

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.4rem;

  & > .description{
    width: 100%;
  }
`
const TextInfo = styled.p`
  display:flex;
  width: 20rem;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0rem 0.5rem;
`;

const DateActions = styled(TextInfo)`
  margin: 0.6rem 2.4rem;
  padding: 0.5rem 1rem;
`

const TextDescription = styled(TextInfo)`
  display:flex;
  color: #504F51;
`;

const Control = styled.div`
  display: flex;
  margin-top: 1.2rem;
  margin-left: 12rem;
  justify-content: flex-end;
  flex-direction: row;
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  width: 6.8rem;
  height: 2rem;
  margin-right: 1rem;
  background-color: #007dff;
  color: #ffffff;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`


export const SComponents = { Body, Items, ActionItem, DateActions, ItemInfo, TextInfo, TextDescription, Control, Button };