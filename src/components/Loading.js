import styled from "styled-components";

const getSize = ({ size }) => (size ? size : "46px");
const getColor = ({ theme, color }) => (color ? color : theme.colors.fg.accent);

const Loading = styled.div`
  display: block;
  margin: 0 auto;

  &::after {
    content: " ";
    display: block;
    width: ${props => getSize(props)};
    height: ${props => getSize(props)};
    margin: 1px auto;
    border-radius: 50%;
    border: 5px solid;
    border-color: ${props =>
      `${getColor(props)} transparent
       ${getColor(props)} transparent`};
    animation: ring 1.2s linear infinite;
  }

  @keyframes ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
