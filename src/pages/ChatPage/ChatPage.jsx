import React, { useEffect, useState } from "react";
import style from "./ChatPage.module.css";
import { ChatItem, ChatMessage } from "components/Chat";
import { useParams } from "react-router-dom";
import { IconSend } from "@tabler/icons-react";
import { Text } from "@mantine/core";

const data = {
  items: [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/300",
      name: "Адам Кузгиев",
      message: "Привет, где моя картошка?",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/301",
      name: "Арби Мержоев",
      message: "Когда будет следующая поставка?",
    },
  ],
};

const messagesDataAdam = {
  user: {
    avatar: "https://i.pravatar.cc/300",
    name: "Адам Кузгиев",
  },
  messages: [
    {
      id: 1005,
      fromMe: false,
      time: "12:42",
      message: "Привет, где моя картошка?",
    },
    {
      id: 1006,
      fromMe: true,
      time: "12:45",
      message: "Скоро будет",
    },
  ],
};

const messagesDataArbi = {
  user: {
    avatar: "https://i.pravatar.cc/301",
    name: "Арби Мержоев",
  },
  messages: [
    {
      id: 1000,
      fromMe: false,
      time: "13:42",
      message: "Когда будет следующая поставка?",
    },
    {
      id: 1001,
      fromMe: true,
      time: "14:44",
      message: "В июне",
    },
  ],
};

export function ChatPage() {
  const id = useParams().id;
  const [messages, setMessages] = useState();
  const [messagesText, setMessagesText] = useState("");
  useEffect(() => {
    if (id === "1") {
      setMessages(messagesDataAdam);
    } else {
      setMessages(messagesDataArbi);
    }
  }, [id]);

  const handleSendMessage = () => {
    if (messagesText.length > 0) {
      setMessages({
        ...messages,
        messages: [
          ...messages.messages,
          {
            id: Date.now(),
            time: new Date(
              0,
              0,
              0,
              new Date().getHours(),
              new Date().getMinutes()
            )
              .toLocaleTimeString("ru")
              .substr(0, 5),
            fromMe: true,
            message: messagesText,
          },
        ],
      });
      setMessagesText("");
    }
  };

  const keyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey && messagesText.length > 0) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.keyCode === 13 && messagesText.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <div className={style.ChatWrapp}>
      <div className={style.ChatItemList}>
        {data.items.map((item) => {
          return <ChatItem key={item.id} item={item} />;
        })}
      </div>
      <div className={style.ChatMessagesWrapp}>
        <div className={style.ChatHeader}>
          <img
            src={messages?.user.avatar}
            alt="avatar"
            className={style.avatar}
          />
          <Text fz="lg" c={"black"} fw={600}>
            {messages?.user.name}
          </Text>
        </div>
        <div className={style.ChatMessages}>
          {messages?.messages
            .map((item) => {
              return <ChatMessage key={item.id} item={item} />;
            })
            .reverse()}
        </div>
        <div className={style.ChatInputBox}>
          <textarea
            type="text"
            className={style.textarea}
            placeholder="Начните печатать"
            onChange={(e) => setMessagesText(e.target.value)}
            onKeyDown={keyDown}
            value={messagesText}
          />
          <IconSend
            onClick={handleSendMessage}
            size={32}
            strokeWidth={2}
            className={style.sendIcon}
            color={"#194d19"}
          />
        </div>
      </div>
    </div>
  );
}
