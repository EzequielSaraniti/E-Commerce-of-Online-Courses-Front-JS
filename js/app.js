// Variable
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const numeroItems = document.querySelector(".numeroItems");
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners(){
    //Cuando agregamos un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso)

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () =>{

        articulosCarrito = []; //Vaciamos el carrito
        limpiarHTML(); //Limpiamos el HTML

    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
    const cursoSeleccionado = e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado);
};
}

//Eliminamos curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")

        //Elimina del arreglo articulos del carrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )

        //Volvemos a actualizar el DOM
        carritoHTML()
    }
}

//Lee el contenido del HTML y extrae la información del curso
function leerDatosCurso(curso){

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //Revisamos si un elemento ya está agregado al carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );

    if (existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retornamos el objeto actualizado
            } else{
                return curso; //Retornamos objetos no actualizados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agrega elementos al array del carrito

    carritoHTML()
    
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiamos el HTML:
    limpiarHTML();

    //Recorremos el carrito y genera el HTML
    articulosCarrito.forEach((curso)=>{
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `

        //Agrega el HTML del carrito en el body
        contenedorCarrito.appendChild(row);
    })

    if(articulosCarrito.length > 0){
        numeroItems.innerHTML = articulosCarrito.length
        numeroItems.style.visibility = "visible"
    }else{
        numeroItems.style.visibility = "hidden"
    }

}

//Eliminamos los cursos del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = "";

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    numeroItems.style.visibility = "hidden"
}