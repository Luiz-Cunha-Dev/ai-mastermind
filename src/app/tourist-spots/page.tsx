"use client";
import styled from "styled-components";
import { touristSpots } from "@/utils/gemini/tourist-spots";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "next/link";
import CommandBarMultipleInputs from "@/components/commandBarMultipleInputs";
import { use, useEffect, useState } from "react";
import GeneralCard from "@/components/card";

type spot = {
  address: string;
  description: string;
  google_maps_link: string;
  latitude: number;
  longitude: number;
  name: string;
  imageUrl: string;
}

export default function TouristSpots() {
  const [button, setButton] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<spot[] | undefined>([]);

  const handleSubmit = async () => {
    try {
      setResult([])
      setButton(true);
      const response = await touristSpots(country, state, city);
      setResult(response);
      setButton(false);
    } catch (error) {
      alert("There was an error fetching the tourist spots. Try again.");
      console.error("There was an error fetching the tourist spots. Try again.", error);
      setButton(false);
    }
  };

  return (
    <Container>
      <Link href="/">
        <ReplyIcon className="back" />
      </Link>
      <h1>Tourist Spots</h1>
      <CommandBarMultipleInputs
        placeholder={["Country", "State", "City"]}
        loading={button}
        inputValue={[country, state, city]}
        setInputValue={[setCountry, setState, setCity]}
        buttonFunction={handleSubmit}
      />
      <div className="Cards">
        {result && result.map((spot, index) => (
          <GeneralCard key={index} title={spot.name} content={spot.description} imageUrl={spot.imageUrl} buttonLink={spot.google_maps_link} />
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
    max-height: 740px;
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
