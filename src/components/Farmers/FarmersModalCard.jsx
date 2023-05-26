import { Input, Modal, Text, Button } from "@mantine/core";
import style from "./Farmers.module.css";
import React from "react";

export function FarmersModalCard({ currentItem, opened, close }) {
  return (
    <>
      {currentItem && (
        <Modal opened={opened} onClose={close} withCloseButton={true} centered>
          <Text fw={400} fz="md">
            Название товара
          </Text>
          <Input
            placeholder="Название"
            className={style.modalInput}
            value={currentItem.name}
          />
          <Text fw={400} fz="md">
            Описание товара
          </Text>
          <Input
            placeholder="Описание"
            className={style.modalInput}
            value={currentItem.description}
          />
          <Text fw={400} fz="md">
            Цена товара за 1кг
          </Text>
          <Input
            placeholder="Цена"
            className={style.modalInput}
            value={currentItem.price}
          />
          <div className={style.ButtonModalBox}>
            <Button>Сохранить</Button>
            <Button color="red">Удалить</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
