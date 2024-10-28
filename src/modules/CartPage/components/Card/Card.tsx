import { AddedProduct } from '../../../../store/ProductsProvider';
import { Close } from '../../../shared/Icons/Close';
import { Price } from '../../../shared/Price';
import { SliderButton } from '../../../shared/SliderButton';
import styles from './Card.module.scss';

type Props = {
  product: AddedProduct;
  onChangeCount: (n: number) => void;
  onRemoveProduct: () => void;
};

export const Card: React.FC<Props> = ({
  product,
  onChangeCount,
  onRemoveProduct,
}) => {
  return (
    <li className={styles.Card}>
      <button className={styles.Card__removeBtn} onClick={onRemoveProduct}>
        <Close colorSecondary={true} />
      </button>

      <img src={product.img} alt={product.id} className={styles.Card__img} />

      <p className={styles.Card__title}>{product.title}</p>

      <div className={styles.Card__countBlock}>
        <SliderButton
          onClick={() => onChangeCount(product.count - 1)}
          isDisabled={product.count === 1}
        >
          -
        </SliderButton>

        <span className={styles.Card__count}>{product.count}</span>

        <SliderButton onClick={() => onChangeCount(product.count + 1)}>
          +
        </SliderButton>
      </div>

      <Price price={product.price} otherClass={styles.Card__price} />
    </li>
  );
};