import React from "react";
import style from "./Chat.module.css";
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

export function ChatItem({ item, handleClick }) {
  return (
    <Link
      to={`/chats/chat/${item.id}`}
      className={style.ChatWrapp}
      onClick={handleClick && handleClick}
    >
      <img src={item.avatar} alt="Avatar" className={style.avatar} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ marginBottom: "5px" }} fz="lg" c={"black"} fw={700}>
          {item.name}
        </Text>
        <Text fz="md" className={style.message} c={"gray"}>
          {item.message}
        </Text>
      </div>
    </Link>
  );
}
