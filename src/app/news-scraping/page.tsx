"use client";
import styled from "styled-components";
import { getSummaryOfNews } from "@/utils/gemini/news-scraping";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "next/link";
import CommandBar from "@/components/commandBar";
import { useState } from "react";
import GeneralCard from "@/components/card";

type news ={
  title: string;
  content: string;
  link: string;
  summary: string;
  imageUrl: string;
}

export default function NewsScraping() {
  const [button, setButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<news[] | undefined>([]);

  async function handleScraping() {
    try {
      setResult([])
      setButton(true);
      const response = await getSummaryOfNews(inputValue);
      console.log(response);
      setResult(response);
      setButton(false);
    } catch (error) {
      console.error("There was an error fetching the news. Try again.", error);
      setButton(false);
    }
  }

  return (
    <Container>
      <Link href="/">
        <ReplyIcon className="back" />
      </Link>
      <h1>news-scraping</h1>
      <CommandBar
        placeholder="Enter the topic you want to search for"
        loading={button}
        buttonFunction={handleScraping}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div className="Cards">
      {result &&
        result.map((news, index) => (
          <GeneralCard
            key={index}
            title={news.title}
            content={news.summary}
            imageUrl={news.imageUrl}
            buttonLink={news.link}
          />
        ))}
      </div>
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
  .Cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    max-height: 700px;
    width: 1580px;
    overflow-y: auto;
    //alterar a barra de rolagem
    scrollbar-width: thin;
    scrollbar-color: #888 #f5f5f5;
    &::-webkit-scrollbar {
      width: 12px;
    }
  }
`;
