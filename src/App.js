import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Top from "./routes/Top";
import Play from "./routes/Play";
import Result from "./routes/Result";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Top />} />
        <Route exact path="/play" element={<Play />} />
        <Route exact path="/result" element={<Result />} />
      </Routes>
    </Layout>
  );
}

export default App;
