import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { HexColor } from '../../../../types/Category';
import { Product } from '../../../../types/Product';
import { getColor } from '../../../../utils/getColor';
import styles from './Selectors.module.scss';

type Props = {
  product: Product;
};

export const Selectors: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { namespaceId, color, colorsAvailable, capacity, capacityAvailable } =
    product;

  const bgColors: HexColor[] = colorsAvailable.map(value => getColor(value));

  const getLink = (id: string, currCapacity: string, currColor: string) => {
    const normalizedColor = currColor.split(' ').join('-').toLowerCase();
    const normalizeCapacity = currCapacity.split(' ').join('-').toLowerCase();

    return `${id}-${normalizeCapacity}-${normalizedColor}`;
  };

  return (
    <div className={styles.Selectors}>
      <div className={styles.Selectors__block}>
        <p className={styles.Selectors__title}>Available colors</p>

        <div className={styles.Selectors__links}>
          {colorsAvailable.map((value, index) => (
            <button
              key={value}
              onClick={() => {
                if (color !== value) {
                  navigate(`../${getLink(namespaceId, capacity, value)}`);
                }
              }}
              style={{ backgroundColor: bgColors[index] }}
              className={classNames(
                styles.Selectors__link,
                styles.Selectors__link_color,
                {
                  [styles.Selectors__link_color_active]: color === value,
                },
              )}
            />
          ))}
        </div>
      </div>

      <div className={styles.Selectors__block}>
        <p className={styles.Selectors__title}>Select capacity</p>

        <div className={styles.Selectors__links}>
          {capacityAvailable.map(value => (
            <button
              key={value}
              onClick={() => {
                if (capacity !== value) {
                  navigate(`../${getLink(namespaceId, value, color)}`);
                }
              }}
              className={classNames(
                styles.Selectors__link,
                styles.Selectors__link_capacity,
                {
                  [styles.Selectors__link_capacity_active]: capacity === value,
                },
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};