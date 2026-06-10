// ─────────────────────────────────────────────────────────────
//  CONFIGURAÇÃO
// ─────────────────────────────────────────────────────────────
const TOTAL_VAGAS = 50; // Capacidade total do estacionamento


// ─────────────────────────────────────────────────────────────
//  DADOS MOCKADOS
//  Substitua por chamadas à API quando o backend estiver pronto.
//  dataSaida === null → veículo ainda estacionado
// ─────────────────────────────────────────────────────────────
const registrosDash = [
  // ── Hoje (2026-06-08) ──────────────────────────────────────
  {
    id: 13,
    placa: "BCD-2345",
    modelo: "Sandero",
    proprietario: "Camila Torres",
    matricula: "2026011",
    dataEntrada: "2026-06-08T07:30:00",
    dataSaida:   null               // ainda estacionado
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
  // ── Ontem (2026-06-07) ─────────────────────────────────────
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
    dataSaida:   null               // ainda estacionado
  },
  // ── 2026-06-06 ─────────────────────────────────────────────
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
  // ── 2026-06-05 ─────────────────────────────────────────────
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
  // ── 2026-06-04 ─────────────────────────────────────────────
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
  // ── 2026-06-03 ─────────────────────────────────────────────
  {
    id: 9,
    placa: "STU-1234",
    modelo: "Fiesta",
    proprietario: "Luciana Rocha",
    matricula: "2026008",
    dataEntrada: "2026-06-03T11:30:00",
    dataSaida:   "2026-06-03T16:00:00"
  },
  // ── 2026-06-02 ─────────────────────────────────────────────
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


// ─────────────────────────────────────────────────────────────
//  UTILITÁRIOS
// ─────────────────────────────────────────────────────────────

/** Retorna "AAAA-MM-DD" de qualquer Date */
function toISO(date) {
  return date.toISOString().split("T")[0];
}

/** Retorna "HH:MM" de uma string ISO */
function formatarHora(dataStr) {
  return new Date(dataStr).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

/** Retorna "DD/MM" de uma string "AAAA-MM-DD" */
function formatarDiaMes(isoDate) {
  const [, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}`;
}

/** Gera lista dos últimos N dias em formato "AAAA-MM-DD", mais antigo primeiro */
function getUltimosDias(n) {
  const dias = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dias.push(toISO(d));
  }
  return dias;
}


// ─────────────────────────────────────────────────────────────
//  CÁLCULO DE ESTATÍSTICAS
// ─────────────────────────────────────────────────────────────

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


// ─────────────────────────────────────────────────────────────
//  CARDS
// ─────────────────────────────────────────────────────────────

function renderizarCards() {
  const { estacionados, entradasHoje, saidasHoje, vagasDisp, pctOcupacao } =
    calcularEstatisticas();

  document.getElementById("card-estacionados").textContent = estacionados;
  document.getElementById("card-entradas").textContent     = entradasHoje;
  document.getElementById("card-saidas").textContent       = saidasHoje;
  document.getElementById("card-vagas").textContent        = vagasDisp;

  // Barra de ocupação
  const barra = document.getElementById("barra-preenchida");
  const pctEl = document.getElementById("pct-ocupacao");

  barra.style.width = pctOcupacao + "%";
  pctEl.textContent = pctOcupacao + "% ocupado";

  barra.classList.remove("alta", "critica");
  if (pctOcupacao >= 90) barra.classList.add("critica");
  else if (pctOcupacao >= 70) barra.classList.add("alta");
}


// ─────────────────────────────────────────────────────────────
//  ÚLTIMOS REGISTROS
// ─────────────────────────────────────────────────────────────

function renderizarRecentes() {
  // Ordena por dataEntrada decrescente e pega os 6 mais recentes
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


// ─────────────────────────────────────────────────────────────
//  GRÁFICO DE MOVIMENTAÇÕES (Chart.js)
// ─────────────────────────────────────────────────────────────

function renderizarGrafico() {
  const dias = getUltimosDias(7);

  // Conta entradas e saídas por dia
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


// ─────────────────────────────────────────────────────────────
//  RELÓGIO EM TEMPO REAL
// ─────────────────────────────────────────────────────────────

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

  // Capitaliza primeira letra
  el.textContent = data.charAt(0).toUpperCase() + data.slice(1) + " · " + hora;
}


// ─────────────────────────────────────────────────────────────
//  SAUDAÇÃO COM NOME DO USUÁRIO
// ─────────────────────────────────────────────────────────────

function carregarNomeUsuario() {
  const SESSAO_KEY = "garagem_sessao";
  try {
    const ls = localStorage.getItem(SESSAO_KEY);
    const ss = sessionStorage.getItem(SESSAO_KEY);
    const sessao = ls ? JSON.parse(ls) : ss ? JSON.parse(ss) : null;
    const el = document.getElementById("nome-usuario");
    if (sessao && el) el.textContent = sessao.nome;
  } catch (_) { /* sessão inválida — ignora */ }
}


// ─────────────────────────────────────────────────────────────
//  INICIALIZAÇÃO
// ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
  carregarNomeUsuario();

  renderizarCards();
  renderizarRecentes();
  renderizarGrafico();

  // Relógio atualiza a cada segundo
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
});
