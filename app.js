const API= 'http://localhost:3000'

const grid = document.getElementById('grid')
const info = document.getElementById('info')
const loader = document.getElementById('loader')

const btnUsers = document.getElementById('btnUsers')
const btnBooks = document.getElementById('btnBooks')
btnUsers.addEventListener('click', () => loadUsers())
btnBooks.addEventListener('click',() => loadBooks())

async function loadUsers() {
    grid.innerHTML="";
    try {
        const res = await fetch (`${API}/users`);
        if (!res.ok) throw new Error ("no se pueden obtener los usuarios")
            const users= await res.json()
        renderUsers(users)
    }
catch(error){
    console.error("Error al cargar usuarios:", error);
    
}
}

async function loadBooks(){
     grid.innerHTML="";
    try {
        const res = await fetch (`${API}/books`);
        if (!res.ok) throw new Error ("no se pueden obtener los libros")
            const books= await res.json()
        renderBooks(books)
    }
catch(error){
    console.error("Error al cargar libros:", error);
    
}
    
}
function renderUsers(users = []) {
    if (users.length === 0) {
        grid.innerHTML = "<p>No hay usuarios para mostrar</p>";
        return;
    }

    grid.innerHTML = users.map(user => {

        const collection = user.coleccion
            .map(book => `<li>${book}</li>`)
            .join("");

        const wishlist = user.wishlist
            .map(book => `<li>${book}</li>`)
            .join("");

        return `
            <div class="user-card">

                <h3>${user.nombre} ${user.apellidos}</h3>

                <p class="user-email">
                    <strong>Email:</strong> ${user.correo}
                </p>

                <div class="books books-collection">
                    <h4>Colección</h4>
                    <ul class="book-list">
                        ${collection}
                    </ul>
                </div>

                <div class="books books-wishlist">
                    <h4>Wishlist</h4>
                    <ul class="book-list">
                        ${wishlist}
                    </ul>
                </div>

            </div>
        `;
    }).join("");
}


function renderBooks(books = []) {
    if (books.length === 0) {
        grid.innerHTML = "<p>No hay libros para mostrar</p>";
        return;
    }

    grid.innerHTML = books.map(book => {

        const fecha = new Date(book.fechaPublicacion).getFullYear();

        return `
            <div class="book-card">
                <img src="${book.imagen}" alt="${book.titulo}">

                <div class="book-info">
                    <h3>${book.titulo}</h3>
                    <p class="autor">${book.autor}</p>
                    <p class="fecha">Publicado: ${fecha}</p>
                </div>
            </div>
        `;
    }).join("");
}
