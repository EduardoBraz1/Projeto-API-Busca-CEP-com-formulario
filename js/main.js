/* fiz as variaveis fora da função assicrona para conseguir fazer o adicional de desabilitar os outros input 
para evitar que os usuarios mexam nos resultados gerados pela API */

/* troquei o var pelo let para evitar conflito global por conta do var */

let cidade = document.querySelector('#cidade');
let logradouro = document.querySelector('#endereco');
let bairro = document.querySelector('#bairro');
let estado = document.querySelector('#estado');

async function buscaEndereco(cep) {
    let mensagemErro = document.querySelector('#erro');
    mensagemErro.innerHTML = "";
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>O CEP devera ter 8 números traços e que seja válido!</p>`
        console.log(erro);
    }
}

let cep = document.querySelector('#cep');

cep.addEventListener("focusout", () => {
    buscaEndereco(cep.value);

    cidade.setAttribute("disabled", "true")
    logradouro.setAttribute("disabled", "true")
    bairro.setAttribute("disabled", "true")
    estado.setAttribute("disabled", "true")
});
