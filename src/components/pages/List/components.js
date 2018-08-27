import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
`;

const Address = styled.span`
  color: ${({ theme }) => theme.colors.fg.accent};
`;

const FilesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const File = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export { Container, Title, Address, FilesContainer, File };
