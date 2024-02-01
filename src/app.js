 //Importa la libreria sweetalert2
import Swal from 'sweetalert2' 

export const app = () =>{          
           //-----VARIABLES GLOBALES-----  

    //Trae los formularios 
    let formIngresar = document.querySelector("#formIngresar");
    let formEliminar = document.querySelector("#formEliminar");
    let formAgregarStock = document.querySelector("#formAgregarStock");
    let formModificarPrecio = document.querySelector("#formModificarPrecio");
    let listaProductos = document.querySelector("#listaProductos");
           
    //Array de almacenamiento
    let productos =  JSON.parse(localStorage.getItem("productos")) || [] ;

             //-----FUNCIONES GLOBALES------

    //Agregar productos al stock
    let productoID = productos.length;        
    class Producto {
        constructor(nombre, stock, precio){
            this.nombre = nombre;
            this.stock = stock;
            this.precio = precio;
            this.productoID = productoID;
        }
    }      

    const cargarProducto = (producto) => {
        productoID++;
        producto.nombre = producto.nombre.toLowerCase();
        productos.push(producto);
        
        Swal.fire({
            title:"Nuevo producto ingresado",
            text:`PRODUCTO: ${producto.nombre} ID: ${producto.productoID}`,
            icon:"info",
            confirmButtonText:"ACEPTAR",
        })
        
        localStorage.setItem("productos", JSON.stringify(productos));
        console.log(productos);
    }

    const ingresarProducto = () => {
        let nombreInput = document.querySelector("#nombreInput");
        let stockInput = parseInt(document.querySelector("#stockInput").value);
        let precioInput = parseFloat(document.querySelector("#precioInput").value);
       
        let producto = new Producto(nombreInput.value, stockInput, precioInput);
        
        if(productos.some(producto => producto.nombre == nombreInput.value.toLowerCase())){
            Swal.fire({
                title:`El producto ${producto.nombre} ya existe`,
                icon:"error",
                confirmButtonText:"ACEPTAR",
            })
        }else{   
            cargarProducto(producto); 
        }
    };


    const eliminarNombre = (nombreEliminarProducto) => {
        let nombreEliminarProductoMYM = nombreEliminarProducto.toLowerCase();
        let existe = productos.some(producto => producto.nombre === nombreEliminarProductoMYM); 
        if(existe){
            productos = productos.filter(producto => producto.nombre !== nombreEliminarProductoMYM);       
            Swal.fire({
                titleText:`Se elimino el producto: ${nombreEliminarProducto}`,
                icon:"info",
                confirmButtonText:"ACEPTAR",
            })
            localStorage.setItem("productos", JSON.stringify(productos));
            }else{
            Swal.fire({
                titleText:"El nombre ingresado no existe",
                icon:"error",
                confirmButtonText:"ACEPTAR",
            })
            }      
    };   
    const eliminarProducto = () => {
        let nombreEliminarProducto = document.querySelector("#nombreInputEliminar").value;
        eliminarNombre(nombreEliminarProducto); 
        console.log(nombreEliminarProducto);
        return nombreEliminarProducto ;
            
    };
     

    const agregarStock = () => {
        let nombreAgregarInput = document.querySelector("#nombreAgregarInput").value.toLowerCase();
        let unidadesInput = parseInt(document.querySelector("#unidadesInput").value);
    
        let productoEncontrado = productos.find(producto => producto.nombre === nombreAgregarInput);
        
        if (productoEncontrado) {
            productoEncontrado.stock += unidadesInput;
            Swal.fire({
                title:"Se ingresaron unidades al stock", 
                text:`PRODUCTO: ${nombreAgregarInput} STOCK INGRESADO: ${unidadesInput} STOCK ACTUAL: ${productoEncontrado.stock}`,
                icon:"info",
                confirmButtonText:"ACEPTAR",
            })
            localStorage.setItem("productos", JSON.stringify(productos));
        } else {
            Swal.fire({
                titleText:"El nombre ingresado no existe",
                icon:"error",
                confirmButtonText:"ACEPTAR",
            })
        }  
    };

   
    const modificarPrecio = () => {
        let nombreModificarInput = document.querySelector("#precioModificarinput").value.toLowerCase();
        let precioActualizadoInput = parseInt(document.querySelector("#precioActualizadoinput").value);
    
        let productoEncontrado = productos.find(producto => producto.nombre === nombreModificarInput);
    
        if (productoEncontrado) {
            productoEncontrado.precio = precioActualizadoInput;
            Swal.fire({
                title:"Se actualizo la lista de precios",
                text:`PRODUCTO: ${nombreModificarInput} PRECIO: $ ${precioActualizadoInput}`,
                icon:"info",
                confirmButtonText:"ACEPTAR",
            })
            localStorage.setItem("productos", JSON.stringify(productos));
        } else {
            Swal.fire({
                titleText:"El nombre ingresado no existe",
                icon:"error",
                confirmButtonText:"ACEPTAR",
            })
        }
    };


    const actualizarListaProductos = () => {      //actualiza lista con DOM
        listaProductos.innerHTML = "";   //lista vacia

        // PLANTILLA DE LISTA DE PRODUCTOS 
        productos.forEach(producto => {
            let tarjetaProducto = document.createElement("div");
            tarjetaProducto.className = "d-flex flex-column border border-1 rounded-2 p-2 w-50 m-1 ";
            tarjetaProducto.innerHTML = `<p> id: ${producto.productoID}</p>
                                         <p> nombre: ${producto.nombre}</p>
                                         <p> stock: ${producto.stock}</p>
                                         <p> precio: ${producto.precio}</p>`;
            listaProductos.appendChild(tarjetaProducto);
        });
    }


 /*     const obtenerProductos = async () => {
        try{
            const resp = await fetch("/data/productos.json");
            const data = await resp.json;
            productos = [...data]
            console.log(data);

        }catch(error){
            console.log(error);
        } ;
           
    } */

               // ------EJECUTANDO APLICACION------
    console.log("Ejecutando aplicación");
    console.log(productos);
    actualizarListaProductos();

       //Botones de formularios, llamado a las funciones.
    formIngresar.onsubmit = (event) => {
        event.preventDefault();
        ingresarProducto();
        console.log(productos);
        formIngresar.reset();
        actualizarListaProductos();
    };

    formEliminar.onsubmit = (event) => {
        event.preventDefault();
        eliminarProducto();
        console.log(productos);
        formEliminar.reset();
        actualizarListaProductos();
    };
     
    formAgregarStock.onsubmit = (event) => {
        event.preventDefault();
        agregarStock();
        console.log(productos);
        formAgregarStock.reset();
        actualizarListaProductos();
    };
     
    formModificarPrecio.onsubmit = (event) => {
        event.preventDefault();
        modificarPrecio();
        console.log(productos);
        formModificarPrecio.reset();
        actualizarListaProductos();
    };
    
}


    





