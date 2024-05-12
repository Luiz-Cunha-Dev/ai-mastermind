"use client";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <h1>AI-Mastermind</h1>
      <Link href="/create-website">
        <Box>Create Website</Box>
      </Link>
      <Link href="/facial-expression-analysis">
        <Box>Facial Expression Analysis</Box>
      </Link>
      <Link href="/tourist-spots">
        <Box>Tourist Spots</Box>
      </Link>
      <Link href="/news-scraping">
        <Box>News Scraping</Box>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;
  position: relative;
  h1 {
    color: white;
    font-size: 50px;
    position: absolute;
    top: 50px;
  }
`;

const Box = styled.div`
  background-color: #1d1b20;
  width: 250px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 0px thin transparent;
  cursor: pointer;
  &:hover {
    background-color: #27242b;
  }
  color: white;
  text-align: center;
`;
