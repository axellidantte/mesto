const validationConfig = {
    formSelector:         ".pop-up__form",
    inputSelector:        ".pop-up__input",
    submitButtonSelector: ".pop-up__button",
    inactiveButtonClass:  "pop-up__button_disabled",
    inputErrorClass:      "pop-up__input_type_error",
    errorClass:           "pop-up__error_visible",
  }
  
  const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) => {
    const formList = Array.from(
      document.querySelectorAll(formSelector)
    );
  
    formList.forEach(
      formElement => {
        formElement.addEventListener("submit", (event) => {
          event.preventDefault();
        });
        setInputListeners(formSelector, formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass);
      }
    );
  };
  
  const setInputListeners = (formSelector, formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass) => {
    const inputList = Array.from(
      formElement.querySelectorAll(inputSelector)
    );
    const buttonElement = formElement.querySelector(submitButtonSelector);
  
    inputList.forEach(
      inputElement => {
        inputElement.addEventListener("input", () => {
          checkInput(formElement, inputElement, errorClass);
          toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      }
    );
  };
  
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", true)
    } else {
      buttonElement.classList.remove(inactiveButtonClass)
      buttonElement.removeAttribute("disabled")
    }
  };
  
  const checkInput = (formElement, inputElement, errorClass) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, errorClass);
    } else {
      showInputError(formElement, inputElement, errorClass);
    }
  };
  
  const hideInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(validationConfig.inputErrorClass);
  };
  
  const showInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(validationConfig.inputErrorClass);
  };
  
  const allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };
  
  enableValidation(validationConfig);