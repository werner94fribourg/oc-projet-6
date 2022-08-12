import View from './View';
import { photographerFactory } from '../factories/photographer';

/**
 * A PhotographerListView represents the list of all photographers appearing in the main page
 */
class PhotographerListView extends View {
  /**
   * constructor of the PhotographerListView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new PhotographerListView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main__photographer-list'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return this._data
      .map(result => photographerFactory(result).getUserCardDOM())
      .join('\n');
  }
}

/**
 * The module exports an instance of the PhotographerListView
 */
export default new PhotographerListView(
  'Erreur de chargement de la liste des photographes'
);
