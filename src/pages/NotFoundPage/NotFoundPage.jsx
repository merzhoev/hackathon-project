import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export function NotFoundPage() {
  const { classes } = useStyles();

  return (
    <Container>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Страница не найдена.</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Возможно, вы ошиблись при вводе адреса или страница была перемещена по другому URL-адресу.
      </Text>
      <Group position="center">
        <Link to="/">
          <Button variant="outline" size="md">
            Вернуться на главную
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
