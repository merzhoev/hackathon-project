import { FarmersCard, FarmersFilter } from "components/Farmers";
import React, { useEffect, useState } from "react";
import style from "./Farmers.module.css";
import { IconArrowsDownUp, IconAlphabetCyrillic } from "@tabler/icons-react";
import axios from "axios";
import { Text } from "@mantine/core";

const filter = [
  {
    label: "По рейтингу",
    image: <IconArrowsDownUp size={22} strokeWidth={2} color={"#40c057"} />,
  },
  {
    label: "По алфавиту",
    image: <IconAlphabetCyrillic size={22} strokeWidth={2} color={"#40c057"} />,
  },
];
// const data = [
//   {
//     name: "Иванов Иван Иванович",
//     avatar: "https://i.pravatar.cc/302",
//     raiting: 5,
//   },
// ];

const token = localStorage.getItem("token");

export function FarmersPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://erdune.com:4432/api/users`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Token": 1,
      },
    }).then((res) => {
      setData(res.data.slice(0, 23));
    });
  }, []);

  return (
    <div className={style.farmersPage}>
      <div className={style.farmersFilter}>
        <Text fz="xl" fw={700}>
          Список всех фермеров
        </Text>
        <FarmersFilter data={filter} />
      </div>
      <div className={style.fermersMass}>
        {data.map((item) => {
          if (item.rating) {
            return <FarmersCard item={item} key={item.id} />;
          }
        })}
      </div>
    </div>
  );
}
