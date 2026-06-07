// VEICULOS

function abrirnovocarro() {
    document.getElementById("overlay-novocarro").style.display = "block";
    document.getElementById("janelanovocarro").style.display = "block";
}

function fecharnovocarro() {
    document.getElementById("overlay-novocarro").style.display = "none";
    document.getElementById("janelanovocarro").style.display = "none";
}

const veiculos = [
    {
        placa: "ABC-1234",
        modelo: "Civic",
        cor: "Prata",
        proprietario: "João Silva",
        matricula: "2025XXXXXX",
        status: "Estacionado"
    },
    {
        placa: "XYZ-9876",
        modelo: "Onix",
        cor: "Preto",
        proprietario: "Maria Souza",
        matricula: "2025XXXXXX",
        status: "Fora"
    }
];

function renderizarTabelaVeiculos(lista = veiculos) {
    const tbody = document.getElementById("veiculos-tabela-body");

    tbody.innerHTML = "";   

    lista.forEach((veiculo, indice) => {
        tbody.innerHTML += `
        <tr class="linha-veiculo">
            <td>${veiculo.placa}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.cor}</td>
            <td>${veiculo.proprietario}</td>
            <td>${veiculo.matricula}</td>
            <td>${veiculo.status.charAt(0).toUpperCase() + veiculo.status.slice(1)}</td>
            <td>
                <button class="botao-editar-veiculo" onclick="editarVeiculo(${indice})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="botao-excluir-veiculo" onclick="excluirVeiculo(${indice})"><i class="fa-solid fa-trash" style="color: rgb(233, 16, 16);"></i></button>
            </td>
        </tr>
    `;
    })

    document.getElementById("contador-veiculos").textContent =
    `${veiculos.length} registrado(s)`;

}
renderizarTabelaVeiculos()

const formularioVeiculo = document.getElementById("janelanovocarro");

formularioVeiculo.addEventListener("submit", function(event) {
    event.preventDefault();

    const novoVeiculo = {
        placa: document.getElementById("placa-veiculos").value,
        modelo: document.getElementById("modelo-veiculos").value,
        cor: document.getElementById("cor-veiculos").value,
        proprietario: document.getElementById("proprietario-veiculos").value,
        matricula: document.getElementById("matricula-veiculos").value,
        status: document.getElementById("status-veiculos").value
    };
    
    if(indiceEditando !== null) {
        veiculos[indiceEditando] = novoVeiculo;
        indiceEditando = null;
        } else {
            veiculos.push(novoVeiculo);
        }
    renderizarTabelaVeiculos();
    formularioVeiculo.reset();
    fecharnovocarro();
});


function filtrarVeiculos(){
    const busca = document.getElementById("buscarporid").value.toLowerCase();
    const status = document.getElementById("status-veiculo-id").value;
    const filtrados = veiculos.filter(veiculo => {
        const correspondeBusca =
            veiculo.placa.toLowerCase().includes(busca) ||
            veiculo.proprietario.toLowerCase().includes(busca);

        const correspondeStatus = status === "todos" ||
        veiculo.status.toLowerCase() === status;

        return correspondeBusca && correspondeStatus;
    });

    renderizarTabelaVeiculos(filtrados);
}

document.getElementById("buscarporid").addEventListener("input", filtrarVeiculos);
document.getElementById("status-veiculo-id").addEventListener("change", filtrarVeiculos);

function excluirVeiculo(indice) {

        veiculos.splice(indice, 1);

        renderizarTabelaVeiculos();

        document.getElementById("contador-veiculos").textContent =
            `${veiculos.length} registrado(s)`;
    }

let indiceEditando = null;

function editarVeiculo(indice) {

    const veiculo = veiculos[indice];

    document.getElementById("placa-veiculos").value = veiculo.placa;
    document.getElementById("modelo-veiculos").value = veiculo.modelo;
    document.getElementById("cor-veiculos").value = veiculo.cor;
    document.getElementById("proprietario-veiculos").value = veiculo.proprietario;
    document.getElementById("matricula-veiculos").value = veiculo.matricula;
    document.getElementById("status-veiculos").value = veiculo.status.toLowerCase();

    indiceEditando = indice;

    abrirnovocarro();
}

// USUARIOS

function abrirnovousuario() {
    document.getElementById("overlay-novousuario").style.display = "block";
    document.getElementById("formulario-novo-usuario").style.display = "block";
}

function fecharnovousuario() {
    document.getElementById("overlay-novousuario").style.display = "none";
    document.getElementById("formulario-novo-usuario").style.display = "none";
}