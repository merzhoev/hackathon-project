import { Grid, Skeleton, Title } from "@mantine/core";
import { Category } from "components/Category";
import { Link } from "react-router-dom";
import styles from "./marketPage.module.css";
import { ProductCard } from "components/Card";
import { useEffect, useState } from "react";

import { $api } from "api/services";

const child = <Skeleton height={140} radius="md" />;
const mockdata = [
  {
    farm: "Ферма большого дядюшки Джо",
    title: "Яблоки",
    description: "Вкусные, сочные яблоки",
    price: 168123,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    farm: "Ферма большого дядюшки Боба>",
    title: "Слива",
    description: "Я слива лиловая, спелая, садовая",
    price: 168123,
    img: "https://images.unsplash.com/photo-1581385339821-5b358673a883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
  },
  {
    farm: "Ферма Большого Брата",
    title: "Груша",
    description: "Груша вкусная, мамай клянусь",
    price: 168123,
    img: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    farm: "Ферма Локи",
    title: "Абрикос",
    description: "Я абрикос, на юге рос!",
    price: 168123,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    farm: "Ферма Боба Марли",
    title: "Яблоки",
    description: "Вкусные, сочные яблоки",
    price: 168123,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
]

const size = [4, 4, 4, 6, 6];


export const MarketPage = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    $api.getCategory().then(({data}) => setCategory(data));
    $api.getProducts().then((data) => console.log(data));
  }, []);

  return (
    <div>
      <Grid  mb="lg">
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
        {category.map((item, index) => (
          <Grid.Col key={index} xs={size[index]}>
            {
              <Link to={"/market/1"}>
                <Category {...item} />
              </Link>
            }
          </Grid.Col>
        ))}
      </Grid>
      <Title mb="lg" order={2}>
        Все продукты
      </Title>
      <div className={styles.products}>
        <ProductCard {...mockdata[0]}></ProductCard>
        <ProductCard {...mockdata[0]}></ProductCard>
        <ProductCard {...mockdata[0]}></ProductCard>
      </div>
    </div>
  );
};
