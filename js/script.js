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

 // Step 6 - updates total cost depending on selections
 //let checkboxes = document.querySelectorAll('.activities input');
 let activitiesFieldset = document.querySelector('.activities');
 let totalCostDisplay = document.querySelector('.activities-cost');
 let totalCost = 0;

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