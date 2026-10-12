# Write and Back PRO — Edição comercial 3.0
**Copyright © 2026 Nailson Rodrigues de Lima. Todos os direitos reservados.**

## Começar agora (um único HTML)
1. Abra **Write_and_Back_PRO_3_0.html** ou **index.html** em um navegador atualizado (Chrome/Edge/Firefox).
2. Leia os Termos, a Política de Privacidade e o Contrato de Licença. O aceite é registrado **apenas neste navegador**.
3. Digite sua ideia; selecione o nível de profundidade e clique em **Gerar prompt profissional**.
4. Consulte **Diagnóstico** e **Aprenda**; copie, edite, salve ou exporte TXT/Markdown. Impressão para PDF depende da opção de impressão do navegador.
5. Para funções avançadas, vá a **Licença e ativação**, cole uma licença PRO assinada e ative; em seguida abra **Laboratório PRO**.

A abertura do arquivo HTML não exige instalação, login, npm ou chave de API. Alguns navegadores/ambientes com políticas restritivas podem bloquear download, armazenamento ou Web Crypto no modo `file://`; nesses casos, sirva a pasta em `localhost` ou utilize uma hospedagem HTTPS. Windows 7 e navegadores antigos não são homologados.

## Módulos
- **Estúdio:** gerador por motor local de regras, objetivos, papéis, requisitos, critérios de aceite, riscos e informações pendentes; ajuste de profundidade, setor e público.
- **Academia:** 5 aulas, com exercícios de aprendizagem.
- **Biblioteca:** 9 modelos de ideias e projetos.
- **Diagnóstico:** completude heurística e alertas de contradições. 100/100 significa cumprimento de critérios textuais do motor, **não** acerto factual.
- **Meus projetos:** histórico sob comando explícito do usuário, importar/exportar JSON (até 2 MB), excluir. Os dados não são sincronizados.
- **Laboratório PRO:** 3 versões paralelas, plano de QA para execução humana e registro de decisões/hipóteses.
- **Termos e contrato:** visualização integrada, aceite e revogação locais. Não há verificação de identidade, faturamento, assinatura qualificada ou comprovante independente.
- **IA generativa (opcional):** requer servidor Node e conta de API no fornecedor. A IA não está incorporada ou treinada localmente. Sem servidor, permanece exclusivamente o motor local.

## Emissão de licença: SOMENTE TITULAR
A pasta `operador/` é **sigilosa** e está apenas no pacote reservado do titular, não no pacote do comprador.
1. Tenha Node.js 20+ no computador do titular.
2. Execute na pasta do produto: `node ferramentas/emitir-licenca.js "Nome do comprador" 2027-10-11` (ajuste a data de vencimento).
3. O código é criado em `operador/ultima_licenca_emitida.txt`. Envie **apenas o código** ao comprador. Nunca inclua `operador/CHAVE_PRIVADA_NAO_DISTRIBUIR.pem` em qualquer entrega, servidor acessível ao público ou repositório.
4. Validação administrativa: `node ferramentas/verificar-licenca.js operador/ultima_licenca_emitida.txt`.
5. A edição PRO depende do relógio do dispositivo e de Web Crypto; o usuário final pode adulterar código HTML/JS. A licença não substitui controle de conta/assinatura em servidor.

**Importante:** o pacote do titular inclui uma licença de teste de longa validade somente para testes do proprietário. Refaça e proteja as chaves antes da distribuição massiva se tiver dúvidas sobre o ambiente de armazenamento. Não publique o ZIP do titular.

## Servidor opcional para IA generativa
Requer Node.js >= 20 em servidor controlado pelo titular, HTTPS no acesso público e contrato com provedor de IA compatível. Na máquina de teste, configure variáveis de ambiente `OPENAI_API_KEY`, `WRITEBACK_ACCESS_TOKEN` (um código aleatório forte e longo) e, se necessário, `OPENAI_MODEL`. Execute `node server.js` e acesse `http://127.0.0.1:3080`.

**Não inclua a chave da API no HTML.** O código de acesso é solicitado no primeiro uso do refinamento e fica apenas em memória de execução. O backend aplica limite simples por endereço IP, limite de corpo, restrições de origem, CSP por hashes e não grava mensagens em disco. Ainda **não** implementa autenticação individual, quotas por plano/usuário, cobrança, trilha de auditoria resistente a adulteração, consentimento para envio de dados clínicos, métricas operacionais e monitoramento para SaaS comercial. Para lançamento público e escala, implementar esses itens, configurar proxy confiável e HTTPS, além de políticas de retenção/segurança.

## Documentos legais e limitações
`TERMOS_DE_USO.md`, `POLITICA_DE_PRIVACIDADE.md`, `CONTRATO_DE_LICENCA.md`. São **minutas**, precisam identificação legal do vendedor, contato, suporte, preços, condições de cancelamento e revisão jurídica. O aceite do navegador não substitui assinatura auditável exigida em alguns contratos.

## Teste / manutenção
`node testes/testes.js` executa verificações automáticas no motor, presença de interface e assinatura criptográfica da licença. Os cenários de navegador foram avaliados em larguras de 1440 e 390 pixels em ambiente automatizado com simulação do armazenamento e validação criptográfica da interface. A assinatura real foi conferida em Node.js; a prova criptográfica no navegador deve ser retestada em hospedagem HTTPS com ambiente suportado.

## Observação sobre propriedade intelectual
O copyright cobre o software e textos originais protegíveis; não garante registro de marca nem exclusividade do nome no INPI. Imagens de referência/mocapes promocionais não fazem parte da interface do cliente. O logotipo SVG próprio do produto foi aplicado à interface.
