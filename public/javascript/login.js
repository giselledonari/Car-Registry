const login = document.querySelector("#login");
const alert = document.querySelector("#alert");

login.addEventListener("submit", async (event) => {
  
  event.preventDefault();
  const email=document.querySelector("#email").value
  const contrasena=document.querySelector("#contrasena").value
  
  let resp = await fetch("/form/login", {
    method: "POST",
    headers:{
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({email,contrasena}),
  });

  let respuesta = await resp.json();
  
  console.log(respuesta)

  if (respuesta.err) {
    alert.innerHTML = `
    <div class="alert alert-danger" role="alert">
    ${respuesta.err}
  </div>
    `;
  }
  else{
    window.location.href='/perfil'
  }
});
