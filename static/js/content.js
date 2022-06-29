const main = document.querySelector("main");
const header = document.createElement('h2');
const header2 = document.createElement('h2');


//Creates a login form
function renderLoginForm() {
    const fields =  [
        {tag:'input', attributes: { type:'text', name:'username', placeholder:'Username' }},
        {tag:'input', attributes: { type:'password', name:'password', placeholder:'Email' }},
        {tag:'input', attributes: { type:'submit', value:'Login'}},
    ];
    header.textContent = "Login";
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => field.setAttribute(a,v))
        form.appendChild(field);
    })
    form.addEventListener('submit', requestLogin)
    main.appendChild(header);
    main.appendChild(form);
}

//Creates a registration form 
function renderRegisterForm() {
    const fields = [
        {tag:'input', attributes: { type:'text', name:'username', placeholder:'Username' }},
        {tag:'input', attributes: { type:'email', name:'email', placeholder:'Email' }},
        {tag:'input', attributes: { type:'password', name:'password', placeholder:'Password' }},
        {tag:'input', attributes: { type:'password', name:'passwordConfirmation', placeholder:'Confirm password' }},
        {tag:'input', attributes: { type:'submit', value:'Create Account'}},
    ];

    header.textContent = "Register";
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => field.setAttribute(a,v))
        form.appendChild(field);
    });
    form.addEventListener('submit', requestRegistration)
    main.appendChild(header);
    main.appendChild(form);
}

//Creates a checkbox to choose a habit 
function renderHabitForm() {
    let checkboxForm = document.createElement('form');
    const habits = ['Exercise 30 min', 'Drink 8 glasses of water', 'Get 8 hours of sleep', 'Healthy meal', 'Don\'t smoke', 'Walk the dog'];

    header.textContent = "Choose a habit that you want to practise";

    for (let i = 0; i < habits.length; i++) {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = habits[i];
        checkBox.name = habits[i];
        checkBox.value = habits[i];


        let label = document.createElement('label');
        label.htmlFor = habits[i];
        label.appendChild(document.createTextNode(habits[i]));
        let br = document.createElement('br');
    
        checkboxForm.appendChild(checkBox);
        checkboxForm.appendChild(label);
        checkboxForm.appendChild(br);
        
    }
    let button = document.createElement('input');
    button.setAttribute("type", "submit");
    checkboxForm.appendChild(button);
    checkboxForm.addEventListener('submit', renderFrequencyForm)
    main.appendChild(header);
    main.appendChild(checkboxForm);

};

// Createas a checkbox form to choose a frequecy 
function renderFrequencyForm () {
    let checkboxForm = document.createElement('form');
    const frequency = [ 'Hourly', 'Daily', 'Weekly', '3-times a day'];

    header2.textContent = "Choose a frequency with which you would like to practice you habit";

    for (let i = 0; i < frequency.length; i++) {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = frequency[i];
        checkBox.name = frequency[i];
        checkBox.value = frequency[i];


        let label = document.createElement('label');
        label.htmlFor = frequency[i];
        label.appendChild(document.createTextNode(frequency[i]));
        
        let br = document.createElement('br');
    
        checkboxForm.appendChild(checkBox);
        checkboxForm.appendChild(label);
        checkboxForm.appendChild(br);
        
    }
    let button = document.createElement('input');
    button.setAttribute("type", "submit");
    checkboxForm.appendChild(button);
    checkboxForm.addEventListener('submit', postHabit);
    main.appendChild(header2);
    main.appendChild(checkboxForm);
}


function render404() {
    header.textContent = "Oops, we can't find that page sorry!";
}

