
// const baseUrl = 'http://localhost:8080/api/v1/';
const baseUrl = 'https://systempus.onrender.com/api/v1/';

export const fetchEntidades = async (endpoint) => {
    try {
        const response = await fetch(baseUrl + endpoint);
        if (response.ok || response.status === 500) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Não foi possível obter a lista de entidades: ' + response.statusText);
        }
    } catch (error) {
        throw new Error('Erro ao tentar acessar recurso: ' + error);
    }
};

export const getEntidadeId = async (endpoint, id) => {
    try {
        const response = await fetch(baseUrl + endpoint + id);
        if (response.ok || response.status === 500) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Não foi possível obter a lista de entidades: ' + response.statusText);
        }
    } catch (error) {
        throw new Error('Erro ao tentar acessar recurso: ' + error);
    }
};

export const deletarEntidade = async (endpoint, id) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}${id}`, {
            method: 'DELETE',
            timeout: 20000 // milisegundos
        });

        if (response.status === 204) {
            const listaAtualizada = await fetchEntidades(endpoint);
            return listaAtualizada;
        } else {
            console.log('Não foi possível excluir entidade: ' + response.body);
        }
    } catch (e) {
        console.log('Erro ao tentar acessar recurso: ' + e);
    }
}


export const atualizarEntidade = async (endpoint, dadosAtualizados) => {

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados),
            timeout: 20000
        });

        if (response.status === 200) {
            const listaAtualizada = await fetchEntidades(endpoint);
            return listaAtualizada;
        } else {
            const erroInfo = await response.json();
            throw new Error(erroInfo["message"]);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const atualizarEntidadeParcial = async (endpoint, dadosAtualizados) => {

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados),
            timeout: 20000
        });

        if (response.ok) {
            const resposta = await response.json();
            return resposta;
        } else {
            const erroInfo = await response.json();
            throw new Error(erroInfo["message"]);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const saveAndGetAll = async (endpoint, dados) => {

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        if (response.status == 201) {
            const listaAtualizada = await fetchEntidades(endpoint);
            return listaAtualizada;
        } else {
            const erroInfo = await response.json();
            throw new Error(erroInfo["message"]);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const salvarEntidade = async (endpoint, dados) => {

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        if (response.status == 201) {
            return alert("Cadastro realizado com sucesso!");
        } else {
            const erroInfo = await response.json();
            throw new Error(erroInfo["message"]);
        }
    } catch (error) {
        throw new Error(error);
    }
};