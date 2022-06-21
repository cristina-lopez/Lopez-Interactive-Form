// Variables
// for Name section
let nameElement = document.querySelector('#name');
// for email validation
let emailInput = document.querySelector('#email');
// for Job section
let otherJobRole = document.getElementById('other-job-role');
let jobTitle = document.getElementById('title');
// for t-Shirt section
let shirtColor = document.getElementById('color');
let designChoice = document.querySelector('#design');
let colorOptions = document.querySelectorAll('#color option');
// for activity section
let activitiesFieldset = document.querySelector('.activities');
let totalCostDisplay = document.querySelector('.activities-cost');
let totalCost = 0;
// for activity validation and accessibility
let activityMessage = document.querySelector(".activities-box");
let checkboxes = document.querySelectorAll('input[type=checkbox]');
// for payment section
let paymentMethodChosen = document.querySelector('#payment');
let paymentMethodOptions = document.querySelectorAll('#payment option');
let ccDiv = document.querySelector('#credit-card');
let paypalDiv = document.querySelector('#paypal');
let bitcoinDiv = document.querySelector('#bitcoin');
// for credit card validation
let cardNumber = document.querySelector('#cc-num');
let zipCode = document.querySelector('#zip');
let cvv = document.querySelector('#cvv');
// for the form
let formElement = document.querySelector("form");

// Name - puts focus on the "Name" element once the page is loaded.
nameElement.focus();

// Job Role - shows "Other Job Role" input if user selects "Other". 
// Hides "Other Job Role" input if user selects any other option.
otherJobRole.style.display = 'none';

jobTitle.addEventListener('change', (e) => {
    e.preventDefault();
    const select_value = e.target.value;
    if (select_value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
 }); 

 // T-Shirt Info - hides the color options until user selects a 
 // design option. Based on the design option chosen, shows the shirt 
 // color options for that design.
 shirtColor.disabled = true;

 designChoice.addEventListener('change', (e) => {
    e.preventDefault();
    shirtColor.disabled = false;
    for (let i=0; i<colorOptions.length; i++) {
        let dataAttribute = colorOptions[i].getAttribute('data-theme');
        let designValue = e.target.value;

        if (designValue === dataAttribute) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', true);
        }
        else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute('selected');
        }
    }
 });

 // Register for Activities - updates total cost depending on user 
 // selections for activities.
 activitiesFieldset.addEventListener('change', (e) => {
    e.preventDefault();
    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked) {
        totalCost += dataCost;
    } else if (!(e.target.checked)) {
        totalCost -= dataCost;
    }
    totalCostDisplay.innerHTML = `Total Cost: $${totalCost}`;
 });

 // Payment Info - makes the credit card option default and hides the 
 // Paypal & Bitcoin messages. If user selects Paypal or Bitcoin, then 
 // appropriate messages are displayed. 
 paymentMethodOptions[1].selected = true;
 paypalDiv.style.display = 'none';
 bitcoinDiv.style.display = 'none';

 paymentMethodChosen.addEventListener('change', (e) => {
    e.preventDefault();
    if (paymentMethodChosen.value === 'paypal') {
        paypalDiv.style.display = '';
        bitcoinDiv.style.display = 'none';
        ccDiv.style.display = 'none';
    } else if (paymentMethodChosen.value === 'bitcoin') {
        bitcoinDiv.style.display = '';
        paypalDiv.style.display = 'none';
        ccDiv.style.display = 'none';
    } else if (paymentMethodChosen.value === 'credit-card') {
        ccDiv.style.display = '';
        bitcoinDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
    }
 });
 
 // Form Validation - Helper functions ('nameValidation', 'emailValidation', 
 // 'activityValidation' and 'ccValidation') are included to check if name, 
 // email and credit card entries are valid & if at least one activity is chosen. 

 // Name validation helper function
function nameValidation() {
    let nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement.value);
    if (nameIsValid) {
        validationPass(nameElement);
      } else {
        validationFail(nameElement);
      }
    return nameIsValid;
}

// Email validation helper function
function emailValidation() {
    let emailIsValid = /^[^@]+@[^@]+\.com$/i.test(emailInput.value);
    if (emailIsValid) {
        validationPass(emailInput);
      } else {
        validationFail(emailInput);
      }
    return emailIsValid;
}

// Activity registration validation helper function
function activityValidation() {
    let activityValidation = totalCost > 0;
    if (activityValidation) {
        validationPass(activityMessage);
      } else {
        validationFail(activityMessage);
      }
    return activityValidation;
}

// Credit card validation helper function
function ccValidation() {
    let cardNumberValidation = /^\d{13}\d?\d?\d?$/.test(cardNumber.value);
    if (cardNumberValidation) {
        validationPass(cardNumber);
      } else {
        validationFail(cardNumber);
      }
    let zipCodeValidation = /^\d{5}$/.test(zipCode.value);
    if (zipCodeValidation) {
        validationPass(zipCode);
      } else {
        validationFail(zipCode);
      }
    let cvvValidation = /^\d{3}$/.test(cvv.value);
    if (cvvValidation) {
        validationPass(cvv);
      } else {
        validationFail(cvv);
      }
    return cardNumberValidation && zipCodeValidation && cvvValidation;;
}

// Accessibility - functions used in helper functions ('nameValidation', 
// 'emailValidation', 'activityValidation' and 'ccValidation') to show error 
// messages for invalid inputs
function validationPass(element){
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
}

function validationFail(element) {
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";  
}

// Accessibility - puts focus on the activities checkboxes
for (let i=0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', (e) => {
        checkboxes[i].parentElement.classList = "focus";
    });
    checkboxes[i].addEventListener('blur', (e) => {
        checkboxes[i].parentElement.classList.remove("focus");
    });
}

// Prevents the form from submitting if there is an error in any of the 
// required fields
formElement.addEventListener('submit', (e) => {
    if (!nameValidation() && !emailValidation() && !activityValidation()) {
        e.preventDefault();
    }
    
    if (paymentMethodChosen.value === 'credit-card') {
        if (!ccValidation()) {
            e.preventDefault();
        }
    }
});