
import React from 'react';
import { act, render,screen } from '@testing-library/react';
import Result,{GET_RESULT_QUERY} from './Result';
import { MockedProvider } from '@apollo/client/testing';
import { getRandomeNum } from '../../../../../../Go/testFunc/getRandomNum'
import { getAverageNum } from '../../../../../../Go/testFunc/getAverageNum'
import { getCorrectRate } from '../../../../../../Go/testFunc/getCorrectRate'
import { getMissNum } from '../../../../../../Go/testFunc/getMissNum'
import { getTime } from '../../../../../../Go/testFunc/getTime';


describe('Result', () => {
    const question_num = 10;
    const correct_num =10;
    test('固定値を用いてテスト', async() => {//希望値　=>　average_num:0.3,correct_rate:31.25,miss_num:22
      const type_num = 32;
      const elapsed_time = 38824;

      const average_num = getAverageNum(question_num,elapsed_time);
      const correct_rate = getCorrectRate(question_num,type_num);
      console.log(average_num);
      const miss_num = getMissNum(question_num,type_num);
      const result_mocks = [
        {
          request: {
            query: GET_RESULT_QUERY,
              variables:{
                correct_num: correct_num,
                type_num: type_num,
                elapsed_time: elapsed_time,
              }
          },
          result: {
            data: {
              result:{
                AverageNum: average_num,
                CorrectRate: correct_rate,
                MissNum: miss_num,
             },
            },
          },
        },
      ];
      const ChangeState = jest.fn();
      render(<MockedProvider mocks={result_mocks} addTypename={false} ><Result ChangeState={ChangeState} elapsed_time={elapsed_time}  correct_num={correct_num} type_num={type_num}/></MockedProvider>)
        await  act (async()=>{
            await new Promise(resolve => setTimeout(resolve, 0));
          }) 
        screen.getByText(/結果/);  

        screen.getByText(/・経過時間:/);
        screen.getByText('00:38:82'); 

        screen.getByText(/・正しく打ったキーの数:/);
        screen.getByText(10);

        screen.getByText(/・平均キータイプ数:/);
        screen.getByText(0.3);
        screen.getByText(/回\/秒/);

        screen.getByText(/・ミスタイプ数:/);
        screen.getByText(22);

        screen.getByText(/・正解率:/);
        screen.getByText(31.25);
        screen.getByText(/%/);
    })

    test('ランダムな値を用いてテスト', async() => {
      const res_randome_num = getRandomeNum();
      console.log(res_randome_num);
      const type_num = res_randome_num.type_num;
      const elapsed_time = res_randome_num.elapsed_time;

      const res_time = getTime(elapsed_time);
      const ms = res_time.ms;
      const second = res_time.second;
      const minute = res_time.minute;
      

      const average_num = getAverageNum(question_num,elapsed_time);
      const correct_rate = getCorrectRate(question_num,type_num);
      const miss_num = getMissNum(question_num,type_num);
      const result_mocks = [
        {
          request: {
            query: GET_RESULT_QUERY,
              variables:{
                correct_num: correct_num,
                type_num: type_num,
                elapsed_time: elapsed_time,
              }
          },
          result: {
            data: {
              result:{
                AverageNum: average_num,
                CorrectRate: correct_rate,
                MissNum: miss_num,
             },
            },
          },
        },
      ];
      const ChangeState = jest.fn();
      render(<MockedProvider mocks={result_mocks} addTypename={false} ><Result ChangeState={ChangeState} elapsed_time={elapsed_time}  correct_num={correct_num} type_num={type_num}/></MockedProvider>)
        await  act (async()=>{
            await new Promise(resolve => setTimeout(resolve, 0));
          }) 
        screen.getByText(/結果/);  

        screen.getByText(/・経過時間:/);
        screen.getByText(minute+':'+second+':'+ms); 

        screen.getByText(/・正しく打ったキーの数:/);
        screen.getByText(question_num);

        screen.getByText(/・平均キータイプ数:/);
        screen.getByText(average_num.toFixed(1));
        screen.getByText(/回\/秒/);

        screen.getByText(/・ミスタイプ数:/);
        screen.getByText(miss_num);

        screen.getByText(/・正解率:/);
        screen.getByText(correct_rate.toFixed(2));
        screen.getByText(/%/);
    })
    
})
