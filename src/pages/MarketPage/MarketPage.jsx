import { Grid, Skeleton, Title } from "@mantine/core";
import { Category } from "components/Category";
import { Link } from "react-router-dom";
import styles from "./marketPage.module.css";
import { ProductCard } from "components/Card";

const child = <Skeleton height={140} radius="md" />;
const mockdata = {
  farm: "Ферма большого дядюшки Джо",
  title: "Яблоки",
  description: "Вкусные, сочные яблоки",
  price: 168123,
  img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
};

const size = [4, 4, 4, 6, 6];

const mockcategory = [
  {
    title: "Молоко, яйца и молочная продукция",
    img: "https://images.unsplash.com/photo-1637382752225-d7f97e1ddd03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1233&q=80",
  },
  {
    title: "Мясо, птица, кролик",
    img: "https://images.unsplash.com/photo-1625604086988-6e41981275fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "Сыры",
    img: "https://images.unsplash.com/photo-1596878640951-7970a8ef731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=326&q=80",
  },
  {
    title: "Овощи, фрукты и ягоды",
    img: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1142&q=80",
  },
  {
    title: "Мука и ингредиенты для выпечки",
    img: "https://images.unsplash.com/photo-1504400739660-22ebeb14f00a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

export const MarketPage = () => {
  return (
    <div>
      <Grid className={styles.categoryGrid}>
        {/* <Grid.Col xs={4}>
          {
            <Link to={"/market/1"}>
              <Category />
            </Link>
          }
        </Grid.Col>
        <Grid.Col xs={4}>{<Category />}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col> */}
        {mockcategory.map((item, index) => (
          <Grid.Col xs={size[index]}>
            {
              <Link to={"/market/1"}>
                <Category {...item} />
              </Link>
            }
          </Grid.Col>
        ))}
      </Grid>
      <Title className={styles.categoryTitle} order={2}>
        Все продукты
      </Title>
      <div className={styles.products}>
        <ProductCard {...mockdata}></ProductCard>
        <ProductCard {...mockdata}></ProductCard>
        <ProductCard {...mockdata}></ProductCard>
      </div>
    </div>
  );
};
