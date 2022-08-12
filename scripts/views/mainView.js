import PageComponentView from './pageComponentView';

/**
 * A MainView represents a visual representation of the main semantic tag in the page
 */
class MainView extends PageComponentView {
  /**
   * constructor of the MainView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new MainView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('.main'), errorMessage);
  }

  /**
   * @override
   */
  _generateMarkup() {
    return `
    ${
      this._data === '/'
        ? `
    <section class="main__photographer-list" role="list">
    </section>
    `
        : `
    <section class="main__photographer-infos"></section>
    <section class="main__photographer-photos"></section>
    `
    }
      `;
  }
}

/**
 * The module exports an instance of the MainView
 */
export default new MainView('Erreur de chargement du contenu');
