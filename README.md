# Write and Back PRO 3.1 — Biblioteca comercial ampliada

Copyright © 2026 Nailson Rodrigues de Lima. Todos os direitos reservados.

## Abrir sem instalar

Abra `index.html` no navegador; o motor local, o construtor de prompts, as lições, o histórico e a análise heurística funcionam sem depender da API. O arquivo `Write_and_Back_PRO_3_0.html` é o equivalente standalone. Alguns recursos exigem navegadores atuais e podem falhar em versões antigas.

## Usar IA generativa opcional

Requer Node.js >=20, `OPENAI_API_KEY` e `WRITEBACK_ACCESS_TOKEN` no servidor. Inicie com `node server.js`. Não coloque chave da API ou segredos no HTML público. Hospede atrás de HTTPS com política de acesso e observabilidade operacional. O modo IA somente foi implementado: não foi validado com credenciais de produção.

## Ativação PRO

O gerador de licenças assina digitalmente o token; a chave privada pertence **exclusivamente ao titular** e NUNCA pode integrar o ZIP público, o HTML, o servidor estático ou repositórios públicos. Chaves e emissão encontram-se no kit reservado do operador. A mesma chave pública de V3 é mantida para reconhecer licenças antigas, e a nova emissão identifica `WriteAndBack`.

## Compatibilidade

Projetos, decisões e registros anteriores continuam nas mesmas chaves `localStorage` do navegador, para evitar perda de dados na atualização **quando a origem e o perfil do navegador forem os mesmos**. Um usuário em outra origem/navegador deve importar histórico JSON exportado na versão anterior. Novo aceite será solicitado por alteração dos documentos e da identidade. Licenças anteriores assinadas com a mesma chave pública continuam aceitas pelo mecanismo de compatibilidade até o vencimento.

## Pendências para comercialização em escala

Preencher dados e contato do fornecedor; revisão jurídica de Termos/Contrato/Política; definir preço, suporte e modelo de licença; implantar identidade, cobrança e controle de acesso no backend se oferecer SaaS; executar testes de segurança, acessibilidade, compatibilidade e proteção de dados no ambiente final. O aceite do HTML é uma evidência local simples, não é assinatura digital qualificada de contrato. As notas QA são análises heurísticas, sem certificação externa.

## QA

Execute `npm test` (Node.js >=20). Os testes fornecidos verificam o conteúdo e a estrutura dos modelos e documentos, a referência da marca e a ausência do modelo de contrato; os fluxos de interface são testados separadamente em navegador. Testes em navegador local devem ser repetidos no ambiente de produção. Não há garantia de ausência de bugs ou de aprovação jurídica.

## Atualização 3.1 — modelos de prompts

A biblioteca inclui **14 modelos**. O exemplo anterior voltado a acompanhamento de contratos foi substituído por organização de tarefas. A atualização introduz cinco modelos: copy para Instagram, automação de atendimento WhatsApp, página de vendas, descrições de produtos para loja virtual e campanha ética de e-mail marketing. A área **Marketing e comunicação comercial** possui instruções específicas para criação e revisão.

**Importante:** o exemplo de WhatsApp é um gerador de instruções/especificações; não envia mensagens e não conecta a API sem implantação, credenciais autorizadas e testes. Os exemplos não coletam dados reais por padrão.

O `npm test` verifica invariantes do pacote e dos exemplos. Integração externa e auditoria jurídica permanecem pendentes da implantação final.
