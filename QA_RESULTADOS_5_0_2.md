# QA — Write and Back PRO 5.0.2

**Data:** 23/10/2026. **Escopo:** correção de referência a projeto externo e numeração da versão, sem alterar o motor comercial/educacional.

## Verificações realizadas

- **19/19 testes automatizados Node.js aprovados**, incluindo núcleo semântico, biblioteca de 14 modelos, integridade básica da ponte local, validação de origem, marca da edição e sanitização da referência a projeto anterior.
- **Testes funcionais no navegador Chromium:** interface renderizada em 1365 × 900 e 390 × 844; fluxo de aceite local, geração pelo motor de precisão, geração pelo motor clássico, criação usando entrada com referência legada e tratamento de resposta simulada de IA neural.
- **Resultado:** prompts gerados nas duas modalidades sem a versão 4.0; textos gerados sem o nome indevido nos cenários executados; rodapé identificando 5.0.2; nenhum erro JavaScript de página registrado nos cenários testados.
- **Verificação estática:** HTML autônomo e `index.html` do ZIP com bytes idênticos; `package.json` coerente com versão 5.0.2; documentos e instruções incluídos.

## Limitações

- A interface foi testada em navegador automatizado com `localStorage` simulado em `about:blank`, pois a política do ambiente bloqueou abrir URLs externas, `file://` e localhost diretamente. Isso não prova compatibilidade em todos os dispositivos, navegadores ou ambientes de hospedagem.
- Integração real com Ollama, download de modelo, impressão física, licenças comerciais reais, persistência entre execuções e implantação em hospedagem remota não foram testados nesta rodada.
- Os documentos jurídicos são minutas que exigem revisão antes de disponibilização comercial pública.
- O modo local utiliza regras semânticas; não é um modelo generativo neural. O modo neural exige Ollama e equipamento compatível.
- O histórico não foi apagado ou reescrito no armazenamento do usuário. O aplicativo limpa apenas a apresentação de títulos legados ao gerar/abrir/exportar, preservando dados antigos.
