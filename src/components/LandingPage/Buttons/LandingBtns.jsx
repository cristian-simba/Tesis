import React from "react";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export function DowloadButton({ text }) {
  const handleClick = () => {
    window.location.href = 'https://expo.dev/artifacts/eas/dC3MUqU5RNEqLJB62CQ6ra.apk';
  };

  return (
    <Button
      radius="none"
      size={{ md: "3", lg: "4" }}
      className="hover:cursor-pointer"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}

export function InvitateButton({ text }) {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/ideas");
    console.log("navegar");
  };

  return (
    <Button
      color="gray"
      variant="soft"
      radius="none"
      onClick={() => onSubmit()}
      size={{ md: "3", lg: "4" }}
      className="hover:cursor-pointer"
    >
      {text}
    </Button>
  );
}
