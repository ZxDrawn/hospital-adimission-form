document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emergency-form');
    const cpfInput = document.getElementById('cpf');
    const telInput = document.getElementById('telefone-contato');
    const toggleExtraBtn = document.getElementById('btn-toggle-extra');
    const extraPanel = document.getElementById('extra-info-panel');

    // ==========================================
    // PILAR: Memória e Chunking
    // Aplicação de máscaras para agrupar as informações (Chunks)
    // Reduz o esforço da memória de curto prazo ao ler/digitar.
    // ==========================================
    
    // Máscara CPF (XXX.XXX.XXX-XX)
    cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove não números
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
        }
        e.target.value = value;
    });

    // Máscara Telefone Celular ((XX) XXXXX-XXXX)
    telInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3"); // Fixo pra 8 dígitos temporariamente enquanto digita
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{1,5})/, "($1) $2");
        } else if (value.length > 0) {
            value = value.replace(/(\d{1,2})/, "($1");
        }
        e.target.value = value;
    });

    // ==========================================
    // PILAR: Redução de Carga Cognitiva (Progressive Disclosure)
    // Escondendo fluxo alternativo para manter o formulário de emergência enxuto.
    // ==========================================
    toggleExtraBtn.addEventListener('click', () => {
        const isHidden = extraPanel.hasAttribute('hidden');
        if (isHidden) {
            extraPanel.removeAttribute('hidden');
            toggleExtraBtn.textContent = '- Ocultar Histórico';
            toggleExtraBtn.setAttribute('aria-expanded', 'true');
        } else {
            extraPanel.setAttribute('hidden', '');
            toggleExtraBtn.textContent = '+ Adicionar Histórico (Alergias / Medicação) - Não Urgente';
            toggleExtraBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // ==========================================
    // PILAR: Redundância Visual (Erros acessíveis)
    // ==========================================
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio real para fins desta demonstração

        let isValid = true;
        
        // Limpa erros anteriores
        document.querySelectorAll('.input-control').forEach(ctrl => ctrl.classList.remove('error'));

        // Validação simples
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input);
                isValid = false;
            } else if (input.id === 'cpf' && input.value.replace(/\D/g, '').length !== 11) {
                showError(input);
                isValid = false;
            } else if (input.id === 'telefone-contato' && input.value.replace(/\D/g, '').length < 10) {
                showError(input);
                isValid = false;
            }
        });

        if (isValid) {
            // Emissão de sucesso
            alert('Paciente admitido com sucesso. Os dados foram salvos sob alta prioridade.');
            form.reset();
            if(!extraPanel.hasAttribute('hidden')) toggleExtraBtn.click();
        } else {
            // Foca no primeiro erro para facilitar correção na correria
            const firstError = document.querySelector('.input-control.error input, .input-control.error textarea');
            if(firstError) firstError.focus();
        }
    });

    function showError(inputElement) {
        const control = inputElement.closest('.input-control');
        control.classList.add('error');
    }
});
