import View from './View';

/**
 * A PhotographerHeaderView represents the presentation header of a photographer page (Name, contact form, ...)
 */
class PhotographerHeaderView extends View {
  /**
   * constructor of the PhotographerHeaderView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerHeaderView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__photographer-infos'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    <button class="btn btn--open">Contactez-moi</button>
    `;
  }

  /**
   * Function used to add an event listener on the open button subcomponent in the View
   * @param {function} handler Function that will be called when the click event happens to the open button
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerHeaderView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--open');
      if (!btn) return;

      handler();
    });
  }
}

/**
 * The module exports an instance of the PhotographerHeaderView
 */
export default new PhotographerHeaderView(
  "Erreur de chargement de l'en-tête du photographe"
);