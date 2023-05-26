import React from "react";
import style from "./Chat.module.css";
import { Text } from "@mantine/core";
import classNames from "classnames";

export function ChatMessage({ item }) {
  if (item.fromMe) {
    return (
      <div className={classNames(style.messageWrappMe, style.messageWrapp)}>
        <Text className={style.messageText} с={"while"}>
          {item.message}
        </Text>
        <Text с={"gray"} ml={8}>{item.time}</Text>
      </div>
    );
  }
  return (
    <div className={classNames(style.messageWrappTo, style.messageWrapp)}>
      <Text className={style.messageText} с={"black"}>
        {item.message}
      </Text>
      <Text с={"gray"} ml={8}>
        {item.time}
      </Text>
    </div>
  );
}
