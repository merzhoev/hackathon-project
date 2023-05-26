import { ActionIcon, Avatar, Button, Group, Paper, Text, Title, createStyles } from '@mantine/core';
import { IconX, IconPlus, IconMinus } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { cartActions } from 'store/slices/cartSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },
}));

export function CartCard({ id, imageUrl, title, pricePerOne, amount }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const totalPrice = pricePerOne * amount;

  return (
    <Paper withBorder radius="md" className={classes.wrapper}>
      <Group position="apart">
        <Group spacing="lg">
          <Avatar size="xl" radius={'50%'} src={imageUrl} alt="product image" />
          <Title order={3}>{title}</Title>
        </Group>
        <Group spacing={'xl'}>
          <Text fw={500} fz={'lg'}>
            &#8381; {totalPrice}
          </Text>
          <Group spacing={'xs'}>
            <ActionIcon onClick={() => dispatch(cartActions.minusProduct(id))}>
              <IconMinus />
            </ActionIcon>
            <Text fw={700} fz={'xl'}>
              {amount} КГ
            </Text>
            <ActionIcon onClick={() => dispatch(cartActions.plusProduct(id))}>
              <IconPlus />
            </ActionIcon>
          </Group>
          <ActionIcon onClick={() => dispatch(cartActions.removeOneCard(id))}>
            <IconX />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
}
