import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: #f17816;
`;
const Body = styled.div`
  height: 450px;
  width: 900px;
  border-radius: 20px;
  margin: 30px auto auto auto;
  background: #4a4a4a;
  padding-top: 100px;
  text-align: center;
`;

export default Layout;
