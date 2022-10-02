import PageComponentView from './pageComponentView';

/**
 * A FormModalView represents the form used to contact a photographer
 */
class FormModalView extends PageComponentView {
  /**
   * constructor of the FormModalView class
   * @param {string} errorMessage Default error message to display when we fail to render the View
   * @returns {Object} The new FormModalView instance
   * @author Werner Schmid
   */
  constructor(errorMessage) {
    super(document.querySelector('body'), errorMessage, false);
    this._position = 0;
  }

  /**
   * @override
   */
  _generateMarkup() {
    return this._photographerFactory.getFormModal();
  }

  /**
   * Store the photographer factory into the view
   * @param {Object} factory the photographer factory
   * @returns {undefined} No returned value by the function
   * @this {Object} the current PhotographerMainView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  setPhotographerFactory(factory) {
    this._photographerFactory = factory;
  }

  /**
   * Function used to add an event listener on the close button subcomponent in the View
   * @param {function} handler Function that will be called when the click event happens to the close button of the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current FormModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.form-modal__close-btn');
      if (!btn) return;

      handler();
    });
  }

  /**
   * Function used to add an event listener on the input fields subcomponents in the View
   * @param {function} handler Function that will be called when the focus event happens to an input field in the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current FormModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerFocus(handler) {
    this._parentElement
      .querySelectorAll('.form-modal__input-field')
      .forEach(input => {
        input.addEventListener('focus', event => {
          const input = event.target.closest('.form-modal__input-field');
          if (!input) return;

          handler(input);
        });
      });
  }

  /**
   * Function used to handle the submission of the form contained in the View
   * @param {function} handler Function that will be called when the click event happens to the form
   * @returns {undefined} No returned value by the function
   * @this {Object} the current FormModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerSubmit(handler) {
    this._parentElement
      .querySelector('.form-modal__form')
      .addEventListener('submit', event => {
        event.preventDefault();
        const contactForm = event.target;
        if (!contactForm) return;

        const formElements = Array.from(contactForm.elements).filter(
          element => element.type !== 'submit'
        );
        const datas = formElements.map(formElement => {
          return { name: formElement.name, value: formElement.value };
        });
        handler(datas);
      });
  }

  /**
   * Function used to handle the click of the keyboard when the modal is opened
   * @param {function} handler Function that will be called when a keyboard event happens on the modal
   * @returns {undefined} No returned value by the function
   * @this {Object} the current FormModalView instance calling the addHandlerClick function
   * @author Werner Schmid
   */
  addHandlerNavigation(handler) {
    document.addEventListener('keydown', event => {
      handler(event.code);
    });
  }
}

/**
 * The single existing instance of the FormModalView in the application is instantiated
 */
const formModalView = new FormModalView(
  'Erreur de chargement du formulaire de contact'
);

/**
 * The module exports the single instance of the FormModalView
 */
export default formModalView;
