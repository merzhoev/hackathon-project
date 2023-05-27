import { Title } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import styles from "./categoryPage.module.css";
import { ProductCard } from "components/Card";
import { useEffect, useState } from "react";

import { $api } from "api/services";
export const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const { id } = useParams();
  useEffect(() => {
    $api.getCategoryProducts(id).then(({ data }) => {
      setProducts(data.products);
      setCategory(data.category);
    });
  }, []);

  return (
    <div>
      <Title mb="lg" order={2}>
        {category.name}
      </Title>
      <div className={styles.products}>
        {products.map((item, index) => (
          <ProductCard key={index} {...item}></ProductCard>
        ))}
      </div>
    </div>
  );
};
