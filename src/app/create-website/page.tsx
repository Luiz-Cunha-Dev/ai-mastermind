"use client";
import styled from "styled-components";
import CommandBar from "@/components/commandBar";
import VerticalTabs from "@/components/verticalTabs";
import { useState } from "react";
import { createWebsite } from "@/utils/gemini/create-website";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "next/link";

export default function CreateWebsite() {
  const [button, setButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  async function getWebsite() {
    try {
      setHtml("");
      setCss("");
      setJs("");
      setButton(true);
      const response = await createWebsite(inputValue);
      console.log(response);

      if (response.HTMLs && response.HTMLs.length > 0) {
        const htmlFiles = response.HTMLs.map(
          (file: { name: string; content: string }, index: number) =>
            `<!-- HTML File ${index + 1} -->\n\n${file.content}`
        ).join("\n");
        setHtml(htmlFiles);
      }

      if (response.CSSs && response.CSSs.length > 0) {
        const cssFiles = response.CSSs.map(
          (file: { name: string; content: string }, index: number) =>
            `/* CSS File ${index + 1} */\n\n${file.content}`
        ).join("\n\n");
        setCss(cssFiles);
      }

      if (response.JSs && response.JSs.length > 0) {
        const jsFiles = response.JSs.map(
          (file: { name: string; content: string }, index: number) =>
            `// JS File ${index + 1}\n\n${file.content}`
        ).join("\n\n");
        setJs(jsFiles);
      }

      setButton(false);
    } catch (error) {
      alert("There was an error creating the website. Try again.");
      console.error("There was an error creating the website. Try again.", error);
      setButton(false);
    }
  }

  return (
    <Container>
      <Link href="/">
        <ReplyIcon className="back" />
      </Link>
      <h1>create-website</h1>
      <CommandBar
        placeholder="write what the website should look like"
        loading={button}
        buttonFunction={getWebsite}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {(html || css || js) && (
        <VerticalTabs labels={["HTML", "CSS", "JS"]}>
          <div className="file">{html}</div>
          <div className="file">{css}</div>
          <div className="file">{js}</div>
        </VerticalTabs>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  gap: 30px;
  .file {
    white-space: pre-wrap;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    max-height: 600px;
    min-width: 870px;
    margin: -22px;
  }
  .back {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 100px;
    left: 100px;
    cursor: pointer;
  }
`;
