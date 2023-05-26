import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Container,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconAdjustments,
  IconUser,
} from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from 'store/slices/userSlice';
import Logo from "assets/images/Logo.svg";

const useStyles = createStyles((theme) => {
  return {
    headerInner: {
      height: 'inherit',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,

      [theme.fn.smallerThan('sm')]: {
        height: rem(42),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },

      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      }),
    },

    subLink: {
      width: '100%',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      borderRadius: theme.radius.md,

      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      }),

      '&:active': theme.activeStyles,
    },

    dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      margin: `calc(${theme.spacing.md} * -1)`,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
      paddingBottom: theme.spacing.xl,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },

    hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },

    hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  };
});

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HeaderMegaMenu({ role }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { classes, theme } = useStyles();

  const onLogout = () => dispatch(userActions.logout());

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={80}>
      <Header height={60} px="md">
        <Container size="lg" className={classes.headerInner}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Link to={"/"}>
              <img
                src={Logo}
                style={{
                  width: 75,
                  height: 65,
                }}
                alt="Logo"
              />
            </Link>
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >

              <Link to="#" className={classes.link}>
                Маркет
              </Link>
              <Link to={"farmers"} className={classes.link}>
                Фермеры
              </Link>
              {role === 'farmer' && (
                <Link to="#" className={classes.link}>
                  Мои товары
                </Link>
              )}
              <Link to="chats" className={classes.link}>
                Чат
              </Link>
              {role === 'farmer' && (
                <Link to="#" className={classes.link}>
                  Фермерам
                </Link>
              )}
            </Group>

            <Group className={classes.hiddenMobile}>
              <ActionIcon>
                <IconUser size="1.5rem" />
              </ActionIcon>
              <Button variant="default" onClick={onLogout}>
                Выйти
              </Button>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Навигация"
        className={classes.hiddenDesktop}
        zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Link to="#" className={classes.link}>
            Маркет
          </Link>
          <Link to={"farmers"} className={classes.link}>
            Фермеры
          </Link>
          {role === 'farmer' && (
            <Link to="#" className={classes.link}>
              Мои товары
            </Link>
          )}
          <Link to="chats" className={classes.link}>
            Чат
          </Link>
          {role === 'farmer' && (
            <Link to="#" className={classes.link}>
              Фермерам
            </Link>
          )}
          <Link to="#" className={classes.link}>
            Профиль
          </Link>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default" onClick={onLogout}>
              Выйти
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
