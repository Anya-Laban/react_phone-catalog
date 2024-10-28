import { Link, useParams } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PagesPath } from '../../../types/PagesPath';
import { Favourites } from '../Icons/Favourites';
import { ShoppingBag } from '../Icons/ShoppingBag';
import { Menu } from './components/Menu/Menu';
import { LinkItem } from './components/LinkItem';
import { BurgerButton } from './components/BurgerButton';
import { Search } from './components/Search';
import { ValidCategories } from '../../../constants/ValidCategories';

type PageLink = { name: string; path: string };

const pages: PageLink[] = [
  { name: 'Home', path: PagesPath.Home },
  { name: 'Phones', path: PagesPath.Phones },
  { name: 'Tablets', path: PagesPath.Tablets },
  { name: 'Accessories', path: PagesPath.Accessories },
];

export const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { category, productId } = useParams();

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'inherit';
    }

    const handleResize = () => {
      if (window.innerWidth > 639 && isMenuActive) {
        setIsMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuActive]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuActive) {
      setIsMenuActive(false);
    }
  };

  return (
    <header
      className={classNames(styles.Header, {
        [styles.Header_overflowMenu]: isMenuActive,
      })}
    >
      <div className={styles.Header__contentTop}>
        <Link to={PagesPath.Home} className={styles.Header__logo}>
          <img src="/public/icons/logo.svg" alt="Logo" />
        </Link>

        <nav className={styles.Header__menu}>
          {pages.map(page => (
            <LinkItem
              key={page.path}
              type="link"
              path={page.path}
              onClick={handleLinkClick}
            >
              {page.name}
            </LinkItem>
          ))}
        </nav>

        {category && ValidCategories.includes(category) && !productId && (
          <Search />
        )}

        <div className={styles.Header__buttons}>
          <LinkItem
            type="btn"
            path={PagesPath.Favourites}
            onClick={handleLinkClick}
          >
            <Favourites />
          </LinkItem>
          <LinkItem type="btn" path={PagesPath.Cart} onClick={handleLinkClick}>
            <ShoppingBag />
          </LinkItem>
        </div>

        <BurgerButton
          isMenuActive={isMenuActive}
          onChangeIsMenuActive={setIsMenuActive}
        />
      </div>

      <Menu
        isActive={isMenuActive}
        onLinkClick={handleLinkClick}
        links={pages}
      />
    </header>
  );
};
