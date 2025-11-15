document.addEventListener('DOMContentLoaded', () => {
  const checkboxEl = document.querySelector('.div-wrapper');
  const confirmButton = document.querySelector('.boto-continuar');
  // tenta recuperar o <a> que contém o botão (no HTML é: <a href="index.html"><div class="boto-continuar">...)</n  const outerLink = document.querySelector('a[href="index.html"]');

  if (!checkboxEl || !confirmButton) return;

  // Inicializa atributos de acessibilidade
  checkboxEl.setAttribute('role', 'checkbox');
  checkboxEl.setAttribute('tabindex', '0');
  checkboxEl.setAttribute('aria-checked', 'false');

  function setChecked(checked) {
    if (checked) {
      checkboxEl.classList.add('checked');
      checkboxEl.setAttribute('aria-checked', 'true');
      confirmButton.classList.remove('disabled');
      confirmButton.style.pointerEvents = 'auto';
      confirmButton.style.opacity = '1';
    } else {
      checkboxEl.classList.remove('checked');
      checkboxEl.setAttribute('aria-checked', 'false');
      confirmButton.classList.add('disabled');
      confirmButton.style.pointerEvents = 'none';
      confirmButton.style.opacity = '0.6';
    }
  }

  // Restaura estado salvo (se existir)
  const saved = localStorage.getItem('cancelamentoConfirmed');
  setChecked(saved === 'true');

  // Toggle ao clicar
  checkboxEl.addEventListener('click', () => {
    const now = checkboxEl.classList.contains('checked');
    setChecked(!now);
    // atualiza persistência imediata
    localStorage.setItem('cancelamentoConfirmed', (!now).toString());
  });

  // Também permite clicar no quadrado (.rectangle-9) para alternar
  const checkboxSquare = document.querySelector('.rectangle-9');
  if (checkboxSquare) {
    // delega a ação ao clique na área principal
    checkboxSquare.addEventListener('click', () => checkboxEl.click());
    checkboxSquare.setAttribute('role', 'button');
    checkboxSquare.setAttribute('tabindex', '0');
    checkboxSquare.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        checkboxEl.click();
      }
    });
  }

  // Suporte por teclado (Enter / Espaço)
  checkboxEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      checkboxEl.click();
    }
  });

  // Adiciona evento ao botão de confirmar
  if (confirmButton) {
    confirmButton.addEventListener('click', (e) => {
      if (!confirmButton.classList.contains('disabled')) {
        e.preventDefault();
        e.stopPropagation();
        // salvar confirmação final
        localStorage.setItem('cancelamentoConfirmed', 'true');
        
        // Mostrar modal criativo de cancelamento
        mostrarAvisoCancelamento();
      }
    });
  }

  // Previne navegação se o botão estiver desabilitado
  if (outerLink) {
    outerLink.addEventListener('click', (e) => {
      if (confirmButton.classList.contains('disabled')) {
        e.preventDefault();
        // feedback simples
        alert('Por favor confirme que está ciente antes de prosseguir.');
      }
    });
  }
});

// Função criativa para mostrar o aviso de cancelamento
function mostrarAvisoCancelamento() {
  // Criar overlay escuro
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-in;
  `;

  // Criar modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 40px;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.5s ease-out;
    position: relative;
  `;

  // Adicionar conteúdo ao modal
  modal.innerHTML = `
    <div style="font-size: 60px; margin-bottom: 20px; animation: spin 1s ease-out;">✓</div>
    <h2 style="color: white; font-size: 28px; margin: 0 0 15px 0; font-family: Arial, sans-serif;">
      Cancelamento Realizado!
    </h2>
    <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0 0 30px 0; font-family: Arial, sans-serif; line-height: 1.5;">
      Sentiremos sua falta! 😢<br>
      Suas informações foram removidas com segurança.
    </p>
    <button id="btnFechar" style="
      background: white;
      color: #667eea;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
      font-family: Arial, sans-serif;
    ">
      Voltar ao Início
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Adicionar animações CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes spin {
      from {
        transform: scale(0) rotate(-180deg);
      }
      to {
        transform: scale(1) rotate(0deg);
      }
    }
    #btnFechar:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
  `;
  document.head.appendChild(style);

  // Fechar modal ao clicar no botão
  document.getElementById('btnFechar').addEventListener('click', () => {
    overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
    setTimeout(() => {
      overlay.remove();
      // Redirecionar para página inicial
      window.location.href = 'index.html';
    }, 300);
  });

  // Fechar também ao clicar no overlay
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.click = () => {
        overlay.remove();
        window.location.href = 'index.html';
      };
    }
  });
}