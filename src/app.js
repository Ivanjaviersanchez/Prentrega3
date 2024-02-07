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
    let listaProductosOferta = document.querySelector("#listaProductosOferta")
           
    //Arrays de almacenamiento
    let productos =  JSON.parse(localStorage.getItem("productos")) || [] ;   //array de productos
    let productosOferta = [];      //array de productos en oferta (fetch)  
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

        if(nombreInput.value === "" || isNaN(stockInput) || isNaN(precioInput)){
            Swal.fire({
                title:`Debe ingresar un valor en cada campo`,
                icon:"error",
                confirmButtonText:"ACEPTAR",
            });
            return;
        }else{
            if(productos.some(producto => producto.nombre == nombreInput.value.toLowerCase())){
                Swal.fire({
                    title:`El producto ${producto.nombre} ya existe`,
                    icon:"error",
                    confirmButtonText:"ACEPTAR",
                })
            }else{   
                cargarProducto(producto); 
            }
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
        if(nombreEliminarProducto === ""){
            Swal.fire({
                title:`Debe ingresar un valor en cada campo`,
                icon:"error",
                confirmButtonText:"ACEPTAR",
            });
            return;
        }else{
            eliminarNombre(nombreEliminarProducto); 
            return nombreEliminarProducto ;

        }    
    };
     

    const agregarStock = () => {
        let nombreAgregarInput = document.querySelector("#nombreAgregarInput").value.toLowerCase();
        let unidadesInput = parseInt(document.querySelector("#unidadesInput").value);
        let productoEncontrado = productos.find(producto => producto.nombre === nombreAgregarInput);
        
        if(nombreAgregarInput.value === "" || isNaN(unidadesInput)){
            Swal.fire({
                title:`Debe ingresar un valor en cada campo`,
                icon:"error",
                confirmButtonText:"ACEPTAR",
            });
            return;
        }else{
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
    };

   
    const modificarPrecio = () => {
        let nombreModificarInput = document.querySelector("#precioModificarinput").value.toLowerCase();
        let precioActualizadoInput = parseInt(document.querySelector("#precioActualizadoinput").value);
    
        let productoEncontrado = productos.find(producto => producto.nombre === nombreModificarInput);
        
        if(nombreModificarInput.value === "" || isNaN(precioActualizadoInput)){
            Swal.fire({
                title:`Debe ingresar un valor en cada campo`,
                icon:"error",
                confirmButtonText:"ACEPTAR",
            });
            return;
        }else{
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
            };
        };
    };


    const actualizarListaProductos = () => {      //actualiza lista con DOM
        listaProductos.innerHTML = "";   //lista vacia

        // PLANTILLA DE LISTA DE PRODUCTOS 
        productos.forEach(producto => {
            let tarjetaProducto = document.createElement("div");
            tarjetaProducto.classList.add("tarjeta-producto");  // Agregar clase CSS
            tarjetaProducto.innerHTML = `<p> ID: ${producto.productoID}</p>
                                         <p> PRODUCTO: ${producto.nombre}</p>
                                         <p> STOCK: ${producto.stock} unid.</p>
                                         <p> PRECIO: $ ${producto.precio}</p>`;
            listaProductos.appendChild(tarjetaProducto);
        });
    }


    const obtenerProductosOferta = async () => {    // Funcion asincrona Fetch productos.json
        try{
            const resp = await fetch("/data/productos.json");
            const data = await resp.json();

            productosOferta = [...data];
            console.log(productosOferta);
          
         /*    listaProductosOferta.innerHTML = "";   //lista vacia
            productos.forEach(producto => {
                 let tarjetaProductoOferta = document.createElement("div");
                 tarjetaProductoOferta.classList.add("tarjeta-producto");  // Agregar clase CSS
                 tarjetaProductoOferta.innerHTML = `<p> ID: ${producto.productoID}</p>
                                                    <p> PRODUCTO: ${producto.nombre}</p>
                                                    <p> STOCK: ${producto.stock} unid.</p>
                                                    <p> PRECIO: $ ${producto.precio}</p>`;
                 listaProductosOferta.appendChild(tarjetaProductoOferta);
            }); */

        }catch(error){
            console.log(error);
        } ; 
    }
 
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

    document.getElementById("btnActualizarLista").addEventListener("click", () => {
        actualizarListaProductos();
        Swal.fire({
            title: "La lista fue actualizada",
            icon: "success",
            showConfirmButton: false,
            timer: 4000
        });
    });

    document.getElementById("btnBorrarLista").addEventListener("click", () => {
        Swal.fire({
            title: "Desea borrar la lista?",
            text: "Se eliminaran todos los datos almacenados!",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "ACEPTAR",
            cancelButtonText: "CANCELAR",
            cancelButtonColor: "red"

        }).then((resp) => {
                if (resp.isConfirmed) {
                    localStorage.clear();
                    productos = [];
                    Swal.fire({
                        title: "Lista borrada!",
                        text: "Todos los datos fueron eliminados.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 4000
                    });
                    actualizarListaProductos();
                }
            });

    });
    document.getElementById("btnListaOfertas").addEventListener("click", () => {
       obtenerProductosOferta();  
       Swal.fire({
        title: "Se cargo el listado de productos en ofertas",
        icon: "success",
        showConfirmButton: false,
        timer: 4000
    });

    });
}


    





