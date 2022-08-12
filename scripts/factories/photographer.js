import { PROFILE_PICTURES_FOLDER } from '../utils/config';

export const photographerFactory = data => {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `${PROFILE_PICTURES_FOLDER}${portrait}`;

  const getUserCardDOM = () => {
    const markup = `
    <article class="card" role="listitem">
      <a href="#" class="card__link" data-id="${id}" role="link" aria-labelledby="card__name--${id}" aria-describebdy="card__label-description--${id}">
        <img src="assets/photographers/${portrait}" class="card__portrait" alt="Photo de profil de ${name}" aria-hidden="true" />
        <div id="card__name--${id}" class="card__name">${name}</div>
        <span id="card__label-description--${id}" class="card__label-description hidden">Page du photographe ${name}</span>
      </a>
      <h2 class="hidden">${name}</h2>
      <div class="card__description">
        <p class="card__location" aria-label="Location">
          <span class="card__city">${city}</span>,
          <span class="card__country">${country}</span>
        </p>
        <p class="card__tagline" aria-label="Slogan">${tagline}</p>
        <p class="card__price" aria-label="Prix">
          <span class="card__price-value">${price}</span>
          <span class="card__price-currency">€</span>/jour
        </p>
      </div>
    </article>
    `;
    return markup;
  };
  return { name, picture, getUserCardDOM };
};
