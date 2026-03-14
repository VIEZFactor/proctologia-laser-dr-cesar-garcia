const contenidoLoading = `
  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg> 
  Enviando...
`;

window.onload = function () {
    let form = document.querySelector('#contact-form');
    form.addEventListener("submit", sendForm);

    async function sendForm(e) {
        e.preventDefault();
        let url = 'contact.php';
        beforeSend();
        var pristine = new Pristine(form);
        var valid = pristine.validate();
        console.log(valid);
        if(valid){
            try {
                let formData = new FormData(form);
                fetch(url, {
                    method: 'POST',
                    body: formData,
                })
                .then((response) => response.json())
                .then((respuesta) => {
                    console.log(respuesta);
                    if (!respuesta.error) {
                        console.log('Perfecto', respuesta.mensaje, 'success');
                        clearForm(form);
                    } else {
                        console.log('Lo sentimos', respuesta.mensaje, 'warning')
                    }                        
                    afterSend(respuesta);
                })                
            } catch (error) {
                console.log(error);                        
            }
        }else{
            afterSend();
        }
        console.log(valid);
    }

    function beforeSend(){
        document.getElementById('alert-success').style.display = 'none';
        document.getElementById('alert-danger').style.display = 'none';
        document.getElementById("btn-send-form").disabled = true;
        document.getElementById("btn-send-form").innerHTML = contenidoLoading;
    }

    function afterSend(response = false){
        document.getElementById("btn-send-form").disabled = false;
        document.getElementById("btn-send-form").innerHTML = 'Enviar mensaje';
        if(!response){
            return false;
        }

        if(!response.error){
            let success = document.getElementById('alert-success');
            success.style.display = '';
            success.innerHTML = response.mensaje;
        }else{
            let error = document.getElementById('alert-danger');
            error.style.display = '';
            error.innerHTML = response.mensaje;
        }
    }

    function clearForm(form){
        form.reset();
        // resetFileName();
    }

    function resetFileName(){        
        let fileName = "Escoger archivo, imagen o PDF";
        let fileLabel = document.querySelector('#inputGroupFile01-label');
        fileLabel.innerHTML = fileName;
    }
}