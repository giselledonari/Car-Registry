const alert = document.querySelector("#alert");
const infoUser=document.querySelector("#infoUser")
const agregarAutos=document.querySelector("#agregarAutos")

//generar informacion usuario
async function getData() {
  const resp = await fetch("/api/informacion");
  const data = await resp.json();
  return data;
}

//poner la informacion en la pag
async function informacionUsuario() {
  const data = await getData();
  if (data.err) {
    infoUser.innerHTML=``
    alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
        ${data.err}
        </div>
        `;
  } else {
    //datos usuarios
    const nombre = document.querySelector("#perfil-nombre");
    const apellido = document.querySelector("#perfil-apellido");
    const email = document.querySelector("#perfil-email");
    const foto = document.querySelector("#perfil-foto");
    const dataFoto = "../uploads/perfiles/" + data[0].foto;

    nombre.textContent = data[0].nombre;
    apellido.textContent = data[0].apellido;
    email.textContent = data[0].email;
    foto.src = dataFoto;
    //datos automoviles
    const plantilla=document.querySelector("#templateAutos")
    const divContenedor=document.querySelector("#autosUsuario")
    
    data.forEach(dato => {
        if (dato.id!=null){
            const contenido=plantilla.content.cloneNode(true)
            
            contenido.querySelector("#marca").textContent=dato.marca
            contenido.querySelector("#modelo").textContent=dato.modelo
            contenido.querySelector("#year").textContent=dato.year
            contenido.querySelector("#imagenAuto").src="../uploads/autos/"+dato.imagen

            divContenedor.appendChild(contenido)
        }
    });
  }
}

informacionUsuario();

//enviar formulario auto

agregarAutos.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(agregarAutos)
      console.log(formData)
    let resp = await fetch("/form/agregarAutos", {
      method: "POST",
      body: formData,
    });
  
    let respuesta = await resp.json();
    console.log(respuesta)
    if (respuesta.err) {
      agregarAutos.innerHTML = `
      <div class="alert alert-danger" role="alert">
      ${respuesta.err}
    </div>
      `;
    }
    else{
        agregarAutos.innerHTML =`<div class="alert alert-success" role="alert">
        ${respuesta.mensaje}. Refresca tu perfil para ver los cambios
      </div>`
    }
  });
  