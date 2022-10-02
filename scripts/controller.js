/**
 * File used to store all controller methods : call the view rendering and the model data loading methods
 */
import * as model from './model';
import headerView from './views/headerView';
import mainView from './views/mainView';
import indexMainView from './views/indexMainView';
import photographerMainView from './views/photographerMainView';
import formModalView from './views/formModalView';
import lightBoxModalView from './views/lightboxModalView';
import bodyView from './views/bodyView';
import { photographerFactory } from './factories/photographer';
import photographerMediasView from './views/photographerMediasView';

/**
 * Keyboard navigation items
 */
const keyCodes = [
  'ArrowUp',
  'ArrowDown',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
  'Escape',
];

/**
 * Variable that says if we are in the main navigation flow or not
 */
let mainNavigationFlow = true;

/**
 * Variable that says if we are in the contact form navigation flow or not
 */
let contactFormNavigationFlow = false;

/**
 * Variable that says if we are in the lightbox navigation flow or not
 */
let lightboxNavigationFlow = false;

/**
 * Variable that says if we are in the filter form navigation flow or not
 */
let filterFormNavigationFlow = false;

/**
 * Array containing all the focusable elements when navigating with the keyboard
 */
let focusablesArray = [];

/**
 * Array containing all the focusable elements of the contact form when navigating with the keyboard
 */
let focusablesContactFormArray = [];

/**
 * Array containing all the focusable elements of the filter form when navigating with the keyboard
 */
let focusablesFilterFormArray = [];

/**
 * Position of the focusable when navigating with the keyboard
 */
let position = 0;

/**
 * Position of the focusable when navigating with the keyboard in the contact form
 */
let positionContactForm = 0;

/**
 * Position of the focusable when navigating with the keyboard in the filter form
 */
let positionFilterForm = 0;

/**
 * boolean checking if its the first time we navigate through the components
 */
let firstTimeNavigation = true;

/**
 * Function used to reset the array of focusables and add new focusable elements
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const resetArrayOfFocusables = () => {
  focusablesArray = Array.from(document.querySelectorAll('.focusable'));
  position = 0;
};

/**
 * Function used to navigate to the previous element in the navigation order
 * @returns {HTMLElement} the element that will have the focus on
 * @author Werner Schmid
 */
const previousFocusable = () => {
  if (!firstTimeNavigation) position--;
  if (position < 0) position = focusablesArray.length + position;
  return focusablesArray[position];
};

/**
 * Function used to navigate to the next element in the navigation order
 * @returns {HTMLElement} the element that will have the focus on
 * @author Werner Schmid
 */
const nextFocusable = () => {
  if (!firstTimeNavigation) position++;
  if (position >= focusablesArray.length)
    position = position % focusablesArray.length;
  return focusablesArray[position];
};

/**
 * Function used to navigate to the previous element in the navigation order from the contact form
 * @returns {HTMLElement} the element that will have the focus on
 * @author Werner Schmid
 */
const previousContactFormFocusable = () => {
  positionContactForm--;
  if (positionContactForm < 0)
    positionContactForm =
      focusablesContactFormArray.length + positionContactForm;
  return focusablesContactFormArray[positionContactForm];
};

/**
 * Function used to navigate to the next element in the navigation order from the contact form
 * @returns {HTMLElement} the element that will have the focus on
 * @author Werner Schmid
 */
const nextContactFormFocusable = () => {
  positionContactForm++;
  if (positionContactForm >= focusablesContactFormArray.length)
    positionContactForm =
      positionContactForm % focusablesContactFormArray.length;
  return focusablesContactFormArray[positionContactForm];
};

/**
 * Function used to navigate to the previous element in the navigation order from the filter form
 * @returns {HTMLElement} the element that will have the focus on
 * @author Werner Schmid
 */
const previousFilterFormFocusable = () => {
  positionFilterForm--;
  if (positionFilterForm < 0)
    positionFilterForm = focusablesFilterFormArray.length + positionFilterForm;
  return focusablesFilterFormArray[positionFilterForm];
};

/**
 * Function used to navigate to the next element in the navigation order from the filter form
 * @returns {HTMLElement} the element that will have the focus on
 * @author Werner Schmid
 */
const nextFilterFormFocusable = () => {
  positionFilterForm++;
  if (positionFilterForm >= focusablesFilterFormArray.length)
    positionFilterForm = positionFilterForm % focusablesFilterFormArray.length;
  return focusablesFilterFormArray[positionFilterForm];
};

/**
 * Function used to handle the keyboard pressed event when being on a page
 * @param {string} code the keyboard code of the pressed control on the keyboard of the user
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const handleBodyKeyBoardNavigation = code => {
  if (!mainNavigationFlow) return;
  switch (code) {
    case 'Enter':
      if (
        document.querySelector('.main__photographer-filter-input') !==
        focusablesArray[position]
      )
        focusablesArray[position].click();
      else
        document.querySelector('.main__photographer-filter-open-btn').click();
      break;
    case 'ArrowLeft':
      previousFocusable().focus();
      break;
    case 'ArrowRight':
      nextFocusable().focus();
      break;
    case 'Tab':
      nextFocusable().focus();
      break;
  }
  firstTimeNavigation = false;
};

/**
 * The method takes care of rendering the header semantic tag of the HTML page based on the url
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderHeader = () => {
  // Render the header of the page
  if (model.state.reload) {
    headerView.reload(model.state.url);
    return;
  }

  headerView.render(model.state.url);
};

/**
 * The method takes care of rendering the main semantic tag of the HTML page based on the url
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderMain = () => {
  // Render the main of the page
  mainView.render(model.state.url);
};

/**
 * The method takes care of rendering the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderFormModal = factory => {
  // Set the photographer Factory for the view
  formModalView.setPhotographerFactory(factory);

  // Render the contact form on a photographer page
  formModalView.render(model.state.photographer.data, false);
};

/**
 * The method takes care of displaying the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const displayModal = () => {
  const modalBg = document.querySelector('.form-modal__background');
  modalBg.style.display = 'block';
  setTimeout(() => {
    modalBg.dataset.hidden = false;
    //document.getElementById('firstname').focus();
  }, 500);
  const modal = modalBg.querySelector('.form-modal');
  modal.setAttribute('aria-hidden', false);
  position = focusablesArray.indexOf(
    document.querySelector('.btn--open.focusable')
  );
  mainNavigationFlow = false;
  contactFormNavigationFlow = true;
  focusablesContactFormArray = Array.from(
    document.querySelectorAll('.modal-focusable')
  );
  positionContactForm = 0;
  focusablesContactFormArray[positionContactForm].focus();
  firstTimeNavigation = false;
};

/**
 * The method takes care of hidding the contact form in a photographer page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const closeModal = () => {
  const modalBg = document.querySelector('.form-modal__background');
  modalBg.dataset.hidden = true;
  setTimeout(() => {
    modalBg.style.display = 'none';
  }, 1000);
  const modal = modalBg.querySelector('.form-modal');
  modal.setAttribute('aria-hidden', true);
  mainNavigationFlow = true;
  contactFormNavigationFlow = false;
  focusablesArray[position].focus();
};

/**
 * Function used to handle the submission of the contact form
 * @param {Object[]} datas Data transmitted by the form when submitting it
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const submitFormModalForm = datas => {
  // Display an alert message
  alert('Your request was submitted !');

  // Print the data in the console
  datas.forEach(data => {
    console.log(`${data.name} : ${data.value}`);
  });

  // Close the contact form modal
  closeModal();
};

/**
 * Function used to handle the navigation when the form modal is open
 * @param {string} code code of the keyboard element that was pressed by the user
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const handleModalNavigation = code => {
  if (!contactFormNavigationFlow) return;
  switch (code) {
    case 'Escape':
      document.querySelector('.form-modal__close-btn').click();
      break;
    case 'Enter':
      if (
        focusablesContactFormArray[positionContactForm].classList.contains(
          'clickable'
        )
      )
        focusablesContactFormArray[positionContactForm].click();
      else focusablesContactFormArray[positionContactForm].value += '\n';
      break;
    case 'ArrowUp':
      previousContactFormFocusable().focus();
      break;
    case 'ArrowBottom':
      nextContactFormFocusable().focus();
      break;
    case 'Tab':
      nextContactFormFocusable().focus();
      break;
  }
};

/**
 * Function used to handle the focus event in the contact form
 * @param {HTMLElement} target target input element that receives the focus in the contact form
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const handleFocusOnContactFormFocusable = target => {
  positionContactForm = focusablesContactFormArray.indexOf(target);
};

/**
 * Function used to render the lightbox containing the media to display
 * @param {Object} factory The photographer factory
 * @param {string} mediaId The id of the media we want to display
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderLightboxModal = (factory, mediaId = '') => {
  // Set the photographer Factory for the View
  lightBoxModalView.setPhotographerFactory(factory);

  // Update the media stored in the model
  model.updateDisplayedMedia(factory.mediasFactory.currentMedia(mediaId));

  // Render the lightbox modal view on a photographer page
  lightBoxModalView.render(model.state.displayedMedia, false);
};

/**
 * Function used to display the lightbox when hidden
 * @param {Object} factory the photographer factory
 * @param {string} mediaId The id of the media we want to display
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const displayLightBox = (factory, mediaId) => {
  // Update the media in the model and the media displayed inside the view
  updateItemLightBox(factory, mediaId);

  // Display the lightbox view
  const lightBoxBg = document.querySelector('.lightbox-modal__background');
  lightBoxBg.style.display = 'block';
  setTimeout(() => {
    lightBoxBg.dataset.hidden = false;
  }, 500);
  const lightbox = lightBoxBg.querySelector('.lightbox-modal');
  lightbox.setAttribute('aria-hidden', false);
  lightbox.dataset.id = mediaId;

  position = focusablesArray.indexOf(
    document.querySelector(`.card-media__link[data-id="${mediaId}"]`)
  );
  mainNavigationFlow = false;
  lightboxNavigationFlow = true;
  firstTimeNavigation = false;
};

/**
 * Function used to close the lightbox when it is displayed
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const closeLightBox = () => {
  const lightBoxBg = document.querySelector('.lightbox-modal__background');
  lightBoxBg.dataset.hidden = true;
  setTimeout(() => {
    lightBoxBg.style.display = 'none';
  }, 1000);
  const lightbox = lightBoxBg.querySelector('.lightbox-modal');
  const mediaId = lightbox.dataset.id;
  lightbox.setAttribute('aria-hidden', true);
  position = focusablesArray.indexOf(
    document.querySelector(`.card-media__link[data-id="${mediaId}"]`)
  );
  mainNavigationFlow = true;
  lightboxNavigationFlow = false;
  focusablesArray[position].focus();
};

const handleLightBoxNavigation = code => {
  if (!lightboxNavigationFlow) return;
  switch (code) {
    case 'ArrowLeft':
      document.querySelector('.lightbox-modal__previous-btn').click();
      break;
    case 'ArrowRight':
      document.querySelector('.lightbox-modal__next-btn').click();
      break;
    case 'Escape':
      document.querySelector('.lightbox-modal__close-btn').click();
      break;
  }
};

const navigateToAdjacentImage = (factory, behavior) => {
  // Update the media element in the model
  model.updateDisplayedMedia(factory.mediasFactory[behavior]());

  // Update the media in the model and the media displayed inside the view
  updateItemLightBox(factory, model.state.displayedMedia.id);
};

/**
 * Function used to update the content inside the lightbox modal
 * @param {Object} factory the photographer factory
 * @param {string} mediaId The id of the media we want to display
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const updateItemLightBox = (factory, mediaId) => {
  // Update the media stored in the model
  model.updateDisplayedMedia(factory.mediasFactory.currentMedia(mediaId));

  // Update the current media in the view
  lightBoxModalView.updateMedia(model.state.displayedMedia).catch(err => {
    console.error(err);
  });
};

const addFocusAnimation = btn => {
  btn.dataset.firstFocus = false;
};

/**
 * The method takes care of rendering the main semantic view content in the main page, containing the list of photographers
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlRenderMainPage = async () => {
  try {
    // Get the list of all photographers
    await model.getPhotographers();

    // Render the main content of the index page
    indexMainView.render(model.state.photographers);

    // Set the focusable array
    resetArrayOfFocusables();
  } catch (err) {
    throw err;
  }
};

/**
 * The method takes care of rendering the main semantic view of a photographer page and instanciate the photographer factory for the page
 * @param {number} id ID of the photographer that will be rendered
 * @returns {Object} The photographer factory for the user with the ID of id
 * @author Werner Schmid
 */
const controlRenderMainPhotographerPage = async id => {
  try {
    // Get the photographer data from the API
    await model.getPhotographer(id);

    // Get the photographer factory from the model
    const factory = photographerFactory(model.state.photographer);

    // Set the photographer Factory for the view
    photographerMainView.setPhotographerFactory(factory);

    // Render the photographer main content
    photographerMainView.render(model.state.photographer);

    // Returns the photographer factory
    return factory;
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to handle the aria attribute of an input and its position inside the parent grid element
 * @param {HTMLElement} element Element to which we want to change the aria-checked attribute
 * @param {boolean} value New value taken by the aria-checked attribute (false or true)
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const handleFilterInputElement = (element, value) => {
  // Set the aria-checked attribute of the element
  element.ariaChecked = value;
  element.setAttribute('aria-checked', value);

  // Get the label related to the element
  const id = element.getAttribute('id');

  const label = document.querySelector(`label[for="${id}"]`);

  // Display the label in the first position if the aria-checked value is true, display in its declaration order otherwise
  value
    ? label.setAttribute('style', 'grid-row: 1 / 2')
    : label.style.removeProperty('grid-row');
};

/**
 * Function used to change the displayed selected option in the filter form
 * @param {HTMLElement} element choosen input option that will displayed in the filter form
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const changeDisplayedSortingOption = element => {
  // Modify the aria-checked parameter of the element
  handleFilterInputElement(element, true);

  // Change the position of the element in the list
  element.style.gridRow = '1 / 2';

  // Get the id of the element and the label of the element
  const id = element.getAttribute('id');
  const label = document.querySelector(`label[for="${id}"]`);

  // Modify the choosen option displayed in the page
  document.querySelector(
    '.main__photographer-filter-choosen-option'
  ).textContent = label.textContent;
};

/**
 * Function used to handle the click on the Filter form
 * @param {target} target Targeted element when the user clicks on the filter form
 * @param {boolean} keyboard boolean that says if the user navigates with his keyboard or not (false by default)
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const mouseUpFilterForm = (target, keyboard = false) => {
  const filterInputContainer = document.querySelector(
    '.main__photographer-filter-input'
  );

  filterInputContainer.dataset.clicked =
    target === filterInputContainer ? true : false;

  mainNavigationFlow = target === filterInputContainer ? false : true;

  filterFormNavigationFlow = target === filterInputContainer ? true : false;
  position = focusablesArray.indexOf(
    document.querySelector('.main__photographer-filter-input')
  );
  focusablesArray[position].focus();
  focusablesFilterFormArray = Array.from(
    document.querySelectorAll('.filter-focusable')
  );
  positionFilterForm = 0;
  focusablesFilterFormArray[positionFilterForm].focus();
  if (keyboard)
    document
      .querySelector(
        '.main__photographer-filter-option-label[style="grid-row: 1 / 2"]'
      )
      .focus();
  firstTimeNavigation = false;
};

/**
 * The method takes care of re-rendering the medias view based on the select option
 * @param {HTMLElement} input the targeted input element by the user
 * @param {HTMLElement} checkedInput the previously checked input option
 * @param {HTMLElement} filterForm the filter form
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const controlSelectFilterOption = (input, checkedInput, filterForm) => {
  const filterInputContainer = document.querySelector(
    '.main__photographer-filter-input'
  );

  if (input != checkedInput) {
    handleFilterInputElement(checkedInput, false);
    changeDisplayedSortingOption(input);
  }

  filterInputContainer.dataset.clicked = false;

  // Once the outputed value is changed, we submit the form
  filterForm.querySelector('.main__photographer-submit-btn').click();
};

const handleFilterFormNavigation = code => {
  if (!filterFormNavigationFlow) return;
  switch (code) {
    case 'ArrowUp':
      previousFilterFormFocusable().focus();
      break;
    case 'ArrowDown':
      nextFilterFormFocusable().focus();
      break;
    case 'Tab':
      nextFilterFormFocusable().focus();
      break;
    case 'Enter':
      focusablesFilterFormArray[positionFilterForm].click();
      break;
  }
};

/**
 * Function that takes care of handling the submission of the filter form and re-rendering the media list
 * @param {HTMLElement} filterForm Filter form that was submitted
 * @param {Object} photographerFactory The photographer factory, used to re-render the medias
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const submitFilterForm = (filterForm, photographerFactory) => {
  // Retrieve the checked input
  const [checkedInput] = Array.from(filterForm.elements).filter(
    element => element.type === 'radio' && element.checked
  );
  const checkedValue = Number.parseInt(checkedInput.value);

  //Re-render the list of medias
  photographerMediasView.updateMediaList(checkedValue);
  focusablesArray = Array.from(document.querySelectorAll('.focusable'));
  mainNavigationFlow = true;
  filterFormNavigationFlow = false;
};

/**
 * Function that takes care of registering the like of the user on a media
 * @param {HTMLElement} likeBtn Like btn link that was clicked
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const likeImage = likeBtn => {
  const totalLikesSpan = document.querySelector('.main__photographer-nb-likes');
  let totalLikes = Number.parseInt(totalLikesSpan.textContent);
  const mediaId = Number.parseInt(likeBtn.dataset.id);
  const newStatus = likeBtn.dataset.liked === 'true' ? false : true;

  const nbLikesElement = likeBtn.parentElement.querySelector(
    '.card-media__nb-likes'
  );
  let nbLikes = Number.parseInt(nbLikesElement.textContent);

  // Store / Remove the like from the data (model function)
  const likeResult = model.likeImage(mediaId, newStatus);
  if (likeResult === 0) return;

  // Update the number of likes on the media
  nbLikesElement.textContent = nbLikes + likeResult;

  // Fill the like heart
  likeBtn
    .querySelector('svg')
    .classList[newStatus ? 'add' : 'remove']('icon-heart--filled');
  // Set the media data-liked attribute to the new status
  likeBtn.dataset.liked = newStatus;

  // Re-render the photographer description likes
  totalLikesSpan.textContent = totalLikes + likeResult;
};

/**
 * Function used to handle the navigation in the site without reloading the page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const navigateTo = url => {
  model.setUrl(url);
  history.pushState(null, null, model.state.url);
  reload().catch(err => {
    console.error(err.message);
  });
};

/**
 * Function used to render the views of the page
 * @returns {Promise} a resolved promise if it achieved to render the views and a rejected one otherwise
 * @author Werner Schmid
 */
const renderComponents = async () => {
  try {
    // Non existing page
    if (
      model.state.url !== '/' &&
      model.state.url.slice(0, 13) !== '/photographer'
    ) {
      throw new Error('Not Found');
    }
    if (model.state.url === '/') {
      // Render the list of photographers if we are on the main page
      // Add the event listeners for the main page
      // DISPLAY
      await controlRenderMainPage();
      // EVENT LISTENERS
      if (!model.state.reload) {
        bodyView.addHandlerClick(navigateTo);
        bodyView.addHandlerKeyDown(handleBodyKeyBoardNavigation);
      }
      firstTimeNavigation = true;
      return;
    }

    // Render the photographer Header, the photographer Photo list and the form modal if we are on a photographer page
    // Add the event listeners for a photographer page
    if (model.state.url.slice(0, 13) === '/photographer') {
      // Get the id of the photographer that has to be rendered
      const id = Number(model.state.url.slice(14));
      if (isNaN(id)) throw new Error('Not Found');
      // DISPLAY
      const factory = await controlRenderMainPhotographerPage(id);
      controlRenderFormModal(factory);
      controlRenderLightboxModal(factory);
      resetArrayOfFocusables();

      // EVENT LISTENERS
      photographerMainView.addHandlerClick(displayModal);
      photographerMainView.addHandlerFocus(addFocusAnimation);
      photographerMainView.addHandlerClickMedias(displayLightBox);
      photographerMainView.addHandlerMouseUpFilterForm(mouseUpFilterForm);
      photographerMainView.addHandlerClickFilterFormOption(
        controlSelectFilterOption
      );
      photographerMainView.addHandlerSubmitFilterForm(submitFilterForm);
      photographerMainView.addHandlerKeyboardFilterForm(
        handleFilterFormNavigation
      );
      photographerMainView.addHandlerLikeImage(likeImage);

      formModalView.addHandlerClick(closeModal);
      formModalView.addHandlerFocus(handleFocusOnContactFormFocusable);
      formModalView.addHandlerSubmit(submitFormModalForm);
      formModalView.addHandlerNavigation(handleModalNavigation);

      lightBoxModalView.addHandlerClick(closeLightBox, navigateToAdjacentImage);
      lightBoxModalView.addHandlerNavigation(handleLightBoxNavigation);
      if (!model.state.reload) {
        bodyView.addHandlerKeyDown(handleBodyKeyBoardNavigation);
      }
      firstTimeNavigation = true;
      return;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Function used to reload the views of the page
 * @returns {Promise} a resolved promise if it achieved to reload the views and a rejected one otherwise
 * @author Werner Schmid
 */
const reload = async () => {
  try {
    // Reload the Header and the Main View in the page
    controlRenderHeader();
    controlRenderMain();

    // Render the components of the page
    await renderComponents();
  } catch (err) {
    throw err;
  }
};

/**
 * Router function used to initialize the whole web page and the initial state of the page
 * @returns {undefined} No returned value by the function
 * @author Werner Schmid
 */
const init = async () => {
  try {
    // Get the url of the user and store it in the model
    const url = document.location.href.replace(document.location.origin, '');

    // Store the url into the state object
    model.setUrl(url);

    // Render the Header and the Main View in the page
    await Promise.all([
      headerView.addHandlerLoadPage(controlRenderHeader),
      mainView.addHandlerLoadPage(controlRenderMain),
    ]);

    // Render the components of the page
    await renderComponents();
    model.setReload(true);
  } catch (err) {
    throw err;
  }
};

/**
 * Initialisation of the application
 */
init().catch(err => {
  console.error(err.message);
});
window.addEventListener('popstate', event => {
  event.preventDefault();
  navigateTo(document.location.href.replace(document.location.origin, ''));
});
window.addEventListener('keydown', event => {
  if (keyCodes.some(keyCode => keyCode === event.code)) event.preventDefault();
});
