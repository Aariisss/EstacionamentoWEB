// mobile_sidebar.js — sidebar mobile para Django (sem fetch, sidebar já está no HTML)

(function () {
    // Overlay escuro
    const overlay = document.createElement('div');
    overlay.id = 'overlay-sidebar-mobile';
    overlay.style.cssText = [
        'display:none',
        'position:fixed',
        'inset:0',
        'background:rgba(0,0,0,0.45)',
        'z-index:1999'
    ].join(';');
    document.body.appendChild(overlay);

    function abrirSidebar() {
        const sb = document.querySelector('.container');
        if (sb) sb.classList.add('aberta');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function fecharSidebar() {
        const sb = document.querySelector('.container');
        if (sb) sb.classList.remove('aberta');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    const btn = document.getElementById('btn-menu-mobile');
    if (btn) {
        btn.addEventListener('click', () => {
            const sb = document.querySelector('.container');
            sb && sb.classList.contains('aberta') ? fecharSidebar() : abrirSidebar();
        });
    }

    overlay.addEventListener('click', fecharSidebar);

    // Fecha ao clicar em link da sidebar no mobile
    document.addEventListener('click', (e) => {
        if (e.target.closest('a.menu-item') && window.innerWidth <= 768) {
            fecharSidebar();
        }
    });

    // Preenche nome/iniciais do usuário a partir do localStorage (mantém compatibilidade)
    try {
        const dados = localStorage.getItem('garagem_sessao') || sessionStorage.getItem('garagem_sessao');
        if (dados) {
            const u = JSON.parse(dados);
            const elNome   = document.getElementById('usuarionome');
            const elFuncao = document.getElementById('usuariofuncao');
            const elFoto   = document.getElementById('fotouser');
            if (elNome && u.nome)     elNome.textContent   = u.nome;
            if (elFuncao && u.funcao) elFuncao.textContent = u.funcao;
            if (elFoto && u.nome) {
                elFoto.textContent = (u.iniciais || u.nome.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2));
            }
        }
    } catch (_) {}

    // Logout
    const logoutArea = document.getElementById('logoutarea');
    if (logoutArea) {
        logoutArea.addEventListener('click', () => {
            localStorage.removeItem('garagem_sessao');
            sessionStorage.removeItem('garagem_sessao');
            Swal.fire({
                icon: 'success',
                title: 'Você saiu do sistema',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '/login/';
            });
        });
    }
})();
