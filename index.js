import{saveComment, getCommet, onGetSnapshot} from './firebase.js';

const formComent = document.getElementById('task-form');
const commentContainer = document.getElementById('list-coment');




window.addEventListener('DOMContentLoaded', async()=>{
    
    onGetSnapshot((querySnapshot) => {
        let html=''
   querySnapshot.forEach(element => {
    const comet = element.data()
    html += `
        <div>
            <h3>${comet.nombre}</h3>
            <h5>${comet.email}</h5>
            <p>${comet.coment}</p>
        </div>
    `;
    });
        commentContainer.innerHTML = html
    });
});


formComent.addEventListener('submit', (e) =>{
    e.preventDefault()
    console.log('enviado')

    const nombre = formComent['nombre']
    const email = formComent['email']
    const coment = formComent['coment']

    /* console.log(nombre.value,email.value, coment.value)  */
    saveComment(nombre.value, email.value, coment.value); 
    formComent.reset();
    
})




