export function valida(input){
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").InnerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").InnerHTML = mostrarMensajeDeError(tipoDeInput, input);

    }
}

const tiposDeErrores = [
    "valueMissing",
    "typeMissmatch",
    "patternMissmatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo correro no puede estar vacio",
        typeMissmatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMissmatch: "Al menos 6 caracteres un maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMissmatch: "el campo requerido es de (XXXXXXXXX) 10 numeros"
    },
    direccion: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMissmatch: "la direccion debe tener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMissmatch: "la ciudad debe tener entre 4 y 40 caracteres"
    },
    estado: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMissmatch: "el estado debe tener entre 4 y 40 caracteres"
    },

}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),

};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tiposDeErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() +18,
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return(diferenciaFechas <= fechaActual);
}