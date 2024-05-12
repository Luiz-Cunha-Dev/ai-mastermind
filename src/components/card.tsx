import React from "react";
import {
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import styled from "styled-components";

interface CardProps {
  imageUrl: string;
  title: string;
  content: string;
  buttonLink: string;
}

const Card = styled(MuiCard)`
  width: 500px;
  height: 360px;
  .image{
    object-fit: cover;
    height: 180px;
  }
  .body{
    height: 140px;
    overflow: auto;
    //alterar a barra de rolagem
    scrollbar-width: thin;
    scrollbar-color: #888 #f5f5f5;
    &::-webkit-scrollbar {
      width: 12px;
    }
  }
`;

const GeneralCard: React.FC<CardProps> = ({
  imageUrl,
  title,
  content,
  buttonLink,
}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia className="image" component="img" height="140" image={imageUrl} alt={title} />
        <CardContent className="body">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={buttonLink} target="_blank">
            Open
        </Button>
      </CardActions>
    </Card>
  );
};

export default GeneralCard;
