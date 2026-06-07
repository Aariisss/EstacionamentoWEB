
//  Estrutura: { id, placa, modelo, proprietario, matricula,
//               dataEntrada (ISO), dataSaida (ISO | null) }
//  dataSaida === null → veículo ainda estacionado
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
    dataSaida:   null   // ainda estacionado
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
    placa: "ABC-1234",  // mesma placa do id 1 — visita anterior
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
    placa: "XYZ-9876",  // mesma placa do id 2 — visita anterior
    modelo: "Onix",
    proprietario: "Maria Souza",
    matricula: "2026002",
    dataEntrada: "2026-06-01T08:00:00",
    dataSaida:   "2026-06-01T13:30:00"
  }
];


// ─────────────────────────────────────────────────────────────
//  UTILITÁRIOS DE DATA / HORA
// ─────────────────────────────────────────────────────────────

/** Retorna "DD/MM/AAAA" */
function formatarData(dataStr) {
  return new Date(dataStr).toLocaleDateString("pt-BR");
}

/** Retorna "HH:MM" */
function formatarHora(dataStr) {
  return new Date(dataStr).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

/** Retorna "DD/MM/AAAA HH:MM" */
function formatarDataHora(dataStr) {
  return `${formatarData(dataStr)} ${formatarHora(dataStr)}`;
}

/**
 * Calcula tempo de permanência.
 * Se dataSaida for null, usa o horário atual.
 * Retorna string como "9h 15min" ou "Em andamento".
 */
function calcularTempo(dataEntradaStr, dataSaidaStr) {
  const entrada = new Date(dataEntradaStr);
  const saida   = dataSaidaStr ? new Date(dataSaidaStr) : null;

  if (!saida) return null; // sinaliza "em andamento"

  const diffMs  = saida - entrada;
  const horas   = Math.floor(diffMs / 3_600_000);
  const minutos = Math.floor((diffMs % 3_600_000) / 60_000);
  return `${horas}h ${minutos}min`;
}

/**
 * Retorna "manha", "tarde" ou "noite" baseado no horário de entrada.
 * Manhã: 6h–12h | Tarde: 12h–18h | Noite: 18h–6h
 */
function getPeriodo(dataStr) {
  const hora = new Date(dataStr).getHours();
  if (hora >= 6 && hora < 12) return "manha";
  if (hora >= 12 && hora < 18) return "tarde";
  return "noite";
}

/** Retorna "estacionado" (sem saída) ou "fora" */
function getStatus(registro) {
  return registro.dataSaida ? "fora" : "estacionado";
}


// ─────────────────────────────────────────────────────────────
//  FILTRO
// ─────────────────────────────────────────────────────────────

/** Lê os valores atuais dos inputs de filtro */
function obterFiltros() {
  return {
    dataInicio: document.getElementById("filtro-data-inicio").value,
    dataFim:    document.getElementById("filtro-data-fim").value,
    placa:      document.getElementById("filtro-placa").value.trim().toUpperCase(),
    status:     document.getElementById("filtro-status").value,
    periodo:    document.getElementById("filtro-periodo").value
  };
}

/** Aplica os filtros a lista e retorna os registros que passam */
function filtrarRegistros(lista, filtros) {
  return lista.filter((r) => {
    const dtEntrada = new Date(r.dataEntrada);

    // ── Faixa de datas ──
    if (filtros.dataInicio) {
      const inicio = new Date(filtros.dataInicio + "T00:00:00");
      if (dtEntrada < inicio) return false;
    }
    if (filtros.dataFim) {
      const fim = new Date(filtros.dataFim + "T23:59:59");
      if (dtEntrada > fim) return false;
    }

    // ── Placa (busca parcial) ──
    if (filtros.placa && !r.placa.includes(filtros.placa)) return false;

    // ── Status ──
    if (filtros.status !== "todos" && getStatus(r) !== filtros.status) return false;

    // ── Período do dia ──
    if (filtros.periodo !== "todos" && getPeriodo(r.dataEntrada) !== filtros.periodo) return false;

    return true;
  });
}


// ─────────────────────────────────────────────────────────────
//  RENDERIZAÇÃO DA TABELA
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
//  CARDS DE RESUMO
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
//  EXPORTAR CSV
// ─────────────────────────────────────────────────────────────

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

  // Envolve cada célula em aspas para lidar com vírgulas e acentos
  const csvContent = [cabecalho, ...linhas]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  // BOM UTF-8 garante que o Excel abra sem problemas com acentos
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


// ─────────────────────────────────────────────────────────────
//  FUNÇÃO PRINCIPAL — filtra + renderiza + atualiza cards
// ─────────────────────────────────────────────────────────────

function aplicarFiltros() {
  const filtros   = obterFiltros();
  const filtrados = filtrarRegistros(registrosMock, filtros);
  renderizarTabela(filtrados);
  atualizarCards(filtrados);
}


// ─────────────────────────────────────────────────────────────
//  INICIALIZAÇÃO
// ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {

  // ── Datas padrão: últimos 7 dias ──
  const hoje        = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  const toISO = (d) => d.toISOString().split("T")[0];

  document.getElementById("filtro-data-inicio").value = toISO(seteDiasAtras);
  document.getElementById("filtro-data-fim").value    = toISO(hoje);

  // ── Botão Filtrar ──
  document.getElementById("btn-filtrar").addEventListener("click", aplicarFiltros);

  // ── Botão Limpar ──
  document.getElementById("btn-limpar").addEventListener("click", function () {
    document.getElementById("filtro-data-inicio").value = toISO(seteDiasAtras);
    document.getElementById("filtro-data-fim").value    = toISO(hoje);
    document.getElementById("filtro-placa").value       = "";
    document.getElementById("filtro-status").value      = "todos";
    document.getElementById("filtro-periodo").value     = "todos";
    aplicarFiltros();
  });

  // ── Busca em tempo real pela placa ao digitar ──
  document.getElementById("filtro-placa").addEventListener("input", aplicarFiltros);

  // ── Botão Exportar CSV ──
  document.getElementById("btn-exportar-csv").addEventListener("click", function () {
    const filtros   = obterFiltros();
    const filtrados = filtrarRegistros(registrosMock, filtros);
    exportarCSV(filtrados);
  });

  // ── Renderização inicial ──
  aplicarFiltros();
});
