const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isClickedSuccess = (evt) => evt.currentTarget === successMessage;
const isClickedError = (evt) => evt.currentTarget === errorMessage;
const isBodyContains = (element) => document.body.contains(element);

const onMessageClick = (evt) => {
  if (isClickedSuccess(evt)) {
    closeSuccessMessage();
  } else if (isClickedError(evt)) {
    closeErrorMessage();
  }
};

const onMessageEscKeydown = (evt) => {
  if (isBodyContains(successMessage) && isEscEvent(evt)) {
    closeSuccessMessage();
  } else if (isBodyContains(errorMessage) && isEscEvent(evt)) {
    closeErrorMessage();
  }
};

function closeSuccessMessage () {
  successMessage.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  successMessage.removeEventListener('click', onMessageClick);
}

function closeErrorMessage () {
  errorMessage.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  errorMessage.removeEventListener('click', onMessageClick);
}

const showSuccessMessage = () => {
  document.body.append(successMessage);

  document.addEventListener('keydown', onMessageEscKeydown);
  successMessage.addEventListener('click', onMessageClick);
};

const showErrorMessage = () => {
  document.body.append(errorMessage);

  document.addEventListener('keydown', onMessageEscKeydown);
  errorMessage.addEventListener('click', onMessageClick);
};

export { showSuccessMessage, showErrorMessage };
