import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = ({ products }) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((product) => {
          return <ProductItem key={product.id} {...product} />;
        })}
      </ul>
    </section>
  );
};

export default Products;
