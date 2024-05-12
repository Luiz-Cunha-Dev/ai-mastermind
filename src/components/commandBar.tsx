import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send"
import { Spinner } from '@chakra-ui/react'

export default function CommandBar(props: { placeholder: string, loading: boolean, buttonFunction: () => void, inputValue: string, setInputValue?: (value: string) => void}) {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      props.buttonFunction();
    }
  }

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 800 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={props.placeholder}
        inputProps={{ "aria-label": "search google maps" }}
        value={props.inputValue}
        onChange={(e) => props.setInputValue && props.setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton disabled={props.loading}  type="button" sx={{ p: "10px" }}  aria-label="send">
        {props.loading ? <Spinner width="24px" height="24px" onClick={props.buttonFunction} size='md'  /> : <SendIcon onClick={props.buttonFunction} />}
      </IconButton>
    </Paper>
  );
}
