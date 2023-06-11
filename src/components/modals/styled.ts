import styled from "styled-components";

const Modal = styled.div`
  font-family: 'Verdana';
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.4);
  position fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
`;

const ModalContent = styled.div`
  z-index: 9999;
  width: 10rem;
  height: 10rem;
  padding: 2rem;
  border-radius: 1.2rem;
  background-color: white;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance:textfield; /* Firefox */
  }
}
`;

const Header = styled.p`
`;

export const SModal = { Modal, ModalContent, Header };