import styles from "./category.module.css";

export const Category = ({title, img}) => {
  return (
    <div
      className={styles.category}
      style={{
        backgroundImage:
          `url(${img})`,
      }}
    >
      {title}
      <div className={styles.backgroundblock}></div>
    </div>
  );
};
