// eslint-disable-next-line no-unused-vars
export function mascaraTelefone(telefone){
    const digitos = telefone.split("");

    let ddd = `(${digitos[0]}${digitos[1]})`;

    if (telefone.length === 11){
        let primeiros4 = `${digitos.slice(2, 7).join("")}`;
        let ultimos4 = `${digitos.slice(7, 11).join("")}`;
        let numero = `${ddd} ${primeiros4}-${ultimos4}`;
        return numero;
    } else if (telefone.length === 10){
        let primeiros4 = `${digitos.slice(2, 6).join("")}`;
        let ultimos4 = `${digitos.slice(6, 10).join("")}`;
        let numero = `${ddd} ${primeiros4}-${ultimos4}`;
        return numero;
    }else{
        return telefone;
    }
}

export function dataBRtoAPI(data){
    // Separa a data em partes usando o delimitador "/"
    const partes = data.split('/');

    // Verifica se a data está no formato esperado
    if (partes.length !== 3) {
        throw new Error('Formato de data inválido. Use o formato "DD/MM/AAAA".');
    }
    
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    
    // Retorna a data formatada no padrão "AAAA-MM-DD"
    return `${ano}-${mes}-${dia}`;
}

export function objectExists(lista, obj){
    if (lista.some(item => JSON.stringify(item) === JSON.stringify(obj))) {
        return true;
    } else {
        return false;
    }
}