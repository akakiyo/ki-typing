import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
// import { gql } from "apollo-boost";
// import { useQuery } from "@apollo/react-hooks";

// export const GET_RESULT_QUERY = gql`
//     query Reuslt($correct_num: Int, $type_num: Int, $elapsed_time: Float) {
//         result(CorrectNum: $correct_num, TypeNum: $type_num, ElappsedTime: $elapsed_time){
//             AverageNum
//             CorrectRate
//             MissNum
//         }
//     }
// `;

const Result = (props) => {
  const location = useLocation();
  const { elapsedTime, missTypeNum, typeNum, questionNum } = location.state;
  //   const { loading, error, data } = useQuery(GET_RESULT_QUERY, {
  //     variables: { correct_num, type_num, elapsed_time },
  //   });

  //経過時間
  let m, s, ms, second, minute;
  s = Math.floor(elapsedTime / 1000);
  m = Math.floor(s / 60);
  ms = ("00" + (elapsedTime % 6000)).slice(-3).slice(0, 2);
  second = ("00" + s).slice(-2);
  minute = ("00" + m).slice(-2);
  const averageNum = Math.round((questionNum / s) * 10) / 10;
  const correctRate = Math.round((questionNum / typeNum) * 100 * 10) / 10;

  //   if (loading) {
  //     return <Loading>Loading...</Loading>;
  //   }
  //   if (error) {
  //     console.log(error);
  //     return <Error>Error...</Error>;
  //   }

  //   if (data.result.AverageNum !== null) {
  //     console.log(data);
  //     //平均キータイプ数
  //     average_num = data.result.AverageNum.toFixed(1);
  //     //ミスタイプ数
  //     miss_num = data.result.MissNum;
  //     //正解率
  //     correct_rate = data.result.CorrectRate.toFixed(2);
  //   }

  return (
    <>
      <Title>結果</Title>
      <Wrapper>
        <PlayResult>
          <ResultList>
            ・経過時間:
            <Value>
              {minute}:{second}:{ms}
            </Value>
          </ResultList>
          <ResultList>
            ・問題数:<Value>{questionNum}</Value>
          </ResultList>
          <ResultList>
            ・平均キータイプ数:<Value>{averageNum}</Value>回/秒
          </ResultList>
          <ResultList>
            ・ミスタイプ数:<Value>{missTypeNum}</Value>
          </ResultList>
          <ResultList>
            ・正解率:<Value>{correctRate}</Value>%
          </ResultList>
        </PlayResult>
        <Link to={"/"}>
          <BackButton>タイトルに戻る</BackButton>
        </Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  color: #ffffff;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 72px;
  line-height: 84px;
  letter-spacing: 0.1em;
  text-align: center;
`;
const PlayResult = styled.div`
  padding-left: 150px;
  text-align: left;
`;
const ResultList = styled.div`
  margin-top: 20px;
  color: #ffffff;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1em;
`;
const Value = styled.div`
  display: inline-block;
  color: #16c4fd;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
`;
const BackButton = styled.button`
  width: 169px;
  height: 54px;
  color: #fffcfc;
  border-radius: 40px;
  background: #16c4fd;
  margin-right: 100px;
  margin-top: 250px;
  border: none;
`;

const Loading = styled.h3`
  position: relative;
  text-align: center;
`;
const Error = styled.h3`
  position: relative;
  text-align: center;
`;
export default Result;
