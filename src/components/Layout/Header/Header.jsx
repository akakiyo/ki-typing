import styled from "styled-components";

const Header = () => (
  <Wrapper>
    <Title>ki-typing</Title>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #ffbf5d;
`;
const Title = styled.div`
  width: 100%;
  color: #ffffff;
  line-height: 112px;
  letter-spacing: 0.1em;
  text-align: center;
  font-size: 80px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
`;
export default Header;
