function chequearCampos() {
  let n = document.getElementById('nombre');
  let p = document.getElementById('precio');
  let s = document.getElementById('stock');
  let i = document.getElementById('imagen');

  let nValor = n.value.trim();
  let pValor = p.value.trim();
  let sValor = s.value.trim();
  let iValor = i.value.trim();

  let validacionCorrecta = true;

  if (nValor === '' || nValor.length < 2) {
    n.style.backgroundColor = 'rgb(255, 88, 88)';
    validacionCorrecta = false;
  } else {
    n.style.backgroundColor = '';
  }

  if (pValor === '' || pValor.length < 2) {
    p.style.backgroundColor = 'rgb(255, 88, 88)';
    validacionCorrecta = false;
  } else {
    p.style.backgroundColor = '';
  }

  if (sValor === '' || sValor.length < 2) {
    s.style.backgroundColor = 'rgb(255, 88, 88)';
    validacionCorrecta = false;
  } else {
    s.style.backgroundColor = '';
  }

  if (iValor === '' || iValor.length < 2) {
    i.style.backgroundColor = 'rgb(255, 88, 88)';
    validacionCorrecta = false;
  } else {
    i.style.backgroundColor = '';
  }

  return validacionCorrecta;
}

function guardar(){
  if (!chequearCampos()) {
    Swal.fire({
      title: 'Error al modificar el producto',
      text: 'Por favor, complete los campos para modificar el producto',
      icon: 'error',
      position: 'center',
      showConfirmButton: true,
      customClass: {
        content: 'my-sweet-alert-content',
      },
    });
    return; // Salir de la función si los campos no cumplen los requisitos
  }
    let n = document.getElementById('nombre').value;
    let p = document.getElementById('precio').value;
    let s = document.getElementById('stock').value;
    let i = document.getElementById('imagen').value;


    let producto = {
        nombre: n,
        precio: p,
        stock: s,
        imagen: i
    };

    let url = 'http://agustinfs.pythonanywhere.com/productos'
    let options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: {'content-Type':'application/json'}
    }

    fetch(url, options)
    .then(function() {
      Swal.fire({
        title: 'El producto fue agregado exitosamente!',
        html: 'Será redirigido a la sección de productos',
        icon: 'success',
        position: 'center',
        showConfirmButton: true,
        customClass: {
          content: 'my-sweet-alert-content',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar al otro HTML
          window.location.href = './productos.html'
        }
      });
    })
  .catch(error => {
    Swal.fire({
      title: 'Error al agregar el producto',
      text: 'No pudo agregarse el producto',
      icon: 'error',
      position: 'center',
      showConfirmButton: true,
      customClass: {
        content: 'my-sweet-alert-content',
      },
    });
    console.error(error);
  });
}