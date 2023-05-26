import React from "react";
import style from "./Farmers.module.css";
import { Rating, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function FarmersCard({ item }) {
  return (
    <div className={style.farmersCardWrapp}>
      <img src={item.avatar} className={style.avatar} alt="Avatar" />
      <div className={style.farmersBox}>
        <Text fw={500} fz="xl">
          {item.name}
        </Text>
        <Text fw="md" className={style.raitingBox}>
          Рейтинг:
          <Rating value={item.raiting} style={{ marginLeft: 8 }} readOnly />
        </Text>
        <Link to={"#"} className={style.linkCard}>
          Перейти на профиль
          <IconArrowNarrowRight size={24} strokeWidth={2} color={"white"} />
        </Link>
      </div>
    </div>
  );
}
