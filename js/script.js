// Coded by Gonzalo Nuñez & Adrián Giner
let boton = document.getElementById(`fetchJoke`);
let lista = document.getElementById("jokeList");

let delAllButton = document.getElementById(`removeAll`);

boton.addEventListener(`click`, function(){
    event.preventDefault();
    getJoke();
});



setDataStorage();

function getJoke() {
    fetch('https://api.chucknorris.io/jokes/random')
    .then((response) => {
        if(!response.ok) {
            throw new Error('La solicitud no fue existosa');
        } else {
            return response.json();
        }
    })
    .then((data) => {
        
        const jokesArr = localStorage.getItem('chistes');

        const parseJoke = JSON.parse(jokesArr);

        let newJokes = [...parseJoke, data.value];
        
        newJokes = JSON.stringify(newJokes);

        localStorage.setItem('chistes', newJokes);
        
        showJoke()
    })
        
}
function showJoke() {
    const jokesArr = localStorage.getItem('chistes');
    const parseJoke = JSON.parse(jokesArr);
    lista.innerText = '';

    parseJoke.forEach((chiste, index) => {
    
        let chisteEnLista = document.createElement(`li`)
        chisteEnLista.innerText = chiste;

        lista.appendChild(chisteEnLista)

        let botonBorrar = document.createElement("button");
        botonBorrar.innerText = `Borrar`;
        botonBorrar.classList.add('delButton');
        chisteEnLista.appendChild(botonBorrar)

        botonBorrar.addEventListener('click', function() {

            let jokesArr2 = localStorage.getItem('chistes');
            let parseJoke2 = JSON.parse(jokesArr2);

            parseJoke2.splice(index, 1)

            parseJoke2 = JSON.stringify(parseJoke2);

            localStorage.setItem('chistes', parseJoke2)
            
            lista.removeChild(chisteEnLista);
        })
    }
)};

function setDataStorage() {
    if(localStorage.getItem('chistes') === null ){
        localStorage.setItem('chistes', JSON.stringify([]));
    }
    
    const values = JSON.parse(localStorage.getItem('chistes'));
    showJoke();
}



delAllButton.addEventListener('click', () => {
    event.preventDefault();
    localStorage.removeItem('chistes');
    lista.innerHTML = '';
    setDataStorage();
})


