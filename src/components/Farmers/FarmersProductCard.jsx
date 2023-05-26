import React from "react";
import style from "./Farmers.module.css";
import { Text } from "@mantine/core";
import avatar from "assets/images/avatar.svg";

export function FarmersProductCard({ item, open, setCurrentItem }) {
  return (
    <div className={style.farmersCardWrapp}>
      {avatar ? (
        <img src={item.avatar} className={style.avatar} alt="Avatar" />
      ) : (
        <div className={style.avatar} alt="Avatar"></div>
      )}
      <div className={style.farmersBox}>
        <Text fw={600} fz="xl">
          {item.name}
        </Text>
        <Text fw={500} fz="md">
          {item.description}
        </Text>
        <Text fw={400} fz="md">
          {item.price}
        </Text>
        <button
          className={style.editButtonCard}
          onClick={() => {
            setCurrentItem(item);
            open();
          }}
        >
          Редактировать
        </button>
      </div>
    </div>
  );
}
