import {
  FarmersCard,
  FarmersFilter,
  FarmersModalCard,
  FarmersProductCard,
  FarmersProfile,
} from "components/Farmers";
import React, { useEffect, useState } from "react";
import style from "./MyProductsPage.module.css";
import {
  IconCoin,
  IconAlphabetCyrillic,
  IconNewSection,
} from "@tabler/icons-react";
import axios from "axios";
import { Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";

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

const token = localStorage.getItem("token");

export function MyProductsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [addState, setAddState] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://erdune.com:4432/api/users/${user.id}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Token": 1,
      },
    }).then((res) => {
      setData(res.data.products);
    });
  }, []);

  console.log(data);

  return (
    <div className={style.farmersPage}>
      <FarmersProfile />
      <div className={style.farmersFilter}>
        <Text fz="xl" fw={700}>
          Список всех продуктов
        </Text>
        <div style={{ display: "flex" }}>
          <FarmersFilter data={filter} />
          <Button
            sx={{ height: 43.6, marginLeft: 12 }}
            rightIcon={
              <IconNewSection size={24} strokeWidth={2} color={"white"} />
            }
            onClick={() => {
              setAddState(true);
              open();
            }}
          >
            Добавить продукт
          </Button>
        </div>
      </div>
      <FarmersModalCard
        data={data}
        setData={setData}
        add={addState}
        opened={opened}
        close={close}
        currentItem={currentItem}
      />
      <div className={style.fermersMass} style={{ gap: 12 }}>
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
