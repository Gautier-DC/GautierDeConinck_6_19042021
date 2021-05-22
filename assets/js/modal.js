//MODAL JS
export const setModal = () => {
  // DOM Selector
  let closeBtn = document.querySelector(".close-btn");
  let modal = document.querySelector(".modal");
  let modalWrapper = document.querySelector(".modal-wrapper");
  let formContact = document.forms["contact"];
  let valmessage = document.createElement('p');
  let buttonClose = document.createElement("button");

  // Launch modal form
  const launchModal = () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    valmessage.remove();
    buttonClose.remove();
    modalWrapper.classList.remove('message-sended');
    formContact.style.display = 'block';
  };

  // Modal launch event
  document.querySelector(".open-modal-btn").addEventListener("click", launchModal);

  // Close modal form
  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  // Modal close event
  closeBtn.addEventListener("click", closeModal);

  //function check if it's empty
  function nameCheked(value) {
    value = value.trim();
    if (value != "" && value.length > 2 && value != null) {
      return true;
    } else if (/\d/.test(value)) {
      return false;
    } else {
      return false;
    }
  }

  //function check if it's an email
  function isEmail(value) {
    const regEmail = new RegExp("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$", "i");

    if (regEmail.test(value)) {
      return true;
    }
    return false;
  }

  //function for error message span building
  const createErrorSpan = (message) => {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error";
    errorMessage.innerHTML = message;
    return errorMessage;
  };

  // Validation of the formular
  const validate = () => {
    let isErrors = false;
    let firstName = formContact["firstName"];
    let lastName = formContact["lastName"];
    let email = formContact["email"];
    document.querySelectorAll(".error").forEach((error) => error.remove());
    document.querySelectorAll(".error--bg").forEach((error) => error.classList.remove("error--bg"));
    if (!nameCheked(firstName.value)) {
      isErrors = true;
      firstName.classList.add("error--bg");
      firstName.insertAdjacentElement("afterend", createErrorSpan("Veuillez entrer 2 caractères ou plus pour le prénom."));
    }
    if (!nameCheked(lastName.value)) {
      isErrors = true;
      lastName.classList.add("error--bg");
      lastName.insertAdjacentElement("afterend", createErrorSpan("Veuillez entrer 2 caractères ou plus pour le nom."));
    }
    if (!isEmail(email.value)) {
      isErrors = true;
      email.classList.add("error--bg");
      email.insertAdjacentElement("afterend", createErrorSpan("Veuillez entrer une adresse mail valide."));
    }
    if (isErrors == true) {
      return false;
    } else {
      formContact.style.display = 'none';
      modalWrapper.classList.add('message-sended');
      valmessage.innerHTML='Merci, votre formulaire a bien été envoyé !';
      modalWrapper.append(valmessage);
      buttonClose.innerHTML = `<i class="fas fa-times close-btn"></i>`;
      modalWrapper.appendChild(buttonClose);
      buttonClose.addEventListener ("click", closeModal);
      return false;    
    }
  };
};
