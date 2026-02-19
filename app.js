//FUNCIÓN REGULAR

function verificarParImpar(numero) {
    if (numero % 2 === 0) {
        console.log("El número " + numero + " es par.");
    } else {
        console.log("El número " + numero + " es impar.");
    }
}

//FUNCIÓN ARROW
const verificarParImparArrow = (numero) => {
    if (numero % 2 === 0) {
        console.log("El número " + numero + " es par.");
    } else {
        console.log("El número " + numero + " es impar.");
    }
};

//LLAMADAS A LAS FUNCIONE
verificarParImpar(7);
verificarParImparArrow(10);