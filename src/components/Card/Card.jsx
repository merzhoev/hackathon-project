import styles from "./card.module.css";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    maxWidth: "325px",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },

  link: {
    display: "flex",
    textDecoration: "none",
    color: "#adb5bd",
    '&:hover': {
      color: "#464C52"
    }
  },
}));

const mockdata = {
  farm: "Ферма большого дядюшки Джо",
  title: "яблоки",
  description: "Вкусные, сочные яблоки",
};

export const ProductCard = ({ id, title, description, farm, img, price }) => {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image radius="md" src={img} alt="Product" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{title}</Text>
          <Text fz="xs" c="dimmed">
            {description}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Group spacing={8} mb={-8}>
          {
            <Center key={id}>
              <Link className={classes.link}>
                <IconUsers
                  size="1.05rem"
                  className={classes.icon}
                  stroke={1.5}
                />
                <Text size="xs">{farm}</Text>
              </Link>
            </Center>
          }
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${price}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              за кг
            </Text>
          </div>

          <Button size="xs" radius="xl" style={{ flex: 1 }}>
            Добавить в корзину
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};
