/* eslint-disable @next/next/no-img-element */
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import {useRef} from "react";
import useScrollDirection from "@/hooks/useScrollDirection";


export const Header = ({ filter, inputValue }) => {
  const catMenu = useRef(null);
  const searchMenu = useRef(null);
  const mobileMenu = useRef(null);
  const [searchState, setSrearchState] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [dropdownActive, setdropdownActive] = useState(null);

  const navItems = {
    "Demos": ["Post Header", "Post Layout", "Share Buttons", "Gallery Post", "Video Post"],
    "Post": ["Post Header", "Post Layout", "Share Buttons", "Gallery Post", "Video Post"],
    "Features": ["Post Header", "Post Layout", "Share Buttons", "Gallery Post", "Video Post"],
    "Categories": ["Post Header", "Post Layout", "Share Buttons", "Gallery Post", "Video Post"],
    "Shop": ["Post Header", "Post Layout", "Share Buttons", "Gallery Post", "Video Post"],
  };

  const scrollDirection = useScrollDirection();

  const closeOpenMenus = (e)=>{
    if(catMenu.current && dropdownActive >= 0 && !catMenu.current.contains(e.target)){
      setdropdownActive(null);
    } else if (searchMenu.current && searchState && !searchMenu.current.contains(e.target)) {
      setSrearchState(false);
    } else if (mobileMenu.current && burgerMenu && !mobileMenu.current.contains(e.target)) {
      setBurgerMenu(false);
    };
  };

  const openDropDown = (index) => {
    if (dropdownActive !== index) {
      setdropdownActive(index)
    } else {
      setdropdownActive(null)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  });

  useEffect(() => {
    if (scrollDirection === "down") {
      setSrearchState(false);
      setdropdownActive(null);
    }
  }, [scrollDirection]);

  return (
    <header className={clsx([styles.header], {[styles.headerHide]: scrollDirection === "down" })}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button
            className={styles.burger}
            onClick={() => setBurgerMenu(true)}
          >
            <img
              src='/icons/burger.svg'
              alt='burger'
              className={styles.burgerImage}
            />
          </button>
          <img
            src="/icons/logo.svg"
            alt="Logo"
            className={styles.logo}
          />
          <div className={styles.search}>
            { searchState && <input
              type="text"
              className={styles.searchInput}
              ref={searchMenu}
              value={filter}
              onInput={e => inputValue(e.target.value)}
            /> }
            <button
              className={styles.searchButton}
              onClick={() => setSrearchState(!searchState)}
            >
              <img src="/icons/magnifier.svg" alt="magnifier" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx([styles.navigation], {[styles.navigationActive]: burgerMenu })}
        ref={mobileMenu}
      >
        <div className={styles.navWrapper}>
          <div className={styles.navHeader}>
            <img
              src="/icons/logo.svg"
              alt="Logo"
              className={styles.logo}
            />
            <button
              className={styles.close}
              onClick={() => setBurgerMenu(false)}
            >
              <img
                src="/icons/x.svg"
                alt="x"
                className={styles.closeIcon}
              />
            </button>
          </div>
          <ul
            className={styles.navList}
            ref={catMenu}
          >
            { Object.keys(navItems).map((item, index) => <li
              key={item}
              className={clsx([styles.navItem], {[styles.navItemActive]: dropdownActive === index })}
            >
              <button
                className={styles.navButton}
                onClick={() => openDropDown(index)}
              >
                { item }
                <img
                  src="/icons/arrow.svg"
                  alt="arrow"
                  className={styles.arrow}
                />
              </button>
              <ul className={styles.subMenu}>
                { navItems[item].map(itemArr => <li
                  key={item + itemArr}
                  className={styles.subItem}
                >
                  <button className={styles.subButton}>
                    { itemArr }
                    <img
                      src="/icons/arrow.svg"
                      alt="arrow"
                      className={styles.leftArrow}
                    />
                  </button>
                </li>) }
              </ul>
            </li>) }
            <li className={styles.navItem}>
              <button className={styles.navButton}>
                Buy Now
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}