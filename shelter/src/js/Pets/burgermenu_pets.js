"use strict";

export function burgerMenuLogic () {
  const burgerMenu = document.querySelector('.burger-menu');
  const body = document.querySelector('body');
  const nav = document.querySelector('.nav');
  const navList = document.querySelector('.nav__list');

  let burgerMenuOptions = new Map ([
    [body , 'body_scroll-lock'],
    [nav , 'nav_active-pets'],
    [navList , 'nav__list_active']
  ])

  const addFullBackgroundOverlay = () => {
    const divOverlay = document.createElement('div');
    divOverlay.classList.add('overlay');
    document.body.prepend(divOverlay);
  }

  const removeFullBackgroundOverlay = () => {
    const divOverlay = document.querySelector('.overlay');
    divOverlay.remove();
  }

  const burgerMenuClassToggle = () => {
    burgerMenu.classList.toggle('header__burger-menu_active');

    const addElementModificator = () => {
      for (let el of burgerMenuOptions.keys()) {
        el.classList.toggle(burgerMenuOptions.get(el));
      }
    }
    if (burgerMenu.classList.contains('header__burger-menu_active') && !document.querySelector('.overlay')) {
      addFullBackgroundOverlay();
    }
    
    addElementModificator();

  }

  const addEventOnClick = () => {
    burgerMenu.addEventListener('click', burgerMenuClassToggle)
  }
  
  const burgerLinksBehavior = () => {
    const removeActiveClasses = (event) => {
      if (burgerMenu.classList.contains('header__burger-menu_active')) {
        if(event.target.closest('.nav__item') || (!event.target.closest('.nav') && !event.target.closest('.header__burger-menu_active'))) {
          removeFullBackgroundOverlay();
          for (let el of burgerMenuOptions.keys()) {
            burgerMenu.classList.remove('header__burger-menu_active');
            el.classList.remove(burgerMenuOptions.get(el));
          }
        }
      } else {
        removeFullBackgroundOverlay();
      }
    }

    body.addEventListener('click', removeActiveClasses);
  }

  addEventOnClick();

  burgerLinksBehavior();
}