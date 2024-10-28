import React, { useContext, useMemo } from 'react';
import styles from './ProductButtons.module.scss';
import classNames from 'classnames';
import { AddedProduct, ProductsContext } from '../../../store/ProductsProvider';
import { Like } from '../Icons/Like';

type Props = {
  productId: string;
  otherClass?: string;
};

export const ProductButtons: React.FC<Props> = ({ otherClass, productId }) => {
  const {
    likedProducts,
    setLikedProducts,
    addedProducts,
    setAddedProducts,
    products,
  } = useContext(ProductsContext);

  const isLiked = useMemo(
    () => likedProducts.includes(productId),
    [likedProducts, productId],
  );
  const isAdded = useMemo(
    () => addedProducts.find(addedProduct => addedProduct.id === productId),
    [addedProducts, productId],
  );

  const cartBtnText = isAdded ? 'Added' : 'Add to cart';

  const handleLikeBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (isLiked) {
      const newLikedProducts = likedProducts.filter(
        likedProductId => likedProductId !== productId,
      );

      setLikedProducts(newLikedProducts);

      return;
    }

    setLikedProducts([...likedProducts, productId]);
  };

  const handleAddBtnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (isAdded) {
      const newAddedProducts = addedProducts.filter(
        addedProduct => addedProduct.id !== productId,
      );

      setAddedProducts(newAddedProducts);

      return;
    }

    const product = products.find(pr => pr.itemId === productId);

    if (product) {
      const newAddedProduct: AddedProduct = {
        id: productId,
        title: product.name,
        img: product.image,
        price: product.price,
        count: 1,
      };

      setAddedProducts([...addedProducts, newAddedProduct]);
    }
  };

  return (
    <div className={classNames(styles.Buttons, otherClass)}>
      <button
        className={classNames(styles.Buttons__buttonAdd, {
          [styles.Buttons__buttonAdd_active]: isAdded,
        })}
        onClick={event => handleAddBtnClick(event)}
      >
        {cartBtnText}
      </button>
      <button
        className={styles.Buttons__buttonLike}
        onClick={event => handleLikeBtnClick(event)}
      >
        <Like isActive={isLiked} />
      </button>
    </div>
  );
};
