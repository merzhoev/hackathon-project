import { Input, Modal, Text, Button, Select } from "@mantine/core";
import style from "./Farmers.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyItem = {
  id: "",
  name: "",
  price: "",
  category_id: "",
  description: "",
  img: "",
};

const token = localStorage.getItem("token");

export function FarmersModalCard({
  currentItem,
  opened,
  close,
  add,
  data,
  setData,
}) {
  const [item, setItem] = useState(emptyItem);
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (currentItem) {
      setItem(currentItem);
      setValue(currentItem?.category_id);
    }
  }, [currentItem]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://erdune.com:4432/api/categories`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Token": 1,
      },
    }).then((res) => {
      res.data.map((item) => {
        item.value = item.id;
        item.label = item.name;
        return item;
      });
      setCategory(res.data);
    });
  }, []);

  const handleAddProduct = () => {
    if (
      item.name.length > 2 &&
      item.price.length > 2 &&
      item.description.length > 2 &&
      value
    ) {
      axios
        .post(
          "http://erdune.com:4432/api/products",
          {
            name: item.name,
            category_id: value,
            description: item.description,
            // image: item.img,
            price: item.price,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
              "User-Token": 1,
            },
          }
        )
        .then((res) => {
          setData([...data, { ...item, category_id: value }]);
          close();
        });
    }
  };

  const handleEditProduct = () => {
    if (
      item.name.length > 2 &&
      item.price.length > 2 &&
      item.description.length > 2 &&
      value
    ) {
      axios
        .put(
          `http://erdune.com:4432/api/products/${item.id}`,
          {
            name: item.name,
            category_id: value,
            description: item.description,
            // image: item.img,
            price: item.price,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
              "User-Token": 1,
            },
          }
        )
        .then(() => {
          setData(
            data.map((obj) =>
              obj.id === item.id ? { ...item, category_id: value } : obj
            )
          );
          close();
        });
    }
  };

  return (
    <Modal opened={opened} onClose={close} withCloseButton={true} centered>
      <Text fw={400} fz="md">
        Категория товара
      </Text>
      <Select
        placeholder="Категория товара"
        data={category}
        value={value}
        onChange={setValue}
      />
      <Text fw={400} fz="md">
        Название товара
      </Text>
      <Input
        placeholder="Название"
        className={style.modalInput}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        value={item.name}
      />
      <Text fw={400} fz="md">
        Описание товара
      </Text>
      <Input
        placeholder="Описание"
        className={style.modalInput}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
        value={item.description}
      />
      <Text fw={400} fz="md">
        Цена товара за кг
      </Text>
      <Input
        type="number"
        placeholder="Цена"
        className={style.modalInput}
        onChange={(e) => setItem({ ...item, price: e.target.value })}
        value={item.price}
      />
      <div className={style.ButtonModalBox}>
        {add ? (
          <Button
            onClick={handleAddProduct}
            disabled={
              item.name.length < 2 ||
              item.price.length < 2 ||
              item.description.length < 2 ||
              !value
            }
          >
            Добавить
          </Button>
        ) : (
          <>
            <Button
              onClick={handleEditProduct}
              disabled={
                item.name.length < 2 ||
                item.price.length < 2 ||
                item.description.length < 2 ||
                !value
              }
            >
              Сохранить
            </Button>
            <Button color="red">Удалить</Button>
          </>
        )}
      </div>
    </Modal>
  );
}
