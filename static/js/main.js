// ===== ParkUGB — Shared Data & Utils =====

// Auth guard
function authGuard() {
  if (!localStorage.getItem('parkugb_token')) {
    window.location.href = 'login.html';
  }
}

// Logout
function logout() {
  localStorage.removeItem('parkugb_token');
  localStorage.removeItem('parkugb_user');
  window.location.href = 'login.html';
}

// Get current user
function getUser() {
  const u = localStorage.getItem('parkugb_user');
  return u ? JSON.parse(u) : { nome: 'Admin UGB', email: 'admin@ugb.edu.br', papel: 'Administrador' };
}

// Populate sidebar user
function populateSidebarUser() {
  const u = getUser();
  const nameEl = document.getElementById('sidebarUserName');
  const roleEl = document.getElementById('sidebarUserRole');
  const avEl = document.getElementById('sidebarUserAvatar');
  if (nameEl) nameEl.textContent = u.nome || 'Admin';
  if (roleEl) roleEl.textContent = u.papel || 'Admin';
  if (avEl) avEl.textContent = (u.nome || 'A')[0];
}

// Toast notifications
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer') || (() => {
    const d = document.createElement('div');
    d.id = 'toastContainer';
    d.className = 'toast-container';
    document.body.appendChild(d);
    return d;
  })();

  const icons = { success: 'fa-circle-check', danger: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  const colors = { success: '#4ade80', danger: '#f87171', warning: '#fbbf24', info: '#60a5fa' };

  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `
    <i class="fas ${icons[type] || icons.info}" style="color:${colors[type]};font-size:16px"></i>
    <span>${msg}</span>
    <button class="close-toast" onclick="this.parentElement.remove()"><i class="fas fa-xmark"></i></button>
  `;
  container.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// Format date/time
function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

// Calculate stay duration
function calcDuration(entryISO, exitISO) {
  const start = new Date(entryISO);
  const end = exitISO ? new Date(exitISO) : new Date();
  const diff = Math.floor((end - start) / 60000); // minutes
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h === 0) return `${m}min`;
  return `${h}h ${m}min`;
}

// Hamburger sidebar toggle
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}

// Confirm dialog
function showConfirm(title, msg, onConfirm) {
  const overlay = document.getElementById('confirmOverlay');
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMsg').textContent = msg;
  overlay.classList.add('open');
  document.getElementById('confirmOk').onclick = () => {
    overlay.classList.remove('open');
    onConfirm();
  };
  document.getElementById('confirmCancel').onclick = () => overlay.classList.remove('open');
}

// ===== MOCK DATA =====

const MOCK_VEICULOS = [
  { id: 1, placa: 'ABC-1234', modelo: 'Honda Civic', cor: 'Prata', dono: 'Carlos Mendes', matricula: '2021001', tipo: 'Colaborador', status: 'estacionado', entrada: '2024-06-04T08:12:00' },
  { id: 2, placa: 'DEF-5678', modelo: 'Toyota Corolla', cor: 'Branco', dono: 'Ana Lima', matricula: '2020045', tipo: 'Colaborador', status: 'saiu', entrada: '2024-06-04T07:45:00', saida: '2024-06-04T11:30:00' },
  { id: 3, placa: 'GHI-9012', modelo: 'VW Gol', cor: 'Vermelho', dono: 'Lucas Souza', matricula: '2022078', tipo: 'Aluno', status: 'estacionado', entrada: '2024-06-04T09:05:00' },
  { id: 4, placa: 'JKL-3456', modelo: 'Fiat Palio', cor: 'Preto', dono: 'Mariana Costa', matricula: '2021110', tipo: 'Aluno', status: 'saiu', entrada: '2024-06-03T14:00:00', saida: '2024-06-03T17:45:00' },
  { id: 5, placa: 'MNO-7890', modelo: 'Chevrolet Onix', cor: 'Azul', dono: 'Pedro Alves', matricula: '2023005', tipo: 'Aluno', status: 'estacionado', entrada: '2024-06-04T10:20:00' },
  { id: 6, placa: 'PQR-2345', modelo: 'Ford Ka', cor: 'Cinza', dono: 'Juliana Rocha', matricula: '2019234', tipo: 'Professor', status: 'estacionado', entrada: '2024-06-04T07:30:00' },
  { id: 7, placa: 'STU-6789', modelo: 'Renault Sandero', cor: 'Branco', dono: 'Roberto Faria', matricula: '2022456', tipo: 'Aluno', status: 'saiu', entrada: '2024-06-04T06:50:00', saida: '2024-06-04T09:15:00' },
  { id: 8, placa: 'VWX-0123', modelo: 'Hyundai HB20', cor: 'Preto', dono: 'Fernanda Dias', matricula: '2021789', tipo: 'Colaborador', status: 'estacionado', entrada: '2024-06-04T11:00:00' },
];

const MOCK_MOVIMENTOS = [
  { id: 1, tipo: 'entrada', placa: 'ABC-1234', horario: '2024-06-04T08:12:00', imagem: null, veiculo: 'Honda Civic', dono: 'Carlos Mendes' },
  { id: 2, tipo: 'entrada', placa: 'GHI-9012', horario: '2024-06-04T09:05:00', imagem: null, veiculo: 'VW Gol', dono: 'Lucas Souza' },
  { id: 3, tipo: 'saida', placa: 'STU-6789', horario: '2024-06-04T09:15:00', imagem: null, veiculo: 'Renault Sandero', dono: 'Roberto Faria' },
  { id: 4, tipo: 'entrada', placa: 'MNO-7890', horario: '2024-06-04T10:20:00', imagem: null, veiculo: 'Chevrolet Onix', dono: 'Pedro Alves' },
  { id: 5, tipo: 'saida', placa: 'DEF-5678', horario: '2024-06-04T11:30:00', imagem: null, veiculo: 'Toyota Corolla', dono: 'Ana Lima' },
  { id: 6, tipo: 'entrada', placa: 'VWX-0123', horario: '2024-06-04T11:00:00', imagem: null, veiculo: 'Hyundai HB20', dono: 'Fernanda Dias' },
  { id: 7, tipo: 'entrada', placa: 'PQR-2345', horario: '2024-06-04T07:30:00', imagem: null, veiculo: 'Ford Ka', dono: 'Juliana Rocha' },
  { id: 8, tipo: 'entrada', placa: 'JKL-3456', horario: '2024-06-03T14:00:00', imagem: null, veiculo: 'Fiat Palio', dono: 'Mariana Costa' },
  { id: 9, tipo: 'saida', placa: 'JKL-3456', horario: '2024-06-03T17:45:00', imagem: null, veiculo: 'Fiat Palio', dono: 'Mariana Costa' },
  { id: 10, tipo: 'entrada', placa: 'STU-6789', horario: '2024-06-04T06:50:00', imagem: null, veiculo: 'Renault Sandero', dono: 'Roberto Faria' },
];

const MOCK_USUARIOS = [
  { id: 1, nome: 'Admin UGB', email: 'admin@ugb.edu.br', matricula: 'ADM001', papel: 'Administrador', status: 'ativo', criado: '2023-01-10' },
  { id: 2, nome: 'João Operador', email: 'joao@ugb.edu.br', matricula: 'OPE001', papel: 'Operador', status: 'ativo', criado: '2023-03-15' },
  { id: 3, nome: 'Maria Segurança', email: 'maria@ugb.edu.br', matricula: 'SEG001', papel: 'Segurança', status: 'ativo', criado: '2023-05-20' },
  { id: 4, nome: 'Paulo Técnico', email: 'paulo@ugb.edu.br', matricula: 'TEC001', papel: 'Operador', status: 'inativo', criado: '2022-11-01' },
];

const VAGAS_TOTAL = 50;

function getVagasOcupadas() {
  return MOCK_VEICULOS.filter(v => v.status === 'estacionado').length;
}
function getVagasLivres() {
  return VAGAS_TOTAL - getVagasOcupadas();
}
function getEntradasHoje() {
  const hoje = new Date().toISOString().slice(0,10);
  return MOCK_MOVIMENTOS.filter(m => m.tipo === 'entrada' && m.horario.startsWith(hoje)).length;
}
function getSaidasHoje() {
  const hoje = new Date().toISOString().slice(0,10);
  return MOCK_MOVIMENTOS.filter(m => m.tipo === 'saida' && m.horario.startsWith(hoje)).length;
}

// --- CRUD helpers (store in window ---
window.mockData = {
  veiculos: [...MOCK_VEICULOS],
  movimentos: [...MOCK_MOVIMENTOS],
  usuarios: [...MOCK_USUARIOS],
  nextVeiculoId: MOCK_VEICULOS.length + 1,
  nextUsuarioId: MOCK_USUARIOS.length + 1,
};