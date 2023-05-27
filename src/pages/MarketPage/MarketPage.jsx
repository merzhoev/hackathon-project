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
    fermer: {name: "Ферма большого дядюшки Джо"},
    name: "Яблоки",
    description: "Вкусные, сочные яблоки",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    fermer: {name:"Ферма большого дядюшки Боба>"},
    name: "Слива",
    description: "Я слива лиловая, спелая, садовая",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1581385339821-5b358673a883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
  },
  {
    fermer: {name:"Ферма Большого Брата"},
    name: "Груша",
    description: "Груша вкусная, мамай клянусь",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    fermer: {name:"Ферма Локи"},
    name: "Абрикос",
    description: "Я абрикос, на юге рос!",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    fermer: {name:"Ферма молочного Боба"},
    name: "Молоко",
    description: "Вкусное молоко",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
  },
  {
    fermer: {name:"Ферма молочного Боба"},
    name: "Молоко",
    description: "Вкусное молоко",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
  },
  {
    fermer: {name:"Ферма молочного Боба"},
    name: "Молоко",
    description: "Вкусное молоко",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
  },
  {
    fermer: {name:"Ферма сырного барона"},
    name: "Сыр",
    description: "Чем больше в сыре дырок, тем меньше в сыре сыра",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  },
  {
    fermer: {name:"Ферма сырного барона"},
    name: "Сыр",
    description: "Чем больше в сыре дырок, тем меньше в сыре сыра",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  },
  {
    fermer: {name:"Ферма сырного барона"},
    name: "Сыр",
    description: "Чем больше в сыре дырок, тем меньше в сыре сыра",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
  },
  {
    fermer: {name:"Ферма молочного Боба"},
    name: "Яйца",
    description: "Чем больше в сыре дырок, тем меньше в сыре сыра",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  },
  {
    fermer: {name:"Ферма мясника Бутча"},
    name: "Мясо ягненка",
    description: "Мясо настолько свежее, что ягненок еще живой",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    fermer: {name:"Ферма молочного Боба"},
    name: "Яйца",
    description: "Чем больше в сыре дырок, тем меньше в сыре сыра",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  },
  {
    fermer: {name:"Ферма мясника Бутча"},
    name: "Мясо ягненка",
    description: "Мясо настолько свежее, что ягненок еще живой",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    fermer: {name:"Ферма молочного Боба"},
    name: "Яйца",
    description: "Чем больше в сыре дырок, тем меньше в сыре сыра",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  },
  {
    fermer: {name:"Ферма мясника Бутча"},
    name: "Мясо ягненка",
    description: "Мясо настолько свежее, что ягненок еще живой",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    fermer: {name:"Ферма мясника Бутча"},
    name: "Мясо ягненка",
    description: "Мясо настолько свежее, что ягненок еще живой",
    price: 168123,
    image_path: "https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

const size = [4, 4, 4, 6, 6];

export const MarketPage = () => {
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);
  useEffect(() => {
    setIsLoading(true);
    $api
      .getCategory()
      .then(({ data }) => setCategory(data))
      .finally(() => setIsLoading(false));
    $api.getProducts().then(({data}) => setData(data));
  }, []);

  return (
    <div>
      <Grid mb="lg">
        {isLoading &&
          size.map((item, index) => (
            <Grid.Col key={index} xs={item}>
              <Skeleton height={140} radius="md" />
            </Grid.Col>
          ))}
        {!isLoading &&
          category.map((item, index) => (
            <Grid.Col key={index} xs={size[index]}>
              {
                <Link to={`/${item.id}`}>
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
        {data.map((item, index) => (
          <ProductCard key={index} {...item}></ProductCard>
        ))}

      </div>
    </div>
  );
};
