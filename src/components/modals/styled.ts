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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // width: 20rem;
  // height: 10rem;
  padding: 2rem;
  border-radius: 1.2rem;
  background-color: white;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }
}
`;

const Header = styled.p`
  display:flex;
  justify-content: center;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0rem 0.5rem;
  margin-bottom: 1rem;
`;

const UploadModal = styled(ModalContent)`
& > .upload__form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

& > .upload__form > input,
& > .upload__form > select{
  display: flex;
  margin-top: 1.2rem;
  height: 2rem;
  font-size: 1rem;
  line-height: 1.2rem;
  padding: 0.2rem 0.5rem;
  width: 16.8rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #D9D9D9;
  font-color: #000000;
}

& > .upload__form > select{
  width: 100%;
}
`
const Control = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.2rem;
  justify-content: space-between;
  flex-direction: row;
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  width: 7.8rem;
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
`

const Error = styled.div`
  color: red;
`
const HeaderInfoModal = styled(Header)`
  font-size: 1.2rem;
  line-height: 1.6rem;
`

const ControlInfoModal = styled(Control)`
  justify-content: space-evenly;
`

export const SModal = { Modal, ModalContent, Header, UploadModal, Control, Button, Error, HeaderInfoModal, ControlInfoModal};