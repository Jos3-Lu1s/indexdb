let producto1 = {
    nombre: "refresco",
    cantidad: 30,
    precio: 25.0,
};
let producto2 = {
    nombre: "papas",
    cantidad: 30,
    precio: 25.0,
};
let producto3 = {
    nombre: "dulces",
    cantidad: 30,
    precio: 25.0,
};

//-----------VERSION 1------------------------------------------
// const refBDTienda = indexedDB.open('DBtienda', 1);

// refBDTienda.onupgradeneeded = event => {
//     let DBTienda = event.target.result;

//     if (!DBTienda.objectStoreNames.contains('inventario')) {
//         DBTienda.createObjectStore('inventario', {
//             keyPath: 'id',
//             autoIncrement: true
//         });
//     }

// };

//-----------VERSION 2------------------------------------------

const abrirBD = async () => {
    return new Promise((exito, fallo) => {
        const refBDTienda = indexedDB.open("DBtienda", 1);

        refBDTienda.onupgradeneeded = (event) => {
            let DBTienda = event.target.result;

            if (!DBTienda.objectStoreNames.contains("inventario")) {
                DBTienda.createObjectStore("inventario", {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        };
        refBDTienda.onsuccess = (event) => {
            exito(event.target.result);
        };
        refBDTienda.onerror = (event) => {
            fallo(event.target.error);
        };
    });
};

const Agregar = async (prod) => {
    const BD = await abrirBD();
    return new Promise((resolve, reject) => {
        const tran = BD.transaction("inventario", "readwrite");
        const tabla = tran.objectStore("inventario");
        const resp = tabla.add(prod);
        tran.oncomplete = (e) => {
            console.log("dato agregado");
            return resolve;
        };
        tran.onerror = (e) => {
            reject(tran.error);
        };
    });
};

const funAlta = () => {
    const newProd = {
        nombre: document.querySelector("#txtNombre").value,
        cantidad: document.querySelector("#txtCantidad").value * 1,
        precio: document.querySelector("#txtPrecio").value * 1,
    };
    Agregar(newProd);
};

const funListar = async () => {
    const DB = await abrirBD();
    return new Promise((resolve, reject) => {
        const tran = BD.transaction("inventario", "readonly");
        const tabla = tran.objectStore("inventario");
    });
};

// refBDTienda.onerror = (Err) => {
//     console.log("Error", Err.target.error);
// };

// refBDTienda.onsuccess = (Event) => {
//     let BDTienda = Event.target.result;
//     const tran = BDTienda.transaction("inventario", "readwrite");
//     const tabla = tran.objectStore("inventario");
//     const resp = tabla.add(producto1);
//     resp.onsuccess = (Event) => {
//         console.log("dato agregado");
//     };
// };
