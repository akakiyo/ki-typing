import React from "react";
import { render, screen } from "@testing-library/react";
import Top from "./Top";

describe("Top", () => {
  test("画面の表示", () => {
    render(<Top />);
    screen.getByText(/数字・記号専用のタイピング練習ゲーム/);
  });
});
