import React from "react";
import { Button } from "@radix-ui/themes";
import { useNavigate, Link } from "react-router-dom";

export function DowloadButton({ text }) {
  return (
    <Link to={'https://drive.google.com/file/d/1GL4NtgBbd3mmh5aETr6mwtVZQyHSsNUp/view?usp=sharing'}
      target="_blank">
      <Button
        radius="none"
        size={{ md: "3", lg: "4" }}
        className="hover:cursor-pointer"
        >
        {text}
      </Button>
    </Link>
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
