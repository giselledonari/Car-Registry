const registro = document.querySelector("#registro");
const alert = document.querySelector("#alert");

registro.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(registro)
    console.log(formData)
  let resp = await fetch("/form/registro", {
    method: "POST",
    body: formData,
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
    window.location.href='/login'
  
  }
});
