import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CartCard } from 'components/CartCard';
import { useDispatch } from 'react-redux';
import { cartActions } from 'store/slices/cartSlice';

const card = {
  id: 1,
  title: 'Яблоки',
  amount: 5,
  pricePerOne: 50,
  imageUrl:
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
};

export function CartPage() {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);

  const onClearCart = () => {
    dispatch(cartActions.clearCart());

    close();
  };

  return (
    <Stack>
      <Modal opened={opened} onClose={close} withCloseButton={false} withinPortal centered>
        <Stack p={'sm'}>
          <Text fz={'lg'} align="center" mb={'lg'}>
            Вы действительно хотите очистить корзину?
          </Text>
          <Group position="apart">
            <Button variant="default" onClick={close}>
              Отмена
            </Button>
            <Button color="red" onClick={onClearCart}>
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Group position="apart" align="center" mb="md">
        <Title order={2}>Корзина</Title>
        <Button onClick={open} color="red">
          Очистить корзину
        </Button>
      </Group>
      <Stack mb={'md'}>
        <CartCard {...card} />
        <CartCard {...card} />
      </Stack>
      <Group position="right" align="center">
        <Button>Оформить заказ</Button>
      </Group>
    </Stack>
  );
}
