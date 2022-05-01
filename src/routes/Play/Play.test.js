import React from "react";
import { render, screen } from "@testing-library/react";
import Play from "./Play";

describe("Play", () => {
  const correct_num = 0;
  const question_num = 10;
  const question = "k";
  const ChangeState = jest.fn();

  beforeEach(() => {});
  test("画面の表示", () => {
    render(<Play />);
    screen.getByText("表示された数字または記号のキーを押してください");
    screen.getByText(/k/);
  });
  test("問題数", () => {
    screen.getByText(/問題数:10/);
  });
  test("正解数", () => {
    screen.getByText(/正解数:0/);
  });
});
