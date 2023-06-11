import styled from "styled-components";
import { SComponents } from "../styled";

const Items = styled(SComponents.Items)`
display: flex;
width: 100rem;
max-height: 50rem;
box-sizing: border-box;
flex-direction: row;
justify-content: center;
padding: 0;
margin-right: 1.5rem;
margin-bottom: 5rem;
background-color: #ffffff;

& > .everyday__chart{
  width: 96rem;
}
`

const ItemWrapper = styled(SComponents.ActionItem)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 0;
  box-shadow: none;
  margin: 0;
  padding: 1.6rem;
  text-align: center;
  
  & > .everyday__chartWrapper{
    width: 96rem;
  }
`

const ChartWrapper = styled(SComponents.ActionItem)`
  display: flex;
  width: 40rem;
  height: 40rem;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 0;
  box-shadow: none;
  margin: 0;
  padding: 1.6rem;
  align-items: center;
`

const ChartTitle = styled(SComponents.DateActions)`
  display: flex;
  // align-self: center;
  height: 3.6rem;
  width:100%;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 3.6rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0rem 0.5rem;
`

export const S = { Items, ItemWrapper, ChartWrapper, ChartTitle };