//REMOVE CODE BELOW
// const modal = document.querySelector('#modal');
// const modalHeader = document.querySelector('h2');
// const modalExit = modal.querySeelctor('i a');
// const modalContent = document.querySelector('article');


// //Loads an appripriate page based on its url path 
// async function loadForms(category, id) {
//     modalContent.innerHTML = '';
//     modal.style.display = 'block';
//     if(id === 'new') {
//         renderRegistrationForm();
//     }
//     //  else {
//     //     const data = await getItem(category, id);
//     //     category === 'login' ? renderLoginForm() : renderHabitForm();
//     // }
    
// }
//REMOVE CODE ABOVE 

function renderLoginForm() {
    const fields =  [
        {tag:'input', attributes: { type:'text', name:'username', placeholder:'Username' }},
        {tag:'input', attributes: { type:'password', name:'password', placeholder:'Email' }},
        {tag:'input', attributes: { type:'submit', value:'Login'}},
    ];
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => field.setAttribute(a,v))
        form.appendChild(field);
    })
 //   form.addEventListener('submit', requestLogin)
    main.appendChild(form);
}

function renderRegisterForm() {
    const fields = [
        {tag:'input', attributes: { type:'text', name:'username', placeholder:'Username' }},
        {tag:'input', attributes: { type:'email', name:'email', placeholder:'Email' }},
        {tag:'input', attributes: { type:'password', name:'password', placeholder:'Password' }},
        {tag:'input', attributes: { type:'password', name:'passwordConfirmation', placeholder:'Confirm password' }},
        {tag:'input', attributes: { type:'submit', value:'Create Account'}},
    ];

    // modalHeader.textContent = "Register";
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a,v]) => field.setAttribute(a,v))
        form.appendChild(field);
    })
 //   form.addEventListener('submit', requestRegistration)
    main.appendChild(form);
}


//function renderHabitForm() {};

function render404() {
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page sorry!";
    main.appendChild(error);
}
