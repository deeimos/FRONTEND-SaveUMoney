import styled from "styled-components";

const Body = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 1.5rem;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  flex-basis: 40%;
  align-self: flex-start;
  justify-content: space-between;
  width: 20rem;
  flex-direction: column;
  margin-right: 1.5rem;
  margin-bottom: 2.4rem;
`

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  margin-bottom: 1.2rem;
`

const ItemConst = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis
`

const ItemValue = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis
`
const Control = styled.div`
  display: flex;
  justify-content: space-evenly;
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
  background-color: #007dff;
  color: #ffffff;
`


export const SComponents = { Body, Item, ItemInfo, ItemConst, ItemValue, Control, Button };