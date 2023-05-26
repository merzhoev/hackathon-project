import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Stack,
  Tabs,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { useState } from 'react';
import villageImage from 'assets/images/village.jpg';
import { $api } from 'api/services';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, registerThunk } from 'store/slices/userSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: 'cover',
    backgroundImage: `url(${villageImage})`,
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function AuthenticationPage() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const [role, setRole] = useState({ value: 'user', title: 'Пользователь' });
  const [type, toggleType] = useToggle([
    { value: 'login', title: 'Вход', buttonTitle: 'Зарегистрироваться' },
    { value: 'register', title: 'Регистрация', buttonTitle: 'Войти' },
  ]);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      name: (val) => {
        if (type.value === 'login') {
          return null;
        }

        return val.trim().length ? null : 'Поле обязательное';
      },
      email: (val) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? null : 'Некорректный email'),
      password: (val) => (val.length < 6 ? 'Пароль должен содержать не менее 6 символов' : null),
    },
  });

  const onChangeRole = (value) => {
    const titleByValue = {
      user: 'Пользователь',
      farmer: 'Фермер',
    };

    setRole({ value, title: titleByValue[value] });
  };

  const onToggleType = (event) => {
    event.preventDefault();

    form.reset();
    toggleType();
  };

  const onFormSubmit = (data) => {
    if (type.value === 'register') {
      const registerData = { ...data, role: role.value };

      dispatch(registerThunk(registerData));
    }

    if (type.value === 'login') {
      const { name, ...loginData } = data;

      dispatch(loginThunk(loginData));
    }
  };

  return (
    <div className={classes.wrapper} style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <Paper className={classes.form} radius={0} p={30}>
        {type.value === 'login' ? (
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            {type.title}
          </Title>
        ) : (
          <>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
              {type.title}
            </Title>
            <Tabs mb="lg" onTabChange={onChangeRole} value={role.value}>
              <Tabs.List>
                <Tabs.Tab sx={{ width: '50%' }} value="user">
                  Пользователь
                </Tabs.Tab>
                <Tabs.Tab sx={{ width: '50%' }} value="farmer">
                  Фермер
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </>
        )}

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            {type.value === 'register' && (
              <TextInput
                label="Имя"
                placeholder="Ваше имя"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                error={form.errors.name}
                size="md"
              />
            )}
            <TextInput
              label="E-mail"
              placeholder="Ваша почта"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              size="md"
            />
            <PasswordInput
              label="Пароль"
              placeholder="Ваш пароль"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              size="md"
            />

            {errorMessage !== null && (
              <Text align="center" color="red">
                {errorMessage}
              </Text>
            )}

            <Button type="submit" fullWidth mt="md" size="md">
              {type.value === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Stack>
        </form>

        <Text ta="center" mt="md">
          У вас нет аккаунта?{' '}
          <Anchor weight={700} onClick={onToggleType}>
            {type.buttonTitle}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
