# Write and Back PRO 4.0 — Edição Local (sem API paga)

**Copyright © 2026 Nailson Rodrigues de Lima. Todos os direitos reservados.**

## Modos de funcionamento

**Camada A: HTML standalone e totalmente local.** Abra `index.html` diretamente no navegador ou use o arquivo `Write_and_Back_PRO_4_0_Standalone.html`. Não exige instalação, internet, conta de IA ou servidor. Inclui geração de prompts com regras semânticas, análise de requisitos, detecção de alguns conflitos, score heurístico, biblioteca comercial com 14 modelos, tutoria por respostas locais, histórico, lições, exportação e minutas legais. **Essa camada não é um modelo de linguagem treinado** e não possui capacidade de gerar livremente respostas como uma IA neural.

**Camada B: IA generativa neural opcional no computador.** Requer instalação voluntária do [Ollama](https://ollama.com/), de um modelo gratuito compatível (por exemplo, `ollama pull llama3.2`, sujeito a disponibilidade e licença do modelo) e **Node.js 20+**. No Windows, execute `INICIAR_LOCAL.bat`; no Linux/macOS, `./INICIAR_LOCAL.sh`; abra `http://127.0.0.1:8787`. Escolha um modelo em **Inteligência local → Verificar modelos**. O programa se conecta *somente* à instância local de Ollama por padrão, sem API paga, sem Render e sem transmissão de prompts a fornecedor externo pelo aplicativo. O download e atualização do Ollama/modelos usam internet e podem consumir disco, RAM, processador e eletricidade; disponibilidade e desempenho dependem do dispositivo. Não há modelo neural incluído no ZIP.

### Passos para usar imediatamente

1. Extraia o ZIP para uma pasta local.
2. Clique duas vezes em `index.html`, em navegador atualizado, para gerar prompts offline e estudar pela Academia. Faça o aceite de licença/termos quando solicitado.
3. No Estúdio, escreva palavras ou uma ideia, escolha profundidade e clique em **Gerar prompt profissional**.
4. Veja **Diagnóstico**, **Inteligência local**, bibliotecas e lições. Revise resultados: as notas de qualidade são heurísticas, sem comprovação factual.
5. Para geração neural, siga o procedimento da Camada B. Se o modelo não estiver instalado, o aplicativo permanece operando na Camada A.

### Arquivos principais

- `index.html`: interface responsiva com motor local embutido.
- `local-ai-core.js`: motor local original disponibilizado separadamente para manutenção/testes.
- `local-bridge.js`: servidor loopback para conversar com Ollama, sem serviços pagos.
- `INICIAR_LOCAL.bat`, `INICIAR_LOCAL.sh`: iniciadores opcionais.
- `tests/`: testes automatizados do código e comportamento básico.
- `TERMOS_DE_USO.md`, `POLITICA_DE_PRIVACIDADE.md`, `CONTRATO_DE_LICENCA.md`: documentos-base comerciais, ainda dependentes de preenchimento e revisão jurídica.

### Limitações e segurança

- O modelo local pode alucinar, reproduzir vieses ou produzir orientações imprecisas. Exija revisão humana para usos críticos.
- A pontuação do diagnóstico mede apenas características do texto detectáveis por regras, **não** qualidade factual ou homologação.
- Nenhuma proteção local impede que usuários avançados alterem o HTML. A licença offline não é equivalente a DRM robusto nem a controle de conta.
- Histórico, aceite e outras preferências usam armazenamento do navegador. Faça backup manual antes de apagar dados ou trocar de dispositivo; `file://` e `localhost` possuem origens distintas.
- A ponte local escuta `127.0.0.1:8787` e não deve ser publicada na internet. Não a configure para escutar em `0.0.0.0`.
- Não envie ao modelo dados pessoais, sigilosos ou de clientes sem avaliação e autorização apropriadas; avalie também política de uso/licença dos pesos de terceiros.
- Navegadores desatualizados e Windows 7 não foram homologados. Node.js 20+ não deve ser presumido compatível com sistemas legados.
- **Não é possível afirmar custo total zero:** o software não requer API/assinatura de IA, mas pode envolver eletricidade, equipamento, banda para baixar o modelo e trabalho de suporte.
- A comercialização em escala demanda revisão jurídica, política de suporte, testes em equipamentos-alvo e validação da licença de cada modelo adicional.

### Testes

Execute `node --test tests/*.test.js` em Node.js 20+. Testes de interface com navegador e de integração real com Ollama devem ser repetidos no computador destino. A existência de testes aprovados não garante ausência de bugs.

### Privacidade e documentos

A Camada A não envia ideias para servidor externo por projeto. A Camada B envia as ideias apenas à instância local do Ollama em `127.0.0.1`. O programa não faz integrações externas automáticas como WhatsApp/Instagram; os modelos desses temas geram **instruções** e não mensagens reais. Termos, Contrato de Licença e Política de Privacidade são minutas que requerem identificação completa do fornecedor e revisão especializada antes da distribuição comercial pública.
