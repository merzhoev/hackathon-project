import { FarmersCard, FarmersFilter } from "components/Farmers";
import React, { useEffect } from "react";
import style from "./Farmers.module.css";
import { IconArrowsDownUp, IconAlphabetCyrillic } from "@tabler/icons-react";

const filter = [
  {
    label: "По рейтингу",
    image: <IconArrowsDownUp size={22} strokeWidth={2} color={"#40c057"} />,
  },
  {
    label: "По алфовиту",
    image: <IconAlphabetCyrillic size={22} strokeWidth={2} color={"#40c057"} />,
  },
];
const data = [
  {
    name: "Иванов Иван Иванович",
    avatar: "https://i.pravatar.cc/302",
    raiting: 5,
  },
];

export function FarmersPage() {
  return (
    <div className={style.farmersPage}>
      <FarmersFilter data={filter} />
      <div className={style.fermersMass}>
        {data.map((item) => (
          <FarmersCard item={item} />
        ))}
      </div>
    </div>
  );
}
