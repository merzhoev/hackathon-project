import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  Button,
  rem,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import noImage from "assets/images/no-image.svg";

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
    "&:hover": {
      color: "#464C52",
    },
  },
}));

export const FarmersProductCard = ({ item, open, setCurrentItem }) => {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image radius="md" src={item.image_path ? item.image_path : noImage} alt="Product" />
      </Card.Section>
      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{item.name}</Text>
          <Text fz="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ₽{item.price}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              за кг
            </Text>
          </div>
          <Button
            size="xs"
            radius="xl"
            style={{ flex: 1 }}
            rightIcon={<IconEdit size={24} strokeWidth={2} color={"white"} />}
            onClick={() => {
              setCurrentItem(item);
              open();
            }}
          >
            Редактировать
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};
