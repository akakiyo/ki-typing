import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import getQuestion from "../../utils/getQuestion";
import checkKey from "../../utils/checkKey";

const Play = () => {
  const questionNum = 10;
  // const startTime = new Date();
  const questionLists = getQuestion();
  let rnd = Math.floor(Math.random() * questionLists.length);
  const [question, setQuestion] = useState(questionLists[rnd]); //表示する問題
  const [keyName, setKeyName] = useState(); //入力されたキーを格納
  const [correctTypeNum, setCorrectTypeNum] = useState(0); //ミスタイプ数
  const [typeNum, setTypeNum] = useState(0); //タイピング数
  // const [questionNum, setQuestionNum] = useState(10); //問題数
  const [startTime, setStartTime] = useState(new Date()); //ゲーム開始時間
  const missTypeNum = typeNum - correctTypeNum;

  //タイピングされた時の処理
  useEffect(() => {
    const handlClick = (e) => {
      if (!(e.key === "Shift" || e.key === "Alt" || e.key === "Meta")) {
        setKeyName(e.key);
        setTypeNum(() => typeNum + 1);
      }
    };

    document.addEventListener("keydown", handlClick);

    let correct = checkKey(question, keyName);
    //正しい入力時の処理
    if (correct === true) {
      setKeyName(null);
      let rnd = Math.floor(Math.random() * questionLists.length);
      setQuestion(questionLists[rnd]);
      setCorrectTypeNum(() => correctTypeNum + 1);
    }
    return () => {
      document.removeEventListener("keydown", handlClick);
    };
  }, [questionNum, keyName, question, typeNum, questionLists, correctTypeNum]);

  if (correctTypeNum === 10) {
    const end_time = new Date();
    const elapsedTime = end_time.getTime() - startTime.getTime();
    return (
      <Navigate
        to="/result"
        state={{ elapsedTime, missTypeNum, typeNum, questionNum }}
      />
    );
  }
  return (
    <Wrapper>
      <Description>表示された数字または記号のキーを押してください</Description>
      <Question data-testid="question" id="question">
        {question}
      </Question>
      <BottomContent>
        <QuestionNum>問題数:{questionNum - correctTypeNum}</QuestionNum>
        <AnswersNum>ミスタイプ数:{missTypeNum}</AnswersNum>
        <Link to="/">
          <BackButton>タイトルに戻る</BackButton>
        </Link>
      </BottomContent>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const Description = styled.div`
  color: white;
`;
const Question = styled.div`
  padding: 100px;
  color: #ffffff;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 72px;
  line-height: 84px;
  letter-spacing: 0.1em;
`;
const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 100px;
  padding-right: 100px;
`;
const QuestionNum = styled.div`
  color: #ffffff;
`;
const AnswersNum = styled.div`
  color: #ffffff;
`;
const BackButton = styled.button`
  height: 54px;
  width: 169px;
  border-radius: 40px;
  border: none;
  color: #fffcfc;
  background: #16c4fd;
`;
export default Play;
