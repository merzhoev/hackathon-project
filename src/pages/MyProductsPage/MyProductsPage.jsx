import {
  FarmersCard,
  FarmersFilter,
  FarmersModalCard,
  FarmersProductCard,
} from "components/Farmers";
import React, { useEffect, useState } from "react";
import style from "./MyProductsPage.module.css";
import { IconCoin, IconAlphabetCyrillic } from "@tabler/icons-react";
import axios from "axios";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
    description: "Красота то какая",
    avatar: "https://i.pravatar.cc/302",
    raiting: 5,
  },
];

const token = localStorage.getItem("token");

export function MyProductsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentItem, setCurrentItem] = useState(null);

  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     axios({
  //       method: "GET",
  //       url: `http://fb7960l1.beget.tech/api/users`,
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //         "User-Token": 1,
  //       },
  //     }).then((res) => {
  //       setData(res.data);
  //     });
  //   }, []);

  return (
    <div className={style.farmersPage}>
      <div className={style.farmersFilter}>
        <Text fz="xl" fw={700}>
          Список всех фермеров
        </Text>
        <FarmersFilter data={filter} />
      </div>
      <FarmersModalCard
        opened={opened}
        close={close}
        currentItem={currentItem}
      />
      <div className={style.fermersMass}>
        {data.map((item) => {
          return (
            <FarmersProductCard
              item={item}
              key={item.id}
              open={open}
              setCurrentItem={setCurrentItem}
            />
          );
        })}
      </div>
    </div>
  );
}
