const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessage = errorMessageTemplate.cloneNode(true);

const onSuccessAction = (evt) => {
  const closeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessAction);
    successMessage.removeEventListener('click', onSuccessAction);
  };

  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeSuccessMessage();
  } else if (evt.currentTarget === successMessage) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  document.body.append(successMessage);

  document.addEventListener('keydown', onSuccessAction);
  successMessage.addEventListener('click', onSuccessAction);
};

const onErrorAction = (evt) => {
  const closeErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorAction);
    errorMessage.removeEventListener('click', onErrorAction);
  };

  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeErrorMessage();
  } else if (evt.currentTarget === errorMessage) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  document.body.append(errorMessage);

  document.addEventListener('keydown', onErrorAction);
  errorMessage.addEventListener('click', onErrorAction);
};

export { showSuccessMessage, showErrorMessage };
