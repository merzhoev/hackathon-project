import {
  FarmersFilter,
  FarmersModalCard,
  FarmersProfile,
} from "components/Farmers";
import { ProductCard } from "components/Card";
import React, { useEffect, useState } from "react";
import style from "./Farmers.module.css";
import {
  IconCoin,
  IconAlphabetCyrillic,
  IconNewSection,
} from "@tabler/icons-react";
import axios from "axios";
import { Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router";

const filter = [
  {
    label: "По цене",
    image: <IconCoin size={22} strokeWidth={2} color={"#40c057"} />,
  },
  {
    label: "По алфавиту",
    image: <IconAlphabetCyrillic size={22} strokeWidth={2} color={"#40c057"} />,
  },
];
const data = [
  {
    id: 123,
    name: "Иванов Иван Иванович",
    price: 5000,
    name: "Помидоры",
    description: "Красота то какая",
    img: "https://i.pravatar.cc/302",
  },
];

const token = localStorage.getItem("token");

export function FarmersProfilePage() {
  const id = useParams().id;
  const [data, setData] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://erdune.com:4432/api/users/${id}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Token": 1,
      },
    }).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <div className={style.farmersPage}>
      <FarmersProfile profile={data} />
      <div className={style.farmersFilter}>
        <Text fz="xl" fw={700}>
          Список продуктов
        </Text>
        <FarmersFilter data={filter} />
      </div>
      <div className={style.fermersMass} style={{ gap: 30 }}>
        {data?.products.map((item) => {
          return <ProductCard {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
}
