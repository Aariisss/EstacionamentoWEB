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
            status: "Estacionado",
        },
        {
          placa: "DEF-4321",
          modelo: "Camaro",
          cor: "Amarelo",
          proprietario: "Luiz Viana",
          matricula: "2025XXXXXX",
          status: "Fora"
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
            <td>
                <span class="placaV">${veiculo.placa}</span>
            </td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.cor}</td>
            <td>${veiculo.proprietario}</td>
            <td>${veiculo.matricula}</td>
            <td>
                <span class="status-${veiculo.status.toLowerCase()}">
                    ${veiculo.status}
                </span>
            </td>
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











if (document.getElementById("usuarios-tabela-body")) {

    let indiceEditandoUsuario = null;

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    );

    if (!usuarios) {

        usuarios = [
            {
                nome: "João Silva",
                email: "joao@email.com",
                matricula: "2025000001",
                perfil: "Administrador",
                status: "Ativo"
            },
            {
                nome: "Maria Souza",
                email: "maria@email.com",
                matricula: "2025000002",
                perfil: "Operador",
                status: "Inativo"
            }
        ];

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );
    }

    function abrirnovousuario() {

        document.querySelector(
            ".header-novo-usuario h2"
        ).textContent = "Novo Usuário";

        indiceEditandoUsuario = null;

        document.getElementById(
            "overlay-novousuario"
        ).style.display = "block";

        document.getElementById(
            "formulario-novo-usuario"
        ).style.display = "block";

        document.getElementById(
            "formulario-novo-usuario"
        ).reset();
    }

    function fecharnovousuario() {

        indiceEditandoUsuario = null;

        document.getElementById(
            "formulario-novo-usuario"
        ).reset();

        document.getElementById(
            "overlay-novousuario"
        ).style.display = "none";

        document.getElementById(
            "formulario-novo-usuario"
        ).style.display = "none";
    }

    window.abrirnovousuario =
        abrirnovousuario;

    window.fecharnovousuario =
        fecharnovousuario;

    function renderizarTabelaUsuarios(
        lista = usuarios
    ) {

        const tbody =
            document.getElementById(
                "usuarios-tabela-body"
            );

        tbody.innerHTML = "";

        lista.forEach(
            (usuario, indice) => {

                tbody.innerHTML += `
                    <tr>

                        <td>
                            ${usuario.nome}
                        </td>

                        <td>
                            ${usuario.email}
                        </td>

                        <td>
                            ${usuario.matricula}
                        </td>

                        <td>
                            ${usuario.perfil}
                        </td>

                        <td>
                            <span class="status-${usuario.status.toLowerCase()}">
                                ${usuario.status}
                            </span>
                        </td>

                        <td>

                            <button
                                class="botao-editar-veiculo"
                                onclick="editarUsuario(${indice})">

                                <i class="fa-solid fa-pen-to-square"></i>

                            </button>

                            <button
                                class="botao-excluir-veiculo"
                                onclick="excluirUsuario(${indice})">

                                <i class="fa-solid fa-trash"
                                   style="color:red;">
                                </i>

                            </button>

                        </td>

                    </tr>
                `;
            }
        );

        document.getElementById(
            "contador-usuarios"
        ).textContent =
            `${usuarios.length} Registrado(s)`;
    }

    window.editarUsuario =
        function(indice) {

            const usuario =
                usuarios[indice];

            document.getElementById(
                "nome-usuario"
            ).value = usuario.nome;

            document.getElementById(
                "email-usuario"
            ).value = usuario.email;

            document.getElementById(
                "matricula-usuario"
            ).value = usuario.matricula;

            document.getElementById(
                "perfil-usuario"
            ).value = usuario.perfil;

            document.getElementById(
                "status-usuario"
            ).value = usuario.status;

            indiceEditandoUsuario =
                indice;

            document.querySelector(
                ".header-novo-usuario h2"
            ).textContent =
                "Editar Usuário";

            document.getElementById(
                "overlay-novousuario"
            ).style.display =
                "block";

            document.getElementById(
                "formulario-novo-usuario"
            ).style.display =
                "block";
        };

    window.excluirUsuario =
        function(indice) {

            Swal.fire({

                title:
                    "Excluir usuário?",

                icon:
                    "warning",

                showCancelButton:
                    true,

                confirmButtonText:
                    "Excluir"

            }).then((resultado) => {

                if (
                    resultado.isConfirmed
                ) {

                    usuarios.splice(
                        indice,
                        1
                    );

                    localStorage.setItem(
                        "usuarios",
                        JSON.stringify(
                            usuarios
                        )
                    );

                    renderizarTabelaUsuarios();

                    Swal.fire(
                        "Excluído!",
                        "",
                        "success"
                    );
                }

            });
        };

    document
        .getElementById(
            "formulario-novo-usuario"
        )
        .addEventListener(
            "submit",
            function(e) {

                e.preventDefault();

                const usuario = {

                    nome:
                        document.getElementById(
                            "nome-usuario"
                        ).value,

                    email:
                        document.getElementById(
                            "email-usuario"
                        ).value,

                    matricula:
                        document.getElementById(
                            "matricula-usuario"
                        ).value,

                    perfil:
                        document.getElementById(
                            "perfil-usuario"
                        ).value,

                    status:
                        document.getElementById(
                            "status-usuario"
                        ).value
                };

                if (
                    indiceEditandoUsuario
                    !== null
                ) {

                    usuarios[
                        indiceEditandoUsuario
                    ] = usuario;

                    Swal.fire({
                        icon:
                            "success",
                        title:
                            "Usuário atualizado!"
                    });

                } else {

                    usuarios.push(
                        usuario
                    );

                    Swal.fire({
                        icon:
                            "success",
                        title:
                            "Usuário cadastrado!"
                    });
                }

                localStorage.setItem(
                    "usuarios",
                    JSON.stringify(
                        usuarios
                    )
                );

                renderizarTabelaUsuarios();

                fecharnovousuario();
            }
        );

    document
        .getElementById(
            "buscar-usuario-id"
        )
        .addEventListener(
            "input",
            function() {

                const termo =
                    this.value
                        .toLowerCase();

                const usuariosFiltrados =
                    usuarios.filter(
                        usuario =>

                            usuario.nome
                                .toLowerCase()
                                .includes(
                                    termo
                                )

                            ||

                            usuario.matricula
                                .toLowerCase()
                                .includes(
                                    termo
                                )
                    );

                renderizarTabelaUsuarios(
                    usuariosFiltrados
                );
            }
        );

    renderizarTabelaUsuarios();
}






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
        horarioEntrada: "2026-06-09 07:12",
        horarioSaida: null,
        imagem: "assets/carro1.jpg",
        status: "Estacionado"
    }
];


let entradas = JSON.parse(
    localStorage.getItem("entradas")
);

if (!entradas) {
    entradas = dadosEntrada;
    salvarEntrada()
}

function renderizarEntradas(lista = entradas) {
    const tbody = document.getElementById("entrada-tabela-body");

    if (!tbody) return

    tbody.innerHTML ="";

    lista.forEach(entradas => {
        
        const horaEntrada = new Date(entradas.horarioEntrada);
        const horaSaida = entradas.horarioSaida
            ? new Date(entradas.horarioSaida)
            : new Date();

        const permanencia = horaSaida - horaEntrada
        const permanenciaM = Math.floor(
            permanencia / (1000 * 60)
        );
        const permanenciaHoras = Math.floor(
            permanenciaM / 60
        );
        const permanenciaMinutos = Math.floor(
            permanenciaM % 60
        );

        const permanenciaF = `${permanenciaHoras}h ${permanenciaMinutos}min`;
        
            tbody.innerHTML += `
                <tr>
                    <td>
                    <span class="status-${entradas.tipo.toLowerCase()}">
                        ${entradas.tipo}
                        </span>
                    
                    </td>
                    <td>${entradas.placa}</td>
                    <td>${entradas.horarioEntrada}</td>
                    <td>${permanenciaF}</td>
                    <td><a href="${entradas.imagem}" target="_blank">Clique para ver</td>
                    <td>
                        <span class="status-${entradas.status.toLowerCase()}">
                        ${entradas.status}
                        </span>
                    </td>
                </tr>
            `;
        })};

renderizarEntradas();
        
function filtrarEntrada() {

    const filtrarPlaca = document.getElementById(
        "buscar-placa-entrada"
    ).value.toLowerCase();

    const filtrarTipo = document.getElementById(
        "select-tipo-entrada"
    ).value.toLowerCase();

    const filtrarHorario = document.getElementById(
        "select-horario-entrada"
    ).value.toLowerCase();

    const filtrados = entradas.filter(entrada => {

        const correspondePlaca =
            entrada.placa
                .toLowerCase()
                .includes(filtrarPlaca);

        const correspondeTipo =
            filtrarTipo === "todos" ||
            entrada.tipo.toLowerCase() === filtrarTipo;

        const hora =
            new Date(
                entrada.horarioEntrada
            ).getHours();

        let correspondeHorario = true;

        if (filtrarHorario === "manha") {
            correspondeHorario =
                hora >= 6 && hora < 12;
        }

        if (filtrarHorario === "tarde") {
            correspondeHorario =
                hora >= 12 && hora < 18;
        }

        if (filtrarHorario === "noite") {
            correspondeHorario =
                hora >= 18 && hora <= 23;
        }

        return (
            correspondePlaca &&
            correspondeTipo &&
            correspondeHorario
        );

    });

    renderizarEntradas(filtrados);

}
const buscarPlacaEntrada =
    document.getElementById(
        "buscar-placa-entrada"
    );

if (buscarPlacaEntrada) {

    buscarPlacaEntrada.addEventListener(
        "input",
        filtrarEntrada
    );

}
const selectTipoEntrada =
    document.getElementById(
        "select-tipo-entrada"
    );

if (selectTipoEntrada) {

    selectTipoEntrada.addEventListener(
        "change",
        filtrarEntrada
    );

}
const selectHorarioEntrada =
    document.getElementById(
        "select-horario-entrada"
    );

if (selectHorarioEntrada) {

    selectHorarioEntrada.addEventListener(
        "change",
        filtrarEntrada
    );

}

renderizarEntradas()














// RELATORIOS













const registrosMock = [
  {
    id: 1,
    placa: "ABC-1234",
    modelo: "Civic",
    proprietario: "João Silva",
    matricula: "2026001",
    dataEntrada: "2026-06-07T08:30:00",
    dataSaida:   "2026-06-07T17:45:00"
  },
  {
    id: 2,
    placa: "XYZ-9876",
    modelo: "Onix",
    proprietario: "Maria Souza",
    matricula: "2026002",
    dataEntrada: "2026-06-07T13:20:00",
    dataSaida:   null  
  },
  {
    id: 3,
    placa: "DEF-5678",
    modelo: "Gol",
    proprietario: "Pedro Santos",
    matricula: "2026003",
    dataEntrada: "2026-06-06T07:15:00",
    dataSaida:   "2026-06-06T18:30:00"
  },
  {
    id: 4,
    placa: "GHI-3456",
    modelo: "HB20",
    proprietario: "Ana Lima",
    matricula: "2026004",
    dataEntrada: "2026-06-06T14:00:00",
    dataSaida:   "2026-06-06T19:45:00"
  },
  {
    id: 5,
    placa: "JKL-7890",
    modelo: "Kwid",
    proprietario: "Carlos Alves",
    matricula: "2026005",
    dataEntrada: "2026-06-05T09:00:00",
    dataSaida:   "2026-06-05T12:30:00"
  },
  {
    id: 6,
    placa: "MNO-2345",
    modelo: "Celta",
    proprietario: "Fernanda Costa",
    matricula: "2026006",
    dataEntrada: "2026-06-05T20:00:00",
    dataSaida:   "2026-06-05T23:30:00"
  },
  {
    id: 7,
    placa: "PQR-6789",
    modelo: "Argo",
    proprietario: "Roberto Dias",
    matricula: "2026007",
    dataEntrada: "2026-06-04T06:45:00",
    dataSaida:   "2026-06-04T15:20:00"
  },
  {
    id: 8,
    placa: "ABC-1234", 
    modelo: "Civic",
    proprietario: "João Silva",
    matricula: "2026001",
    dataEntrada: "2026-06-04T10:00:00",
    dataSaida:   "2026-06-04T14:30:00"
  },
  {
    id: 9,
    placa: "STU-1234",
    modelo: "Fiesta",
    proprietario: "Luciana Rocha",
    matricula: "2026008",
    dataEntrada: "2026-06-03T11:30:00",
    dataSaida:   "2026-06-03T16:00:00"
  },
  {
    id: 10,
    placa: "VWX-5678",
    modelo: "Clio",
    proprietario: "Marcos Oliveira",
    matricula: "2026009",
    dataEntrada: "2026-06-02T07:00:00",
    dataSaida:   "2026-06-02T12:00:00"
  },
  {
    id: 11,
    placa: "YZA-9012",
    modelo: "Corsa",
    proprietario: "Beatriz Ferreira",
    matricula: "2026010",
    dataEntrada: "2026-06-01T19:30:00",
    dataSaida:   "2026-06-01T22:00:00"
  },
  {
    id: 12,
    placa: "XYZ-9876",  
    modelo: "Onix",
    proprietario: "Maria Souza",
    matricula: "2026002",
    dataEntrada: "2026-06-01T08:00:00",
    dataSaida:   "2026-06-01T13:30:00"
  }
];




function formatarData(dataStr) {
  return new Date(dataStr).toLocaleDateString("pt-BR");
}


function formatarHora(dataStr) {
  return new Date(dataStr).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}


function formatarDataHora(dataStr) {
  return `${formatarData(dataStr)} ${formatarHora(dataStr)}`;
}


function calcularTempo(dataEntradaStr, dataSaidaStr) {
  const entrada = new Date(dataEntradaStr);
  const saida   = dataSaidaStr ? new Date(dataSaidaStr) : null;

  if (!saida) return null; 

  const diffMs  = saida - entrada;
  const horas   = Math.floor(diffMs / 3_600_000);
  const minutos = Math.floor((diffMs % 3_600_000) / 60_000);
  return `${horas}h ${minutos}min`;
}


function getPeriodo(dataStr) {
  const hora = new Date(dataStr).getHours();
  if (hora >= 6 && hora < 12) return "manha";
  if (hora >= 12 && hora < 18) return "tarde";
  return "noite";
}


function getStatus(registro) {
  return registro.dataSaida ? "fora" : "estacionado";
}



function obterFiltros() {
  return {
    dataInicio: document.getElementById("filtro-data-inicio").value,
    dataFim:    document.getElementById("filtro-data-fim").value,
    placa:      document.getElementById("filtro-placa").value.trim().toUpperCase(),
    status:     document.getElementById("filtro-status").value,
    periodo:    document.getElementById("filtro-periodo").value
  };
}


function filtrarRegistros(lista, filtros) {
  return lista.filter((r) => {
    const dtEntrada = new Date(r.dataEntrada);


    if (filtros.dataInicio) {
      const inicio = new Date(filtros.dataInicio + "T00:00:00");
      if (dtEntrada < inicio) return false;
    }
    if (filtros.dataFim) {
      const fim = new Date(filtros.dataFim + "T23:59:59");
      if (dtEntrada > fim) return false;
    }


    if (filtros.placa && !r.placa.includes(filtros.placa)) return false;


    if (filtros.status !== "todos" && getStatus(r) !== filtros.status) return false;


    if (filtros.periodo !== "todos" && getPeriodo(r.dataEntrada) !== filtros.periodo) return false;

    return true;
  });
}



function renderizarTabela(lista) {
  const tbody  = document.getElementById("tabela-relatorio-body");
  const vazio  = document.getElementById("relatorio-vazio");
  const contEl = document.getElementById("contador-resultados");

  tbody.innerHTML = "";

  if (lista.length === 0) {
    vazio.style.display = "flex";
    contEl.textContent  = "Nenhum resultado";
    return;
  }

  vazio.style.display = "none";
  contEl.textContent  = `${lista.length} registro(s) encontrado(s)`;

  lista.forEach((r, i) => {
    const status      = getStatus(r);
    const labelStatus = status === "estacionado" ? "Estacionado" : "Saiu";
    const badgeClass  = status === "estacionado" ? "badge-estacionado" : "badge-fora";

    const tempo = calcularTempo(r.dataEntrada, r.dataSaida);
    const tempoHtml = tempo
      ? `<span class="tempo-tag">${tempo}</span>`
      : `<span class="tempo-andamento"><i class="fa-solid fa-circle-dot"></i> Em andamento</span>`;

    tbody.innerHTML += `
      <tr>
        <td style="color: var(--cor-fonteMain2); font-size:13px;">${i + 1}</td>
        <td><span class="placa-tag">${r.placa}</span></td>
        <td>${r.modelo}</td>
        <td>${r.proprietario}</td>
        <td style="color: var(--cor-fonteMain2);">${r.matricula}</td>
        <td>${formatarDataHora(r.dataEntrada)}</td>
        <td>${r.dataSaida ? formatarDataHora(r.dataSaida) : "<span style='color:var(--cor-fonteMain2)'>—</span>"}</td>
        <td>${tempoHtml}</td>
        <td><span class="badge-status ${badgeClass}">${labelStatus}</span></td>
      </tr>
    `;
  });
}




function atualizarCards(lista) {
  const total   = lista.length;
  const entradas = total;
  const saidas  = lista.filter((r) => r.dataSaida).length;
  const unicos  = new Set(lista.map((r) => r.placa)).size;

  document.getElementById("card-total").textContent    = total;
  document.getElementById("card-entradas").textContent = entradas;
  document.getElementById("card-saidas").textContent   = saidas;
  document.getElementById("card-unicos").textContent   = unicos;
}



function exportarCSV(lista) {
  if (lista.length === 0) {
    alert("Nenhum registro para exportar com os filtros atuais.");
    return;
  }

  const cabecalho = [
    "#", "Placa", "Modelo", "Proprietário", "Matrícula",
    "Data/Hora Entrada", "Data/Hora Saída",
    "Tempo de Permanência", "Status"
  ];

  const linhas = lista.map((r, i) => [
    i + 1,
    r.placa,
    r.modelo,
    r.proprietario,
    r.matricula,
    formatarDataHora(r.dataEntrada),
    r.dataSaida ? formatarDataHora(r.dataSaida) : "Em andamento",
    calcularTempo(r.dataEntrada, r.dataSaida) || "Em andamento",
    getStatus(r) === "estacionado" ? "Estacionado" : "Saiu"
  ]);


  const csvContent = [cabecalho, ...linhas]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");


  const bom  = "\uFEFF";
  const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);

  const link    = document.createElement("a");
  link.href     = url;
  link.download = `relatorio_garagem_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}




function aplicarFiltros() {
  const filtros   = obterFiltros();
  const filtrados = filtrarRegistros(registrosMock, filtros);
  renderizarTabela(filtrados);
  atualizarCards(filtrados);
}




document.addEventListener("DOMContentLoaded", function () {


  const hoje        = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  const toISO = (d) => d.toISOString().split("T")[0];

  document.getElementById("filtro-data-inicio").value = toISO(seteDiasAtras);
  document.getElementById("filtro-data-fim").value    = toISO(hoje);


  document.getElementById("btn-filtrar").addEventListener("click", aplicarFiltros);


  document.getElementById("btn-limpar").addEventListener("click", function () {
    document.getElementById("filtro-data-inicio").value = toISO(seteDiasAtras);
    document.getElementById("filtro-data-fim").value    = toISO(hoje);
    document.getElementById("filtro-placa").value       = "";
    document.getElementById("filtro-status").value      = "todos";
    document.getElementById("filtro-periodo").value     = "todos";
    aplicarFiltros();
  });


  document.getElementById("filtro-placa").addEventListener("input", aplicarFiltros);


  document.getElementById("btn-exportar-csv").addEventListener("click", function () {
    const filtros   = obterFiltros();
    const filtrados = filtrarRegistros(registrosMock, filtros);
    exportarCSV(filtrados);
  });


  aplicarFiltros();
});










// DASHBOARD











const TOTAL_VAGAS = 50; 



const registrosDash = [

  {
    id: 13,
    placa: "BCD-2345",
    modelo: "Sandero",
    proprietario: "Camila Torres",
    matricula: "2026011",
    dataEntrada: "2026-06-08T07:30:00",
    dataSaida:   null               
  },
  {
    id: 14,
    placa: "EFG-6789",
    modelo: "Uno",
    proprietario: "Ricardo Mendes",
    matricula: "2026012",
    dataEntrada: "2026-06-08T09:15:00",
    dataSaida:   "2026-06-08T12:00:00"
  },

  {
    id: 1,
    placa: "ABC-1234",
    modelo: "Civic",
    proprietario: "João Silva",
    matricula: "2026001",
    dataEntrada: "2026-06-07T08:30:00",
    dataSaida:   "2026-06-07T17:45:00"
  },
  {
    id: 2,
    placa: "XYZ-9876",
    modelo: "Onix",
    proprietario: "Maria Souza",
    matricula: "2026002",
    dataEntrada: "2026-06-07T13:20:00",
    dataSaida:   null              
  },

  {
    id: 3,
    placa: "DEF-5678",
    modelo: "Gol",
    proprietario: "Pedro Santos",
    matricula: "2026003",
    dataEntrada: "2026-06-06T07:15:00",
    dataSaida:   "2026-06-06T18:30:00"
  },
  {
    id: 4,
    placa: "GHI-3456",
    modelo: "HB20",
    proprietario: "Ana Lima",
    matricula: "2026004",
    dataEntrada: "2026-06-06T14:00:00",
    dataSaida:   "2026-06-06T19:45:00"
  },

  {
    id: 5,
    placa: "JKL-7890",
    modelo: "Kwid",
    proprietario: "Carlos Alves",
    matricula: "2026005",
    dataEntrada: "2026-06-05T09:00:00",
    dataSaida:   "2026-06-05T12:30:00"
  },
  {
    id: 6,
    placa: "MNO-2345",
    modelo: "Celta",
    proprietario: "Fernanda Costa",
    matricula: "2026006",
    dataEntrada: "2026-06-05T20:00:00",
    dataSaida:   "2026-06-05T23:30:00"
  },

  {
    id: 7,
    placa: "PQR-6789",
    modelo: "Argo",
    proprietario: "Roberto Dias",
    matricula: "2026007",
    dataEntrada: "2026-06-04T06:45:00",
    dataSaida:   "2026-06-04T15:20:00"
  },
  {
    id: 8,
    placa: "ABC-1234",
    modelo: "Civic",
    proprietario: "João Silva",
    matricula: "2026001",
    dataEntrada: "2026-06-04T10:00:00",
    dataSaida:   "2026-06-04T14:30:00"
  },

  {
    id: 9,
    placa: "STU-1234",
    modelo: "Fiesta",
    proprietario: "Luciana Rocha",
    matricula: "2026008",
    dataEntrada: "2026-06-03T11:30:00",
    dataSaida:   "2026-06-03T16:00:00"
  },

  {
    id: 10,
    placa: "VWX-5678",
    modelo: "Clio",
    proprietario: "Marcos Oliveira",
    matricula: "2026009",
    dataEntrada: "2026-06-02T07:00:00",
    dataSaida:   "2026-06-02T12:00:00"
  }
];





function toISO(date) {
  return date.toISOString().split("T")[0];
}


function formatarHora(dataStr) {
  return new Date(dataStr).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}


function formatarDiaMes(isoDate) {
  const [, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}`;
}


function getUltimosDias(n) {
  const dias = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dias.push(toISO(d));
  }
  return dias;
}




function calcularEstatisticas() {
  const hoje = toISO(new Date());

  const estacionados  = registrosDash.filter((r) => !r.dataSaida).length;
  const entradasHoje  = registrosDash.filter((r) => r.dataEntrada.startsWith(hoje)).length;
  const saidasHoje    = registrosDash.filter(
    (r) => r.dataSaida && r.dataSaida.startsWith(hoje)
  ).length;
  const vagasDisp     = Math.max(0, TOTAL_VAGAS - estacionados);
  const pctOcupacao   = Math.round((estacionados / TOTAL_VAGAS) * 100);

  return { estacionados, entradasHoje, saidasHoje, vagasDisp, pctOcupacao };
}




function renderizarCards() {
  const { estacionados, entradasHoje, saidasHoje, vagasDisp, pctOcupacao } =
    calcularEstatisticas();

  document.getElementById("card-estacionados").textContent = estacionados;
  document.getElementById("card-entradas").textContent     = entradasHoje;
  document.getElementById("card-saidas").textContent       = saidasHoje;
  document.getElementById("card-vagas").textContent        = vagasDisp;


  const barra = document.getElementById("barra-preenchida");
  const pctEl = document.getElementById("pct-ocupacao");

  barra.style.width = pctOcupacao + "%";
  pctEl.textContent = pctOcupacao + "% ocupado";

  barra.classList.remove("alta", "critica");
  if (pctOcupacao >= 90) barra.classList.add("critica");
  else if (pctOcupacao >= 70) barra.classList.add("alta");
}




function renderizarRecentes() {

  const recentes = [...registrosDash]
    .sort((a, b) => new Date(b.dataEntrada) - new Date(a.dataEntrada))
    .slice(0, 6);

  const lista = document.getElementById("recentes-lista");
  const totalEl = document.getElementById("total-recentes");

  totalEl.textContent = `${registrosDash.length} total`;

  lista.innerHTML = recentes
    .map((r) => {
      const estacionado = !r.dataSaida;
      const iconeClass  = estacionado ? "icone-estacionado" : "icone-fora";
      const icone       = estacionado ? "fa-car" : "fa-car-side";
      const badgeClass  = estacionado ? "badge-mini-est" : "badge-mini-fora";
      const badgeLabel  = estacionado ? "Estacionado" : "Saiu";
      const hora        = formatarHora(r.dataEntrada);
      const dataFormatada = new Date(r.dataEntrada).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "2-digit"
      });

      return `
        <div class="recente-item">
          <div class="recente-icone ${iconeClass}">
            <i class="fa-solid ${icone}"></i>
          </div>
          <div class="recente-corpo">
            <div class="recente-linha1">
              <span class="recente-placa">${r.placa}</span>
              <span class="recente-modelo">${r.modelo}</span>
            </div>
            <div class="recente-linha2">${r.proprietario} &middot; ${dataFormatada} às ${hora}</div>
          </div>
          <span class="badge-mini ${badgeClass}">${badgeLabel}</span>
        </div>
      `;
    })
    .join("");
}



function renderizarGrafico() {
  const dias = getUltimosDias(7);


  const entradas = dias.map(
    (dia) => registrosDash.filter((r) => r.dataEntrada.startsWith(dia)).length
  );
  const saidas = dias.map(
    (dia) => registrosDash.filter((r) => r.dataSaida && r.dataSaida.startsWith(dia)).length
  );
  const labels = dias.map(formatarDiaMes);

  const ctx = document.getElementById("grafico-movimentacoes").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Entradas",
          data: entradas,
          backgroundColor: "rgba(43, 131, 247, 0.75)",
          borderColor: "#2b83f7",
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        },
        {
          label: "Saídas",
          data: saidas,
          backgroundColor: "rgba(236, 143, 36, 0.75)",
          borderColor: "#ec8f24",
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: { family: "Arial", size: 12 },
            usePointStyle: true,
            pointStyleWidth: 8
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} veículo(s)`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: "Arial", size: 12 } }
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: { family: "Arial", size: 12 }
          },
          grid: { color: "#f0f0f0" }
        }
      }
    }
  });
}




function atualizarRelogio() {
  const el = document.getElementById("data-hora-atual");
  if (!el) return;

  const agora = new Date();
  const data = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const hora = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });


  el.textContent = data.charAt(0).toUpperCase() + data.slice(1) + " · " + hora;
}



function carregarNomeUsuario() {
  const SESSAO_KEY = "garagem_sessao";
  try {
    const ls = localStorage.getItem(SESSAO_KEY);
    const ss = sessionStorage.getItem(SESSAO_KEY);
    const sessao = ls ? JSON.parse(ls) : ss ? JSON.parse(ss) : null;
    const el = document.getElementById("nome-usuario");
    if (sessao && el) el.textContent = sessao.nome;
  } catch (_) {  }
}




document.addEventListener("DOMContentLoaded", function () {
  carregarNomeUsuario();

  renderizarCards();
  renderizarRecentes();
  renderizarGrafico();


  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
});
