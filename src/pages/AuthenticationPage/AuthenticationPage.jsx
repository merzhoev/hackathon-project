import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
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
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Некорректный email'),
      password: (val) => (val.length < 6 ? 'Пароль должен содержать не менее 6 символов' : null),
    },
  });

  const onToggleType = (event) => {
    event.preventDefault();

    form.reset();
    toggleType();
  };

  const onFormSubmit = (data) => {
    if (type.value === 'register') {
    }

    if (type.value === 'login') {
      const { name, ...loginData } = data;
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          {type.title}
        </Title>

        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <Stack>
            {type.value === 'register' && (
              <TextInput
                label="Имя"
                placeholder="Ваше имя"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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
            <Button type="submit" fullWidth mt="md" size="md">
              Войти
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
