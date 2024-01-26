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
        alert(`Se ingreso el producto: ${producto.nombre} con el ID: ${productoID}`);
        
        localStorage.setItem("productos", JSON.stringify(productos));
        console.log(productos);
    }

    const ingresarProducto = () => {
        let nombreInput = document.querySelector("#nombreInput");
        let stockInput = parseInt(document.querySelector("#stockInput").value);
        let precioInput = parseFloat(document.querySelector("#precioInput").value);
       
        let producto = new Producto(nombreInput.value, stockInput, precioInput);
        
        if(productos.some(producto => producto.nombre == nombreInput.value.toLowerCase())){
            alert("El producto ingresado ya existe");
        }else{   
            cargarProducto(producto); 
        }
    };


    const eliminarNombre = (nombreEliminarProducto) => {
        let nombreEliminarProductoMYM = nombreEliminarProducto.toLowerCase();
        let existe = productos.some(producto => producto.nombre === nombreEliminarProductoMYM); 
        if(existe){
            productos = productos.filter(producto => producto.nombre !== nombreEliminarProductoMYM);       
            alert(`Se elimino el producto: ${nombreEliminarProducto}`);
            localStorage.setItem("productos", JSON.stringify(productos));
            }else{
            alert("El nombre ingresado no existe");
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
           /*  parseInt(productoEncontrado.stock).value; */
            productoEncontrado.stock += unidadesInput;
            alert(`Se agregaron ${unidadesInput} unidades al stock de ${nombreAgregarInput}. Stock actual: ${productoEncontrado.stock}`);
            localStorage.setItem("productos", JSON.stringify(productos));
        } else {
            alert("El nombre ingresado no existe");
        }  
    };

   
    const modificarPrecio = () => {
        let nombreModificarInput = document.querySelector("#precioModificarinput").value.toLowerCase();
        let precioActualizadoInput = parseInt(document.querySelector("#precioActualizadoinput").value);
    
        let productoEncontrado = productos.find(producto => producto.nombre === nombreModificarInput);
    
        if (productoEncontrado) {
            productoEncontrado.precio = precioActualizadoInput;
            alert(`Se ha actualizado el precio de ${nombreModificarInput} a $ ${precioActualizadoInput}`);
            localStorage.setItem("productos", JSON.stringify(productos));
        } else {
            alert("El nombre ingresado no existe");
        }
    };

               // ------EJECUTANDO APLICACION------
    console.log("Ejecutando aplicación");
    console.log(productos);


       //Botones de formularios, llamado a las funciones.
    formIngresar.onsubmit = (event) => {
        event.preventDefault();
        ingresarProducto();
        console.log(productos);
        formIngresar.reset();
    };

    formEliminar.onsubmit = (event) => {
        event.preventDefault();
        eliminarProducto();
        console.log(productos);
        formEliminar.reset();
    };
     
    formAgregarStock.onsubmit = (event) => {
        event.preventDefault();
        agregarStock();
        console.log(productos);
        formAgregarStock.reset();
    };
     
    formModificarPrecio.onsubmit = (event) => {
        event.preventDefault();
        modificarPrecio();
        console.log(productos);
        formModificarPrecio.reset();
    };
    
    document.getElementById("btnActualizarLista").addEventListener("click", () => {
        // Limpia la lista actual
        listaProductos.innerHTML = "";

        // PLANTILLA DE LISTA DE PRODUCTOS 
        productos.forEach ( producto=>{
            let tarjetaProducto = document.createElement("listaProductos");
            tarjetaProducto.className = "border border-2 p-3 w-50 m-3";
            tarjetaProducto.innerHTML = `<p> id: ${producto.productoID}</p>
                                         <p> nombre: ${producto.nombre}</p>
                                         <p> stock: ${producto.stock}</p>
                                         <p> precio: ${producto.precio}</p>;
                                     `;
            listaProductos.appendChild(tarjetaProducto);                             
        }); 
    });



    





