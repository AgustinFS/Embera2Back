console.log(location.search);

let argsUrl = location.search.substring(1).split('&');
console.log(argsUrl);

let data = [];
for(let i = 0; i< argsUrl.length; i++){
    data[i] = argsUrl[i].split('=');
}
console.log(data);

document.getElementById('id').value = decodeURIComponent(data[0][1]);
document.getElementById('nombre').value = decodeURIComponent(data[1][1]);
document.getElementById('precio').value = decodeURIComponent(data[2][1]);
document.getElementById('stock').value = decodeURIComponent(data[3][1]);
document.getElementById('imagen').value = decodeURIComponent(data[4][1]);

//--------------------------------------
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


function modificar() {
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
  
    let id = document.getElementById('id').value;
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

    let url = 'http://agustinfs.pythonanywhere.com/productos/'+id;
    let options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: {'content-Type':'application/json'}
    }

    fetch(url, options)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al editar el producto');
      }
    })
    .then(function() {
      return Swal.fire({
        title: 'El producto fue editado exitosamente!',
        html: 'Será redirigido a la sección de productos',
        icon: 'success',
        position: 'center',
        showConfirmButton: true,
        customClass: {
          content: 'my-sweet-alert-content',
        },
      });
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Redireccionar al otro HTML
        window.location.href = './productos.html'
      }
    })
    .catch(function(error) {
      Swal.fire({
        title: 'Error al editar el producto',
        text: error.message,
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