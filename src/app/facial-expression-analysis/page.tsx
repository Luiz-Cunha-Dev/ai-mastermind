"use client";
import { facialExpressionAnalysis } from "@/utils/gemini/facial-expression-analysis";
import styled from "styled-components";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "next/link";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

type people = {
  people: [
    {
      gender: string;
      age: number;
      expression: string;
    }
  ];
};

export default function FacialExpressionAnalysis() {
  const [button, setButton] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<people | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        setFile(file);
        setImageSrc(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnalyze = async () => {
    if (file) {
      try {
        setButton(true);
        const result = await facialExpressionAnalysis(file);
        console.log(result);
        setResult(result);
        setButton(false);
      } catch (error) {
        alert("There was an error analyzing the image. Try again.");
        console.error(error);
        setButton(false);
      }
    }
  };

  return (
    <Container>
      <Link href="/">
        <ReplyIcon className="back" />
      </Link>
      <h1>facial-expression-analysis</h1>
      <input max="1" type="file" accept="image/*" onChange={handleFileChange} />
      <Button
        onClick={handleAnalyze}
        color="primary"
        variant="contained"
        endIcon={<SendIcon />}
      >
        {button ? "Loading..." : "Analyze"}
      </Button>
      {imageSrc && (
        <img className="selectedImage" src={imageSrc} alt="Preview" />
      )}
      {result && (
        <div className="result">
          <h2>Result</h2>
          <p>
            <span>Number of people: {result.people.length}  -</span>
            <span>
              -  Number of Men: {result.people.filter((person) => person.gender === "male").length}  -
            </span>
            <span>
             -  Number of Women: {result.people.filter((person) => person.gender === "female").length}
            </span>
          </p>
          <br />
          <div className="resultList">
          {result.people.map(
            (
              person: {
                gender: string;
                age: number;
                expression: string;
              },
              index
            ) => (
              <span key={index}>
                <h3>
                  {person.gender} Number {index + 1}:
                </h3>
                <p>Age: {person.age}</p>
                <p>Expression: {person.expression}</p>
              </span>
            )
          )}
          </div>
        </div>
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
  .back {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 100px;
    left: 100px;
    cursor: pointer;
  }
  .selectedImage {
    max-width: 200px;
  }
  .resultList{
    display: flex;
    gap: 20px;
    max-width: 1000px;
    flex-wrap: wrap;
    max-height: 310px;
    overflow-y: auto;
    span{
      padding: 10px;
      border: 2px solid white;
      border-radius: 5px;
    }
  }
`;
