// VEICULOS



function abrirnovocarro() {
    document.getElementById("overlay-novocarro").style.display = "block";
    document.getElementById("janelanovocarro").style.display = "block";
}

function fecharnovocarro() {
    document.getElementById("overlay-novocarro").style.display = "none";
    document.getElementById("janelanovocarro").style.display = "none";
}

let veiculos = JSON.parse(localStorage.getItem("veiculos"));

if (!veiculos) {

    veiculos = [
        {
            placa: "ABC-1234",
            modelo: "Civic",
            cor: "Prata",
            proprietario: "João Silva",
            matricula: "2025XXXXXX",
            status: "Estacionado"
        }
    ];

    localStorage.setItem(
        "veiculos",
        JSON.stringify(veiculos)
    );
}

function salvarVeiculos() {

    localStorage.setItem(
        "veiculos",
        JSON.stringify(veiculos)
    );

}
function renderizarTabelaVeiculos(lista = veiculos) {

    const tbody = document.getElementById("veiculos-tabela-body");

    if (!tbody) return;

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
    `${veiculos.length} Registrado(s)`;

}
if (document.getElementById("veiculos-tabela-body")) {
    renderizarTabelaVeiculos();
}

const formularioVeiculo =
    document.getElementById("janelanovocarro");

if (formularioVeiculo) {

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

salvarVeiculos();
    renderizarTabelaVeiculos();
    formularioVeiculo.reset();
    fecharnovocarro();
});
}
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

const buscarVeiculo = document.getElementById("buscarporid");

if (buscarVeiculo) {
    buscarVeiculo.addEventListener("input", filtrarVeiculos);
}

const statusVeiculo = document.getElementById("status-veiculo-id");

if (statusVeiculo) {
    statusVeiculo.addEventListener("change", filtrarVeiculos);
}

function excluirVeiculo(indice) {

    Swal.fire({
        title: "Excluir veículo?",
        text: "Esta ação não poderá ser desfeita.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.isConfirmed) {
            veiculos.splice(indice, 1);
            salvarVeiculos();
            renderizarTabelaVeiculos();
            Swal.fire({
                icon: "success",
                title: "Veículo removido!"
            });
        }
        
    });
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

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("veiculos-tabela-body")) {
        renderizarTabelaVeiculos();
    }

});










// USUARIOS










function abrirnovousuario() {
    document.getElementById("overlay-novousuario").style.display = "block";
    document.getElementById("formulario-novo-usuario").style.display = "block";
}

function fecharnovousuario() {
    document.getElementById("overlay-novousuario").style.display = "none";
    document.getElementById("formulario-novo-usuario").style.display = "none";
}


let usuarios = JSON.parse(localStorage.getItem("usuarios"));
let indiceEditandoUsuario = null;

if (!usuarios) {
    usuarios = [
        {
            nome: "Administrador",
            email: "admin@email.com",
            matricula: "2025101010",
            senha: "123456",
            perfil: "Administrador",
            status: "Ativo"
        }
    ];

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}

function salvarUsuarios() {
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}

function renderizarUsuarios(lista = usuarios) {

    const tbody = document.getElementById("usuarios-tabela-body");

    if (!tbody) return;

    tbody.innerHTML = "";

    lista.forEach((usuario, index) => {

        tbody.innerHTML += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.matricula}</td>
                <td>${usuario.perfil}</td>
                <td>${usuario.status}</td>
                <td>
                    <button class="botao-editar-usuario" onclick="editarUsuario(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="botao-excluir-usuario" onclick="excluirUsuario(${index})"><i class="fa-solid fa-trash" style="color: rgb(233, 16, 16);"></i></button>
                </td>
            </tr>
        `;
    });

    atualizarContador();
}

function atualizarContador() {

   document.getElementById("contador-usuarios").textContent =
    `${usuarios.length} Registrado(s)`;
}

function salvarUsuario(event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome-usuario").value.trim();

    const email =
        document.getElementById("email-usuario").value.trim();

    const matricula =
        document.getElementById("matricula-usuario").value.trim();

    const senha =
        document.getElementById("senha-usuario").value;

    const perfil =
        document.getElementById("perfil-usuario").value;

    const status =
        document.getElementById("status-usuario").value;

    if (!nome || !email || !matricula || !senha) {
       Swal.fire({
        icon: "error",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos."
        });
        return;
    }

    const emailExistente = usuarios.some(
    (usuario, index) =>
        usuario.email === email &&
        index !== indiceEditandoUsuario
    );

    if (emailExistente) {
        Swal.fire({
            icon: "error",
            title: "E-mail já cadastrado"
        });
        return;
    }

    const matriculaExistente = usuarios.some(
        (usuario, index) =>
            usuario.matricula === matricula &&
            index !== indiceEditandoUsuario
    );

    if (matriculaExistente) {
        Swal.fire({
        icon: "error",
        title: "Matrícula já cadastrada"
    });
        return;
    }

    const usuario = {
    nome,
    email,
    matricula,
    senha,
    perfil,
    status
};

if (indiceEditandoUsuario !== null) {

    usuarios[indiceEditandoUsuario] = usuario;

    indiceEditandoUsuario = null;

    Swal.fire({
        icon: "success",
        title: "Usuário atualizado!",
        timer: 1500,
        showConfirmButton: false
    });

} else {

    usuarios.push(usuario);

    Swal.fire({
        icon: "success",
        title: "Usuário cadastrado!",
        timer: 1500,
        showConfirmButton: false
    });

}

    salvarUsuarios();

    renderizarUsuarios();

    document
        .getElementById("formulario-novo-usuario")
        .reset();

    fecharnovousuario();
}

function editarUsuario(index) {

    const usuario = usuarios[index];

    document.getElementById("nome-usuario").value =
        usuario.nome;

    document.getElementById("email-usuario").value =
        usuario.email;

    document.getElementById("matricula-usuario").value =
        usuario.matricula;

    document.getElementById("senha-usuario").value =
        usuario.senha;

    document.getElementById("perfil-usuario").value =
        usuario.perfil;

    document.getElementById("status-usuario").value =
        usuario.status;

    indiceEditandoUsuario = index;

    abrirnovousuario();
}

function excluirUsuario(index) {

    Swal.fire({
        title: "Excluir usuário?",
        text: "Esta ação não poderá ser desfeita.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.isConfirmed) {

            usuarios.splice(index, 1);

            salvarUsuarios();

            renderizarUsuarios();

            Swal.fire({
                icon: "success",
                title: "Usuário removido!"
            });

        }

    });
}

function buscarUsuarios() {

    const termo =
        document
            .getElementById("buscar-usuario-id")
            .value
            .toLowerCase();

    const resultado = usuarios.filter(usuario =>

        usuario.nome.toLowerCase().includes(termo) ||

        usuario.matricula
            .toLowerCase()
            .includes(termo)

    );

    renderizarUsuarios(resultado);
}

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("usuarios-tabela-body")) {

        renderizarUsuarios();

        document
            .getElementById("buscar-usuario-id")
            ?.addEventListener("input", buscarUsuarios);

        document
            .getElementById("formulario-novo-usuario")
            ?.addEventListener("submit", salvarUsuario);
    }

});








// ENTRADA E SAIDA







function salvarEntrada() {
    localStorage.setItem(
        "entradas",
        JSON.stringify(entradas)
    );
}


const dadosEntrada = [
    {
        tipo:"Entrada",
        placa: "ABC-1234",
        horarioEntrada: "2026-06-07 07:12",
        horarioSaida: null,
        imagem: "assets/carro1.jpg",
        status: "Estacionado"
    }
];

let entradas = JSON.parse(
    localStorage.getItem(entradas)
);

if (!entradas) {
    entradas = dadosEntrada;
    salvarEntrada()
}



