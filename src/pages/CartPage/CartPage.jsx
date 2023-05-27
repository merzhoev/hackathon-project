import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CartCard } from 'components/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from 'store/slices/cartSlice';
import { IconShoppingCart, IconChecklist, IconHome2 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

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
  const [successOpened, { open: successOpen, close: successClose }] = useDisclosure(false);
  const products = useSelector((state) => state.cart.products);
  const priceOfAllProducts = products.reduce(
    (acc, { pricePerOne, amount }) => acc + pricePerOne * amount,
    0,
  );

  const onClearCart = () => {
    dispatch(cartActions.clearCart());

    close();
  };

  const onSuccess = () => {
    dispatch(cartActions.clearCart());
    successOpen();
  };

  return (
    <Stack>
      <Modal
        opened={successOpened}
        onClose={successClose}
        withCloseButton={false}
        withinPortal
        centered>
        <Stack align="center">
          <IconChecklist width={120} height={120} color="green" />
          <Title order={3}>Вы успешно оформили заказ</Title>
          <Link to="/">
            <Button leftIcon={<IconHome2 size={'1.2rem'} />} mt={'lg'} fullWidth>
              Вернуться на главную
            </Button>
          </Link>
        </Stack>
      </Modal>
      {products.length ? (
        <>
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
            {products.map((product) => (
              <CartCard key={product.id} {...product} />
            ))}
          </Stack>
          <Group position="apart" align="center">
            <Group align="center" spacing={'lg'}>
              <Title order={3}>Итог:</Title>
              <Text fw={500} size={'xl'} color="dark">
                &#8381; {priceOfAllProducts}
              </Text>
            </Group>
            <Button onClick={onSuccess}>Оформить заказ</Button>
          </Group>
        </>
      ) : (
        <Stack align="center">
          <IconShoppingCart width={120} height={120} />
          <Title order={2} mt={'xs'} mb={'sm'}>
            Корзина пустая
          </Title>
          <Link to="/">
            <Button leftIcon={<IconShoppingCart size="1.1rem" />}>Вернуться на маркет</Button>
          </Link>
        </Stack>
      )}
    </Stack>
  );
}
