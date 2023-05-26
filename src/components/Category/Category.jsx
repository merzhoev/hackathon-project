import styles from "./category.module.css";

export const Category = ({name, image_path}) => {
  return (
    <div
      className={styles.category}
      style={{
        backgroundImage:
          `url(${image_path})`,
      }}
    >
      {name}
      <div className={styles.backgroundblock}></div>
    </div>
  );
};
