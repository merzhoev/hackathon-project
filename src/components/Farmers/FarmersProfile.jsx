import { createStyles, Avatar, Text, Group, Rating } from "@mantine/core";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import style from "./Farmers.module.css";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function FarmersProfile({ profile }) {
  const { classes } = useStyles();
  const { user } = useSelector((state) => state.user);
  
  if (profile) {
    return (
      <div style={{ marginBottom: 28 }}>
        <Group noWrap>
          <Avatar src={profile.avatar} size={194} radius="md" color="#287d37" />
          <div>
            <Text fz="xl" tt="uppercase" fw={700} c="black">
              {profile.name}
            </Text>
            <Group noWrap spacing={10} mt={3}>
              <IconAt stroke={1.5} size="1rem" className={classes.icon} />
              <Text fz="lg" c="dimmed">
                {profile.email}
              </Text>
            </Group>
            <Group noWrap spacing={10} mt={3}>
              <Text fw="md" className={style.raitingBox}>
                Рейтинг:
                <Rating
                  value={profile.rating}
                  style={{ marginLeft: 8 }}
                  readOnly
                />
              </Text>
            </Group>
          </div>
        </Group>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 28 }}>
      <Group noWrap>
        <Avatar src={user.avatar} size={194} radius="md" color="#287d37" />
        <div>
          <Text fz="xl" tt="uppercase" fw={700} c="black">
            {user.name}
          </Text>
          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="lg" c="dimmed">
              {user.email}
            </Text>
          </Group>
          <Group noWrap spacing={10} mt={3}>
            <Text fw="md" className={style.raitingBox}>
              Рейтинг:
              <Rating value={user.rating} style={{ marginLeft: 8 }} readOnly />
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
