import styled from "styled-components";
import { SPage } from "../styled";

const Button = styled(SPage.Button)`
  display: flex;
  position: fixed;
  bottom: 7.6rem;
  right: 5rem;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.4rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;  
`;

export const S = { Button };