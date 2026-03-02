# Formulário de Admissão de Emergência 🏥

Este repositório contém o código de um Formulário de Admissão de Emergência para um cenário hospitalar fictício. O objetivo do projeto é aplicar princípios de usabilidade, interação humano-computador e redução da carga cognitiva para os recepcionistas que atuam num ambiente de alto estresse e pressão de tempo.

## 🧠 Pilares Aplicados

1. **Gestalt e Percepção**: Uso de `fieldset` para agrupar visualmente informações complementares (isolando Dados Pessoais do Contato de Emergência).
2. **Uso Eficiente de Cores e Contraste**: 
   - Ação primária (**Confirmar Admissão**) está isolada e num azul vívido de alto contraste em relação ao fundo branco do formulário.
   - **Manejo de Erros** implementado com redundância: ao invés de usar apenas bordas vermelhas, o erro introduz um ícone de "Alerta/Problema" aliado a um texto descritivo e uma alteração na cor de funda do campo. Isso atende imediatamente a pessoas daltônicas.
3. **Memória e Chunking**: Aplicação de máscaras JavaScript no **CPF e Telefone**, exibindo os dígitos particionados visualmente (`123.456.789-00`). O cérebro humano decodifica pedaços de 3 a 4 dígitos muito mais fácil do que strings longas diretas.
4. **Foco e Atenção**: Ausência de cabeçalhos de navegação do hospital, banners móveis, ou itens desnecessários. O fluxo de olho é vertical e concentrado num único card flutuando em fundo de baixo contraste.
5. **Carga Cognitiva e Progressive Disclosure**: Um recepcionista pode omitir o preenchimento detalhado de histórico alérgico temporariamente para salvar o formulário rápido; foi adicionado um botão de revelação que esconde a sub-seção não emergencial do fluxo crítico, economizando carga visuoespacial na tela.

---

## 🏗️ O Maior Desafio: Chunking e Validação em Tempo Real (Memória)

Dentre as técnicas exigidas, a aplicação correta de **Memória e Chunking** em alinhamento com a **Redundância Visual da Validação (Erros)** foi o aspecto mais desafiador. 

**Por quê?**
Porque uma interface de emergência precisa ser passiva com o usuário, até ele testar limites, mas reagir de forma assertiva. Desenvolver o script de mascara (`script.js`) para capturar os dígitos e transformá-los dinamicamente em blocos visuais (`(11) 9....`) tira a fricção da "lembrança de curto prazo", mas exige que a validação de erro perceba o dado bruto (números) que o usuário tentou inserir caso ele não chegue até o final.

Garantir que os estados de erro se mostrassem apenas ao submeter (*prevent default*), alterando cor do fundo, borda, texto descritivo em vermelho e **especialmente inserindo um ícone interpretável**, necessitou não de um atributo padrão nativo de HTML (`required`), mas de controle customizável via JavaScript e regras CSS específicas para sobrepor o comportamento do navegador (que usa balões nativos muitas vezes não muito acessíveis). Alcançar um estado visual no qual um daltônico entenderia imediatamente o erro de um CPF incompleto requer uma união forte de CSS contextual.

---

## 🛠️ Como rodar o projeto

1. Faça o clone deste repositório
2. Abra o arquivo `index.html` em qualquer navegador web moderno. Não é necessário transpilação cruzada ou instalação via NPM, o projeto roda vanilla (puro HTML, JS, CSS).
