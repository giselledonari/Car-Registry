async function getData() {
    const resp = await fetch("/api/autos");
    const data = await resp.json();
    return data;
}

async function autos(){
    //datos automoviles
    const data=await getData()
    const plantilla=document.querySelector("#template")
    const divContenedor=document.querySelector("#contenedor")
    
    data.forEach(dato => {
        const contenido=plantilla.content.cloneNode(true)
        
        contenido.querySelector("#marca").textContent=dato.marca
        contenido.querySelector("#modelo").textContent=dato.modelo
        contenido.querySelector("#year").textContent=dato.year
        contenido.querySelector("#imagenAuto").src="../uploads/autos/"+dato.imagen

        divContenedor.appendChild(contenido)
    });
}

autos()