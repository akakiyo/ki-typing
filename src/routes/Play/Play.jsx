import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import getQuestion from "../../utils/getQuestion";
import checkKey from "../../utils/checkKey";

const Play = () => {
  const questionLists = getQuestion();
  let rnd = Math.floor(Math.random() * questionLists.length);
  const [state, setState] = useState(0); //表示する画面の判別　0:Top 1:Secone 2:Result
  const [question, setQuestion] = useState(questionLists[rnd]); //表示する問題
  const [keyName, setKeyName] = useState(); //入力されたキーを格納
  const [correct_num, setCorrectNum] = useState(0); //正解数
  const [type_num, setTypeNum] = useState(0); //タイピング数
  const [question_num, setQuestionNum] = useState(10); //問題数
  const [start_time, setStartTime] = useState(); //ゲーム開始時間
  const [elapsed_time, setElapsedTime] = useState(); //経過時間

  //タイピングされた時の処理
  useEffect(() => {
    const handlClick = (e) => {
      if (!(e.key === "Shift" || e.key === "Alt" || e.key === "Meta")) {
        setKeyName(e.key);
        setTypeNum(() => type_num + 1);
      }
    };

    document.addEventListener("keydown", handlClick);

    let correct = checkKey(question, keyName);
    //正しい入力時の処理
    if (correct === true) {
      setKeyName(null);
      let rnd = Math.floor(Math.random() * questionLists.length);
      setQuestion(questionLists[rnd]);
      setCorrectNum(() => correct_num + 1);
      setQuestionNum(() => question_num - 1);
    }
    return () => {
      document.removeEventListener("keydown", handlClick);
    };
  }, [
    correct_num,
    question_num,
    keyName,
    question,
    type_num,
    state,
    questionLists,
  ]);
  return (
    <Wrapper>
      <Description>表示された数字または記号のキーを押してください</Description>
      <Question data-testid="question" id="question">
        {question}
      </Question>
      <BottomContent>
        <QuestionNum>問題数:{question_num}</QuestionNum>
        <AnswersNum>正解数:{correct_num}</AnswersNum>
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
