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
    let productoID = 1;        
    class Producto {
        constructor(nombre, stock, precio){
            this.nombre = nombre;
            this.stock = stock;
            this.precio = precio;
            this.productoID = productoID;
        }
    }      

    const cargarProducto = (producto) => {
        productos.push(producto);
        alert(`Ingreso el producto: ${producto.nombre} con el ID: ${productoID}`);
        productoID++;
        localStorage.setItem("productos", JSON.stringify(productos));
        console.log(productos);
    }

    const ingresarProducto = () => {
        let nombreInput = document.querySelector("#nombreInput");
        let stockInput = document.querySelector("#stockInput");
        let precioInput = document.querySelector("#precioInput");
      
        let producto = new Producto(nombreInput.value, stockInput.value, precioInput.value);
        
        cargarProducto(producto);  
    };
    
    const eliminarNombre = (nombreEliminarProducto) => {
        let existe = productos.some(producto => producto.nombre === nombreEliminarProducto);
        if(existe){
            productos = productos.filter(producto => producto.nombre !== nombreEliminarProducto);       
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
    

    const agregarStock=()=>{
    
    }
    const modificarPrecio=()=>{
    
    }

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

      // PLANTILLA DE LISTA DE PRODUCTOS 
    
    productos.forEach ( producto=>{
            let tarjetaProducto = document.createElement("id-listaProductos");
            tarjetaProducto.className = "border border-2 p-3 w-50 m-3";
            tarjetaProducto.innerHTML = `<p> id: ${producto.productoID}</p>
                                         <p> nombre: ${producto.nombre}</p>
                                         <p> stock: ${producto.stock}</p>
                                         <p> precio: ${producto.precio}</p>;
                                         `;
            listaProductos.appendChild(tarjetaProducto);                             
    }); 
    





