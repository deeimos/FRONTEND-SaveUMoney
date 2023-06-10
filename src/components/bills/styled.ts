import styled from "styled-components";
import { SComponents } from "../styled";

const Body = styled(SComponents.Body)`
  display: flex;
  
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0rem 20rem;
  padding-left: 15rem;
  
  &:after {
    content: "";
    flex: 0 0 30%;
    padding: 1.6rem 0rem;
    margin-right: 1.5rem;
    margin-bottom: 2.4rem;
  }
`;

const Item = styled(SComponents.Items)`
  display: flex;
  flex-basis: 30%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.6rem 0rem;
  flex-direction: column;
  margin-right: 1.5rem;
  margin-bottom: 2.4rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.5rem #5A5A5A;
`;

const TextInfo = styled.p`
  display:flex;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0.5rem;
`;
const Description = styled(TextInfo)`
  display: flex;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0.5rem;
  color: #504F51;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 1.2rem 0;
`
const Control = styled.div`
  display: flex;
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
  margin-right: 0.8rem;
  background-color: #007dff;
  color: #ffffff;

  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`



export const S = { Body, Item, ItemInfo, Control, Button, TextInfo, Description};