import styled from "styled-components";
import Dropzone from "react-dropzone";

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: inherit;
`;

const Title = styled.h1`
  font-size: 26px;

  & > svg {
    height: 26px;
    vertical-align: middle;
  }

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.fg.accent};
  }
`;

const SubTitle = styled.h2`
  font-size: 18px;
`;

const Inputs = Header.extend`
  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`;

Dropzone.Container = styled(Dropzone)`
  max-width: 400px;
  min-width: 200px;
  width: 100%;
  height: 150px;
  margin: 0 auto;
  border-radius: 6px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.bg.secondary};
`;

Dropzone.Area = styled.p`
  display: flex;
  padding: 20px;
  font-size: 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
  border: ${({ theme, isDragActive, isDragReject }) => {
    if (isDragReject) return "1px solid red";
    else if (isDragActive) return `1px solid ${theme.colors.fg.accent}`;
    else return "transparent";
  }};
`;

const Message = styled.p`
  max-width: 500px;
  min-width: 250px;
  border: ${({ theme }) => `1px solid ${theme.colors.fg.accent}`};
  padding: 30px;
  font-size: 18px;
`;

const Submit = styled.button.attrs({ type: "submit" })`
  background: ${({ theme }) => theme.colors.fg.accent};
  border: 2px solid transparent;
  color: ${({ theme }) => theme.colors.bg.default};
  width: 120px;
  font-size: 18px;
  font-weight: bold;
  height: 40px;
  cursor: ${({ disabled }) => !disabled && "pointer"};

  &:hover {
    opacity: ${({ disabled }) => !disabled && "0.8"};
  }
`;

export {
  Container,
  Header,
  Title,
  SubTitle,
  Inputs,
  Dropzone,
  Message,
  Submit
};
