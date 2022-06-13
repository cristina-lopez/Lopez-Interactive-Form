// Step 3 - putting focus on the "Name" element
let nameElementFocus = document.getElementById('name');
nameElementFocus.focus();

// Step 4 - hiding/showing "Other Job Role" input depending on selection
let otherJobRole = document.getElementById('other-job-role');
let jobTitle = document.getElementById('title');
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

 // Step 5 - Showing the color options appropriate to the selected t-shirt design
 let shirtColor = document.getElementById('color');
 let designChoice = document.querySelector('#design');
 let colorOptions = document.querySelectorAll('#color option');;
 console.log(shirtColor);
 console.log(designChoice);
 console.log(colorOptions);
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