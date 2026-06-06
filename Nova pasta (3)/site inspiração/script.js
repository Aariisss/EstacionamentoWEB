// ── DADOS MOCK ──
let veiculos = [
  { id:1, placa:'ABC-1234', modelo:'Honda Civic', cor:'Prata', proprietario:'João Silva', matricula:'UGB2024001', status:'estacionado' },
  { id:2, placa:'DEF-5678', modelo:'Toyota Corolla', cor:'Preto', proprietario:'Maria Santos', matricula:'UGB2024002', status:'fora' },
  { id:3, placa:'GHI-9012', modelo:'VW Gol', cor:'Branco', proprietario:'Pedro Oliveira', matricula:'UGB2023045', status:'estacionado' },
  { id:4, placa:'JKL-3456', modelo:'Fiat Uno', cor:'Vermelho', proprietario:'Ana Costa', matricula:'UGB2023098', status:'estacionado' },
  { id:5, placa:'MNO-7890', modelo:'Chevrolet Onix', cor:'Cinza', proprietario:'Carlos Souza', matricula:'UGB2022011', status:'fora' },
  { id:6, placa:'PQR-1122', modelo:'Hyundai HB20', cor:'Azul', proprietario:'Fernanda Lima', matricula:'UGB2024056', status:'estacionado' },
  { id:7, placa:'STU-3344', modelo:'Nissan Kicks', cor:'Branco', proprietario:'Ricardo Melo', matricula:'UGB2021032', status:'fora' },
  { id:8, placa:'VWX-5566', modelo:'Jeep Renegade', cor:'Verde', proprietario:'Patrícia Nunes', matricula:'UGB2024078', status:'estacionado' },
];

let usuarios = [
  { id:1, nome:'Administrador', email:'admin@ugb.edu.br', matricula:'UGB0000001', perfil:'admin', ativo:'ativo' },
  { id:2, nome:'Carlos Porteiro', email:'carlos@ugb.edu.br', matricula:'UGB2020010', perfil:'operador', ativo:'ativo' },
  { id:3, nome:'Simone Segurança', email:'simone@ugb.edu.br', matricula:'UGB2021005', perfil:'vigia', ativo:'ativo' },
  { id:4, nome:'Lucas TI', email:'lucas@ugb.edu.br', matricula:'UGB2022030', perfil:'admin', ativo:'ativo' },
  { id:5, nome:'Renata Ops', email:'renata@ugb.edu.br', matricula:'UGB2023011', perfil:'operador', ativo:'inativo' },
];

let movimentacoes = [
  { id:1, tipo:'Entrada', placa:'ABC-1234', horario:'07:12', hora:7, tempo:'5h 23min', status:'estacionado', data:'2025-06-04' },
  { id:2, tipo:'Entrada', placa:'GHI-9012', horario:'07:45', hora:7, tempo:'4h 50min', status:'estacionado', data:'2025-06-04' },
  { id:3, tipo:'Saída', placa:'DEF-5678', horario:'08:20', hora:8, tempo:'2h 10min', status:'fora', data:'2025-06-04' },
  { id:4, tipo:'Entrada', placa:'JKL-3456', horario:'09:05', hora:9, tempo:'3h 30min', status:'estacionado', data:'2025-06-04' },
  { id:5, tipo:'Entrada', placa:'PQR-1122', horario:'09:33', hora:9, tempo:'3h 02min', status:'estacionado', data:'2025-06-04' },
  { id:6, tipo:'Saída', placa:'MNO-7890', horario:'10:15', hora:10, tempo:'1h 45min', status:'fora', data:'2025-06-04' },
  { id:7, tipo:'Entrada', placa:'VWX-5566', horario:'11:00', hora:11, tempo:'1h 35min', status:'estacionado', data:'2025-06-04' },
  { id:8, tipo:'Saída', placa:'STU-3344', horario:'12:30', hora:12, tempo:'3h 22min', status:'fora', data:'2025-06-04' },
  { id:9, tipo:'Entrada', placa:'ABC-1234', horario:'13:00', hora:13, tempo:'35min', status:'estacionado', data:'2025-06-03' },
  { id:10, tipo:'Saída', placa:'GHI-9012', horario:'14:35', hora:14, tempo:'4h 10min', status:'fora', data:'2025-06-03' },
  { id:11, tipo:'Entrada', placa:'JKL-3456', horario:'19:10', hora:19, tempo:'1h 05min', status:'estacionado', data:'2025-06-03' },
  { id:12, tipo:'Saída', placa:'PQR-1122', horario:'20:00', hora:20, tempo:'2h 30min', status:'fora', data:'2025-06-02' },
];

let nextVeiculoId = 9;
let nextUsuarioId = 6;
let confirmCallback = null;

// ── LOGIN ──
function togglePw() {
  const input = document.getElementById('login-senha');
  const icon = document.getElementById('pw-icon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value;
  let ok = true;

  document.getElementById('err-email').style.display = 'none';
  document.getElementById('err-senha').style.display = 'none';
  document.getElementById('err-cred').style.display = 'none';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('err-email').style.display = 'block';
    ok = false;
  }
  if (senha.length < 6) {
    document.getElementById('err-senha').style.display = 'block';
    ok = false;
  }
  if (!ok) return;

  if (email !== 'admin@ugb.edu.br' || senha !== '123456') {
    document.getElementById('err-cred').style.display = 'block';
    return;
  }

  sessionStorage.setItem('token', 'mocktoken123');
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  initApp();
}

document.getElementById('login-senha').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') doLogin();
});

function doLogout() {
  sessionStorage.removeItem('token');
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('login-email').value = '';
  document.getElementById('login-senha').value = '';
}

// ── INICIALIZAÇÃO ──
function initApp() {
  startClock();
  renderVagasGrid();
  renderUltimasMov();
  renderFluxoChart();
  renderMovimentacoes();
  renderVeiculos();
  renderUsuarios();
  renderRelatorio();
}

// ── RELÓGIO ──
function startClock() {
  function tick() {
    const now = new Date();
    document.getElementById('clock').textContent =
      now.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) +
      ' · ' + now.toLocaleDateString('pt-BR');
  }
  tick();
  setInterval(tick, 1000);
}

// ── NAVEGAÇÃO ──
function navigate(page) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.classList.remove('active');
  });

  document.getElementById('page-' + page).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(function(n) {
    if (n.getAttribute('onclick') && n.getAttribute('onclick').includes(page)) {
      n.classList.add('active');
    }
  });

  const titles = {
    'dashboard': 'Dashboard',
    'entrada-saida': 'Controle de Entrada e Saída',
    'veiculos': 'Controle de Veículos',
    'usuarios': 'Gestão de Usuários',
    'relatorios': 'Relatórios Operacionais'
  };
  document.getElementById('page-title').textContent = titles[page] || page;
  closeSidebar();
}

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

// ── MAPA DE VAGAS ──
function renderVagasGrid() {
  const grid = document.getElementById('vagas-grid');
  grid.innerHTML = '';
  for (let i = 1; i <= 50; i++) {
    const ocupada = i <= 18;
    const div = document.createElement('div');
    div.className = 'vaga ' + (ocupada ? 'ocupada' : 'livre');
    div.textContent = 'V' + String(i).padStart(2, '0');
    grid.appendChild(div);
  }
}

// ── ÚLTIMAS MOVIMENTAÇÕES (DASHBOARD) ──
function renderUltimasMov() {
  const container = document.getElementById('ultimas-mov');
  const ultimas = movimentacoes.filter(function(m) {
    return m.data === '2025-06-04';
  }).slice(0, 5);

  container.innerHTML = ultimas.map(function(m) {
    return '<div class="mov-item">' +
      '<div class="mov-type ' + (m.tipo === 'Entrada' ? 'entrada' : 'saida') + '">' +
        '<i class="fas fa-arrow-' + (m.tipo === 'Entrada' ? 'right' : 'left') + '"></i>' +
      '</div>' +
      '<div class="mov-info">' +
        '<strong>' + m.placa + '</strong>' +
        '<span>' + m.tipo + ' · Tempo: ' + m.tempo + '</span>' +
      '</div>' +
      '<div class="mov-time">' +
        '<strong>' + m.horario + '</strong>' +
        '<span>' + m.data + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

// ── GRÁFICO FLUXO ──
function renderFluxoChart() {
  const ctx = document.getElementById('fluxoChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['06h','07h','08h','09h','10h','11h','12h','13h','14h','15h','16h','17h'],
      datasets: [
        {
          label: 'Entradas',
          data: [2,8,12,9,7,5,11,6,4,8,10,6],
          backgroundColor: 'rgba(59,130,246,0.7)',
          borderRadius: 4
        },
        {
          label: 'Saídas',
          data: [0,2,5,7,8,9,6,8,10,7,5,4],
          backgroundColor: 'rgba(239,68,68,0.6)',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

// ── CONTROLE DE ENTRADA E SAÍDA ──
function renderMovimentacoes() {
  const busca = document.getElementById('es-busca').value.toLowerCase();
  const tipo = document.getElementById('es-tipo').value;
  const horario = document.getElementById('es-horario').value;

  const dados = movimentacoes.filter(function(m) {
    if (busca && !m.placa.toLowerCase().includes(busca)) return false;
    if (tipo && m.tipo !== tipo) return false;
    if (horario === 'manha' && (m.hora < 6 || m.hora >= 12)) return false;
    if (horario === 'tarde' && (m.hora < 12 || m.hora >= 18)) return false;
    if (horario === 'noite' && (m.hora < 18 || m.hora >= 23)) return false;
    return true;
  });

  document.getElementById('es-count').textContent = dados.length + ' registro(s)';
  const tbody = document.getElementById('es-tbody');

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:32px">Nenhum registro encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(function(m) {
    return '<tr>' +
      '<td><span class="badge ' + (m.tipo === 'Entrada' ? 'badge-success' : 'badge-danger') + '">' +
        '<i class="fas fa-arrow-' + (m.tipo === 'Entrada' ? 'right' : 'left') + '" style="margin-right:4px"></i>' + m.tipo +
      '</span></td>' +
      '<td><strong>' + m.placa + '</strong></td>' +
      '<td>' + m.data + ' ' + m.horario + '</td>' +
      '<td>' + m.tempo + '</td>' +
      '<td><span style="font-size:11px;color:var(--text-muted)"><i class="fas fa-image" style="margin-right:4px"></i>img_' + m.placa.replace('-','') + '.jpg</span></td>' +
      '<td><span class="badge ' + (m.status === 'estacionado' ? 'badge-info' : 'badge-warning') + '">' + (m.status === 'estacionado' ? 'No local' : 'Saiu') + '</span></td>' +
    '</tr>';
  }).join('');
}

// ── VEÍCULOS ──
function renderVeiculos() {
  const busca = document.getElementById('v-busca').value.toLowerCase();
  const status = document.getElementById('v-status').value;

  const dados = veiculos.filter(function(v) {
    if (busca && !v.placa.toLowerCase().includes(busca) && !v.proprietario.toLowerCase().includes(busca)) return false;
    if (status && v.status !== status) return false;
    return true;
  });

  document.getElementById('v-count').textContent = dados.length + ' veículo(s)';
  const tbody = document.getElementById('v-tbody');

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:32px">Nenhum veículo encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(function(v) {
    return '<tr>' +
      '<td><strong>' + v.placa + '</strong></td>' +
      '<td>' + v.modelo + '</td>' +
      '<td>' + v.cor + '</td>' +
      '<td>' + v.proprietario + '</td>' +
      '<td><code style="font-size:12px;background:#f1f5f9;padding:2px 6px;border-radius:4px">' + v.matricula + '</code></td>' +
      '<td><span class="badge ' + (v.status === 'estacionado' ? 'badge-info' : 'badge-warning') + '">' + (v.status === 'estacionado' ? 'Estacionado' : 'Fora') + '</span></td>' +
      '<td>' +
        '<div style="display:flex;gap:6px">' +
          '<button class="btn btn-sm btn-outline" onclick="editarVeiculo(' + v.id + ')" title="Editar"><i class="fas fa-edit"></i></button>' +
          '<button class="btn btn-sm btn-red" onclick="excluirVeiculo(' + v.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
        '</div>' +
      '</td>' +
    '</tr>';
  }).join('');
}

function abrirModalVeiculo(id) {
  document.getElementById('mv-title').textContent = id ? 'Editar Veículo' : 'Novo Veículo';
  document.getElementById('mv-id').value = id || '';

  if (id) {
    const v = veiculos.find(function(x) { return x.id === id; });
    document.getElementById('mv-placa').value = v.placa;
    document.getElementById('mv-modelo').value = v.modelo;
    document.getElementById('mv-cor').value = v.cor;
    document.getElementById('mv-proprietario').value = v.proprietario;
    document.getElementById('mv-matricula').value = v.matricula;
    document.getElementById('mv-status').value = v.status;
  } else {
    ['mv-placa','mv-modelo','mv-cor','mv-proprietario','mv-matricula'].forEach(function(f) {
      document.getElementById(f).value = '';
    });
    document.getElementById('mv-status').value = 'fora';
  }
  abrirModal('modal-veiculo');
}

function editarVeiculo(id) {
  abrirModalVeiculo(id);
}

function salvarVeiculo() {
  const placa = document.getElementById('mv-placa').value.trim();
  const modelo = document.getElementById('mv-modelo').value.trim();
  const proprietario = document.getElementById('mv-proprietario').value.trim();
  const matricula = document.getElementById('mv-matricula').value.trim();

  if (!placa || !modelo || !proprietario || !matricula) {
    toast('Preencha os campos obrigatórios.', 'error');
    return;
  }

  const id = parseInt(document.getElementById('mv-id').value) || null;
  const obj = {
    placa: placa,
    modelo: modelo,
    cor: document.getElementById('mv-cor').value.trim() || '—',
    proprietario: proprietario,
    matricula: matricula,
    status: document.getElementById('mv-status').value
  };

  if (id) {
    const idx = veiculos.findIndex(function(v) { return v.id === id; });
    veiculos[idx] = Object.assign({}, veiculos[idx], obj);
    toast('Veículo atualizado!', 'success');
  } else {
    veiculos.push(Object.assign({ id: nextVeiculoId++ }, obj));
    toast('Veículo cadastrado!', 'success');
  }

  fecharModal('modal-veiculo');
  renderVeiculos();
}

function excluirVeiculo(id) {
  openConfirm('Excluir veículo', 'Tem certeza que deseja excluir este veículo?', function() {
    veiculos = veiculos.filter(function(v) { return v.id !== id; });
    renderVeiculos();
    toast('Veículo excluído.', 'success');
  });
}

// ── USUÁRIOS ──
function renderUsuarios() {
  const busca = document.getElementById('u-busca').value.toLowerCase();
  const dados = usuarios.filter(function(u) {
    return !busca || u.nome.toLowerCase().includes(busca) || u.matricula.toLowerCase().includes(busca);
  });

  document.getElementById('u-count').textContent = dados.length + ' usuário(s)';

  const perfis = {
    admin: '<span class="badge badge-info">Admin</span>',
    operador: '<span class="badge badge-success">Operador</span>',
    vigia: '<span class="badge badge-warning">Vigia</span>'
  };

  const tbody = document.getElementById('u-tbody');

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:32px">Nenhum usuário encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(function(u) {
    const iniciais = u.nome.split(' ').map(function(n) { return n[0]; }).slice(0, 2).join('');
    return '<tr>' +
      '<td><div style="display:flex;align-items:center;gap:10px">' +
        '<div style="width:34px;height:34px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0">' + iniciais + '</div>' +
        '<strong>' + u.nome + '</strong>' +
      '</div></td>' +
      '<td>' + u.email + '</td>' +
      '<td><code style="font-size:12px;background:#f1f5f9;padding:2px 6px;border-radius:4px">' + u.matricula + '</code></td>' +
      '<td>' + (perfis[u.perfil] || u.perfil) + '</td>' +
      '<td><span class="badge ' + (u.ativo === 'ativo' ? 'badge-success' : 'badge-danger') + '">' + u.ativo + '</span></td>' +
      '<td>' +
        '<div style="display:flex;gap:6px">' +
          '<button class="btn btn-sm btn-outline" onclick="editarUsuario(' + u.id + ')"><i class="fas fa-edit"></i></button>' +
          '<button class="btn btn-sm btn-red" onclick="excluirUsuario(' + u.id + ')"><i class="fas fa-trash"></i></button>' +
        '</div>' +
      '</td>' +
    '</tr>';
  }).join('');
}

function abrirModalUsuario(id) {
  document.getElementById('mu-title').textContent = id ? 'Editar Usuário' : 'Novo Usuário';
  document.getElementById('mu-id').value = id || '';

  if (id) {
    const u = usuarios.find(function(x) { return x.id === id; });
    document.getElementById('mu-nome').value = u.nome;
    document.getElementById('mu-email').value = u.email;
    document.getElementById('mu-matricula').value = u.matricula;
    document.getElementById('mu-perfil').value = u.perfil;
    document.getElementById('mu-senha').value = '';
    document.getElementById('mu-ativo').value = u.ativo;
  } else {
    ['mu-nome','mu-email','mu-matricula','mu-senha'].forEach(function(f) {
      document.getElementById(f).value = '';
    });
    document.getElementById('mu-perfil').value = 'operador';
    document.getElementById('mu-ativo').value = 'ativo';
  }
  abrirModal('modal-usuario');
}

function editarUsuario(id) {
  abrirModalUsuario(id);
}

function salvarUsuario() {
  const nome = document.getElementById('mu-nome').value.trim();
  const email = document.getElementById('mu-email').value.trim();
  const matricula = document.getElementById('mu-matricula').value.trim();
  const senha = document.getElementById('mu-senha').value;

  if (!nome || !email || !matricula) {
    toast('Preencha os campos obrigatórios.', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast('Email inválido.', 'error');
    return;
  }

  const id = parseInt(document.getElementById('mu-id').value) || null;
  if (!id && senha.length < 6) {
    toast('A senha deve ter pelo menos 6 caracteres.', 'error');
    return;
  }

  const obj = {
    nome: nome,
    email: email,
    matricula: matricula,
    perfil: document.getElementById('mu-perfil').value,
    ativo: document.getElementById('mu-ativo').value
  };

  if (id) {
    const idx = usuarios.findIndex(function(u) { return u.id === id; });
    usuarios[idx] = Object.assign({}, usuarios[idx], obj);
    toast('Usuário atualizado!', 'success');
  } else {
    usuarios.push(Object.assign({ id: nextUsuarioId++ }, obj));
    toast('Usuário cadastrado!', 'success');
  }

  fecharModal('modal-usuario');
  renderUsuarios();
}

function excluirUsuario(id) {
  openConfirm('Excluir usuário', 'Tem certeza que deseja excluir este usuário?', function() {
    usuarios = usuarios.filter(function(u) { return u.id !== id; });
    renderUsuarios();
    toast('Usuário excluído.', 'success');
  });
}

// ── RELATÓRIOS ──
function renderRelatorio() {
  const de = document.getElementById('r-de').value;
  const ate = document.getElementById('r-ate').value;
  const status = document.getElementById('r-status').value;
  const horario = document.getElementById('r-horario').value;
  const placa = document.getElementById('r-placa').value.toLowerCase();

  const dados = movimentacoes.filter(function(m) {
    if (de && m.data < de) return false;
    if (ate && m.data > ate) return false;
    if (status === 'estacionado' && m.status !== 'estacionado') return false;
    if (status === 'fora' && m.status !== 'fora') return false;
    if (horario === 'manha' && (m.hora < 6 || m.hora >= 12)) return false;
    if (horario === 'tarde' && (m.hora < 12 || m.hora >= 18)) return false;
    if (horario === 'noite' && (m.hora < 18 || m.hora >= 23)) return false;
    if (placa && !m.placa.toLowerCase().includes(placa)) return false;
    return true;
  });

  document.getElementById('r-count').textContent = dados.length + ' registro(s)';
  window._relatorioData = dados;

  const tbody = document.getElementById('r-tbody');

  if (!dados.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:32px">Nenhum registro para os filtros selecionados.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map(function(m) {
    const v = veiculos.find(function(x) { return x.placa === m.placa; });
    return '<tr>' +
      '<td>' + m.data + '</td>' +
      '<td><span class="badge ' + (m.tipo === 'Entrada' ? 'badge-success' : 'badge-danger') + '">' + m.tipo + '</span></td>' +
      '<td><strong>' + m.placa + '</strong></td>' +
      '<td>' + (v ? v.proprietario : '—') + '</td>' +
      '<td>' + m.horario + '</td>' +
      '<td>' + m.tempo + '</td>' +
      '<td><span class="badge ' + (m.status === 'estacionado' ? 'badge-info' : 'badge-warning') + '">' + (m.status === 'estacionado' ? 'No local' : 'Saiu') + '</span></td>' +
    '</tr>';
  }).join('');
}

function exportCSV() {
  const dados = window._relatorioData || [];
  if (!dados.length) {
    toast('Nenhum dado para exportar.', 'error');
    return;
  }

  const header = ['Data','Tipo','Placa','Proprietario','Horario','Tempo_Permanencia','Status'];
  const rows = dados.map(function(m) {
    const v = veiculos.find(function(x) { return x.placa === m.placa; });
    return [m.data, m.tipo, m.placa, v ? v.proprietario : '', m.horario, m.tempo, m.status];
  });

  const csv = [header].concat(rows).map(function(r) { return r.join(','); }).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'relatorio_estacionamento.csv';
  a.click();
  URL.revokeObjectURL(url);
  toast('CSV exportado com sucesso!', 'success');
}

// ── MODAL ──
function abrirModal(id) {
  document.getElementById(id).classList.add('open');
}

function fecharModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(function(m) {
  m.addEventListener('click', function(e) {
    if (e.target === m) m.classList.remove('open');
  });
});

// ── CONFIRMAÇÃO ──
function openConfirm(titulo, msg, cb) {
  document.getElementById('confirm-title').textContent = titulo;
  document.getElementById('confirm-msg').textContent = msg;
  confirmCallback = cb;
  document.getElementById('confirm-overlay').classList.add('open');
}

function closeConfirm() {
  document.getElementById('confirm-overlay').classList.remove('open');
  confirmCallback = null;
}

document.getElementById('confirm-ok').onclick = function() {
  if (confirmCallback) confirmCallback();
  closeConfirm();
};

// ── TOAST ──
function toast(msg, type) {
  type = type || 'success';
  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle' };
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML = '<i class="' + icons[type] + '"></i> ' + msg;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(function() { t.remove(); }, 3500);
}

// ── VERIFICAR SESSÃO AO CARREGAR ──
if (sessionStorage.getItem('token')) {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  initApp();
}