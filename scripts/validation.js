const formsValidationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__text-type_error",
    errorClass: "popup__text-error_active",
  }; 
  
  function enableValidation(data) {
    const forms = [...document.querySelectorAll(data.formSelector)];
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(form, data);
    });
  }
  
  function handleField(form, input, config) {
    if (input.validity.valid) {
      hideError(form, input, config);
    } else {
      showError(form, input, input.validationMessage, config);
    }
  }
  
  function showError(form, input, errorMessage, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
  
  function hideError(form, input, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  const toggleButtonState = (inputList, buttonElement, object) => { 
    if (hasInvalidInput(inputList)) { 
      buttonDisabled(); 
    } else { 
      buttonElement.classList.remove(object.inactiveButtonClass); 
      buttonElement.removeAttribute('disabled', true);  
    } 
  export {buttonDisabled}
    function buttonDisabled() {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
  }
  };
  
  function setEventListeners(formElement, object) {
    const inputList = Array.from(
      formElement.querySelectorAll(object.inputSelector)
    );
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, object);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        handleField(formElement, inputElement, object);
        toggleButtonState(inputList, buttonElement, object); 
      });
    });
  }
  
  enableValidation(formsValidationConfig);
