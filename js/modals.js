const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);

const onSuccessAction = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    successMessage.remove();
  } else if (evt.currentTarget === successMessage) {
    successMessage.remove();
  }
};

const showSuccessMessage = () => {
  document.body.append(successMessage);

  document.addEventListener('keydown', onSuccessAction);
  successMessage.addEventListener('click', onSuccessAction);
};

const onErrorAction = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    errorMessage.remove();
  } else if (evt.currentTarget === errorMessage) {
    errorMessage.remove();
  }
};

const showErrorMessage = () => {
  document.body.append(errorMessage);

  document.addEventListener('keydown', onErrorAction);
  errorMessage.addEventListener('click', onErrorAction);
};

export { showSuccessMessage, showErrorMessage };
