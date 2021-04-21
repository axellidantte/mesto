const validationConfig = {
    formSelector:         ".pop-up__form",
    inputSelector:        ".pop-up__input",
    submitButtonSelector: ".pop-up__button",
    inactiveButtonClass:  "pop-up__button_disabled",
    inputErrorClass:      "pop-up__input_type_error",
    errorClass:           "pop-up__error_visible",
    errorMessageInput: "Вы пропустили это поле.",
    errorMessageUrl: "Введите адрес сайта."
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => evt.preventDefault());

      setEventListeners(formElement, validationConfig);
  });
};

const showInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    setCustomError(formElement, inputElement, validationConfig);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.classList.remove(validationConfig.errorClass);
    inputElement.classList.remove(validationConfig.inputErrorClass);
};

const checkInput = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, validationConfig);
    } else {
        showInputError(formElement, inputElement, validationConfig);
    }
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            toggleButtonState(inputList, buttonElement, validationConfig);
            checkInput(formElement, inputElement, validationConfig);
        });
    });
};

const refreshValidationInput = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, validationConfig);
        });
        const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

        toggleButtonState(inputList, buttonElement, validationConfig);
    });
};

function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function setCustomError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (inputElement.classList.contains("popup__input_type_URL")) {
        errorElement.textContent = validationConfig.errorMessageUrl;
    } else if (!inputElement.value.length <= 0) {
        errorElement.textContent = inputElement.validationMessage;
    } else {
        errorElement.textContent = validationConfig.errorMessageInput;
    }
}

enableValidation(validationConfig);