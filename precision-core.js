'use strict';

/* Write and Back PRO 5.0.2 — motor de precisão, determinístico e auditável.
   Não é modelo neural, não consulta serviços externos, não aprende com dados do usuário.
   Copyright (c) 2026 Nailson Rodrigues de Lima. */
(function(root,factory){
  const api=factory(root&&root.WriteBackLocal);
  if(typeof module==='object'&&module.exports) module.exports=api;
  if(root) root.WBPrecision=api;
})(typeof window!=='undefined'?window:null,function(base){
'use strict';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const clean=s=>String(s||'').trim().replace(/[ \t]{2,}/g,' ').slice(0,2500);
const words=s=>normalize(s).match(/[a-z0-9][a-z0-9_-]{2,}/g)||[];
const STOP=new Set('para como seja fazer criar quero precisa gostaria estou pode numa nisso sobre seus uma esse essa desses isso este pela que dos das com sem entre sera sejam por mais muito tudo tambem deve podem quero preciso conteudo projeto sistema aplicativo ainda qual quando dessa desse isso tipo realizar utilizar usar algo dentro fora onde cada ate pelo tendo nao porque seria esta estes isto sobre agora fazer tenha objetivo'.split(' '));
const patterns=[
 {key:'instagram',domain:'marketing',label:'Copy para Instagram',re:/\b(instagram|reels|carrossel|legenda|stories)\b/,objective:'Produzir conteúdo original e verificável para Instagram',deliver:'Legendas com ganchos, mensagem principal e CTA proporcionais',questions:['Qual produto ou assunto será divulgado?','Qual público e objetivo da postagem?','Quais características comprovadas e tom da marca?'],actions:['Definir objetivo do post e público; não presumir produto ou promessa','Criar 3 versões de legenda: informativa, educativa e convite à ação','Fornecer CTA claro, até 5 hashtags pertinentes e sugestão de texto alternativo','Revisar alegações publicitárias, privacidade e direitos autorais'],tests:['Cada variante descreve somente atributos informados','Não contém depoimentos ou descontos fictícios','CTA corresponde ao objetivo indicado']},
 {key:'whatsapp',domain:'software',label:'Atendimento WhatsApp',re:/\b(whatsapp|atendimento automatico|chatbot)\b/,objective:'Estruturar um atendimento organizado e responsável',deliver:'Fluxos de triagem, mensagens-modelo e requisitos de integração',questions:['Quais dúvidas recorrentes, horários e serviços devem ser atendidos?','Haverá atendente humano de retaguarda?','Existem conta empresarial e integração oficial disponíveis?'],actions:['Mapear intenções, mensagens de entrada, saídas e exceções','Definir boas-vindas, FAQ, horários, transferência humana e opt-out','Separar protótipo de respostas de automação real, que exige integração autorizada','Implementar controles de privacidade, retenção e incidentes, se houver dados de clientes'],tests:['Fluxos de dúvidas não ficam presos em loop','Existe saída para atendente ou encerramento','Nenhuma mensagem real é considerada enviada apenas pela geração do prompt']},
 {key:'education',domain:'educacao',label:'Material de aprendizagem',re:/\b(ensinar|ensino|educacao|aluno|estudante|fra[cç][aã]o|matematica|portugues|aula|professor|tutor|curso)\b/,objective:'Organizar uma experiência de aprendizagem verificável',deliver:'Sequência didática, atividades, devolutivas e critérios de avaliação',questions:['Qual série, idade ou nível de conhecimento?','Qual habilidade observável precisa ser aprendida?','Qual acessibilidade ou adaptação é necessária?'],actions:['Definir pré-requisitos e objetivos claros de aprendizagem','Apresentar explicação breve, exemplo resolvido, prática guiada e desafio autônomo','Gerar feedback que explica erros sem humilhar ou diagnosticar estudantes','Verificar compreensão com avaliação formativa e progressão gradual'],tests:['Exemplos corretos e adequados à faixa etária','Exercícios variam sem repetição indevida','Feedback explica por que uma alternativa está incorreta']},
 {key:'game',domain:'jogos',label:'Jogo interativo',re:/\b(jogo|game|labirinto|pontuacao|fases|personagens|corrida|quiz)\b/,objective:'Criar jogo coerente, acessível e divertido',deliver:'Mecânicas, regras, controles, progressão e cenários de teste',questions:['Qual público e dispositivo principal?','Qual objetivo e condição de vitória?','Há exigência de funcionar offline?'],actions:['Descrever jogabilidade central e ciclo de interação','Definir controles para teclado e toque quando aplicável','Projetar dificuldade progressiva e retorno visual após ações','Prever pausa, retomada, reinício, estados vazios e acessibilidade'],tests:['Controles respondem nos dispositivos-alvo','Condições de vitória e derrota são verificáveis','Não há dependência de ativos de terceiros sem licença']},
 {key:'software',domain:'software',label:'Sistema ou aplicativo',re:/\b(sistema|aplicativo|app|site|software|web|plataforma|codigo|programa|login|banco de dados|ocr|automacao)\b/,objective:'Especificar solução digital utilizável e testável',deliver:'Fluxos, interfaces, requisitos, arquitetura e testes',questions:['Quais são os três fluxos essenciais?','Em quais dispositivos e navegadores deve funcionar?','Haverá dados pessoais, integração externa ou autenticação?'],actions:['Mapear atores, entradas, saídas e casos de uso prioritários','Definir interface responsiva e navegável por teclado, com erros explicados','Planejar arquitetura proporcional às dependências reais disponíveis','Construir primeiro um fluxo funcional mínimo antes de ampliar recursos','Prever validação de entrada, backup/exportação e falhas de rede se aplicável'],tests:['Ações principais alteram dados ou interface como anunciado','Fluxos funcionam com entrada vazia, inválida e limites','Teste em mobile e desktop é registrado com evidências']},
 {key:'marketing',domain:'marketing',label:'Comunicação comercial',re:/\b(copy|marketing|vendas|anuncio|divulgacao|campanha|e-commerce|email|e-mail|produto|loja virtual)\b/,objective:'Criar comunicação persuasiva e responsável',deliver:'Texto de campanha e versões adaptadas ao canal',questions:['Qual produto, serviço ou mensagem?','Qual público, canal e tom da marca?','Quais benefícios podem ser comprovados?'],actions:['Organizar proposta de valor a partir dos atributos fornecidos','Produzir título, mensagem principal, benefícios demonstráveis e CTA','Criar alternativas de tom sem inventar descontos ou números','Verificar consentimento, direitos e políticas de cada canal'],tests:['Não há promessas sem prova','A chamada para ação é compreensível e proporcional','O material corresponde ao canal escolhido']},
 {key:'research',domain:'pesquisa',label:'Pesquisa e análise',re:/\b(pesquisa|estudo|dados|metodologia|relatorio|investigar|analise)\b/,objective:'Produzir análise verificável e transparente',deliver:'Pergunta de pesquisa, método, achados e limitações',questions:['Que pergunta precisa ser respondida?','Quais fontes e dados estão realmente disponíveis?','Qual período ou recorte interessa?'],actions:['Definir pergunta e variáveis observáveis','Separar fatos, inferências, hipóteses e recomendações','Exigir verificação de fontes antes de alegar números ou conclusões','Apresentar limitações e possíveis vieses'],tests:['Toda afirmação factual importante tem fonte identificável','Nenhum dado ou referência foi inventado','Hipóteses aparecem rotuladas como hipóteses']},
 {key:'general',domain:'geral',label:'Projeto profissional',re:/.*/,objective:'Transformar a ideia em trabalho verificável',deliver:'Plano objetivo com passos, entregáveis e validação',questions:['Qual resultado final concreto?','Quem utilizará o resultado?','Como verificar que ele funciona?'],actions:['Traduzir a ideia em objetivo, público e entrega','Distinguir exigência explícita de sugestão','Priorizar três ações executáveis com critérios de aceite','Declarar limitações e dependências reais'],tests:['Resultado responde à ideia original','Todos os itens pendentes estão identificados','Há forma concreta de verificar a entrega']}
];
function infer(source,form){
 const s=clean(source);const n=normalize(s);let detected=patterns.find(p=>p.key!=='general'&&p.re.test(n))||patterns[patterns.length-1];
 if(/\b(jogo|game|labirinto|quiz)\b/.test(n)) detected=patterns.find(p=>p.key==='game');
 if(detected.key==='whatsapp'&&/\b(copy|texto publicitario|legenda|mensagem comercial)\b/.test(n)&&!/\b(automatizar|automacao|chatbot|atendimento automatico|integracao)\b/.test(n))detected=patterns.find(p=>p.key==='marketing');
 const byChoice={educacao:'education',jogos:'game',software:'software',marketing:'marketing',pesquisa:'research'};
 // Categoria manual tem precedência sobre inferência, exceto quando o objetivo envolve WhatsApp/Instagram.
 const manual=byChoice[form&&form.category];
 const domain=manual&&detected.key!=='whatsapp'&&detected.key!=='instagram'?(patterns.find(p=>p.key===manual)||detected):detected;
 const tokens=Array.from(new Set(words(s).filter(w=>!STOP.has(w)&&w.length>=4))).slice(0,12);
 const markers=[];
 const flag=(id,re)=>{if(re.test(n))markers.push(id);};
 flag('offline',/\b(offline|sem internet|sem conexao|localmente)\b/);
 flag('online',/\b(online|nuvem|via internet|api externa)\b/);
 flag('gratuito',/\b(gratuito|sem custos|custo zero|sem assinatura|sem api paga|sem pagar)\b/);
 flag('autenticacao',/\b(login|senha|cadastro|autenticacao)\b/);
 flag('sem-autenticacao',/\b(sem login|sem senha|sem cadastro)\b/);
 flag('responsivo',/\b(responsiv|mobile|celular|android|iphone|tablet)\w*/);
 flag('privacidade',/\b(lgpd|privacidade|dados pessoais|dados sensiveis)\b/);
 flag('tempo-real',/\b(tempo real|ao vivo|instantaneo)\b/);
 const conflicts=[];
 if(markers.includes('offline')&&markers.includes('online'))conflicts.push('Offline e online: especificar quais funções dependem de conectividade, sem declarar incompatibilidade absoluta.');
 if(markers.includes('sem-autenticacao')&&/\b(com login|login e senha|cadastro obrigatorio)\b/.test(n))conflicts.push('Acesso com e sem login: separar os fluxos e definir permissões.');
 if(markers.includes('offline')&&/\b(whatsapp|instagram|envio de mensagens|servico externo)\b/.test(n)&&/\b(enviar|integra\w*|automatiz\w*|sincronizar|atendimento)\b/.test(n))conflicts.push('Integrações externas exigem conectividade; um protótipo offline não equivale a mensagens enviadas.');
 if(markers.includes('gratuito')&&/\b(api paga|servico pago|assinatura obrigatoria)\b/.test(n))conflicts.push('Custo zero e serviço pago foram mencionados juntos; separar alternativas e dependências.');
 if(/\b(100% perfeito|zero erros|sem bugs|infalivel|precisao total)\b/.test(n))conflicts.push('Promessas absolutas não são verificáveis; estabelecer testes e tolerâncias realistas.');
 const audience=clean(form&&form.audience)||((n.match(/\b(criancas|alunos|estudantes|professores|clientes|adultos|idosos|profissionais|pequenas empresas|equipes)\b/)||[])[0]||'');
 const platform=({web:'Web responsivo',offline:'Local sem internet',hibrido:'Híbrido',institucional:'Rede privada',indefinido:''})[form&&form.platform]||'';
 const doubts=domain.questions.filter(q=>{const v=normalize(q);if(v.startsWith('qual publico')&&audience)return false;return true;});
 if(!audience)doubts.unshift('Quem utilizará o resultado e com qual conhecimento prévio?');
 const success=clean(form&&form.successMetric);
 const longEnough=words(s).length>=12;
 const rubric=[
  {name:'Objetivo expresso',points:25,met:/\b(criar|desenvolver|ensinar|gerar|produzir|planejar|melhorar|automatizar|analisar|fazer|preciso|quero|montar|construir)\b/.test(n)},
  {name:'Contexto concreto',points:20,met:longEnough},
  {name:'Público identificado',points:15,met:!!audience},
  {name:'Restrições declaradas',points:15,met:markers.length>0||!!clean(form&&form.limitations)},
  {name:'Aceite verificável',points:15,met:!!success||/\b(criterio|teste|qa|validacao|medir|verificar)\b/.test(n)},
  {name:'Formato definido',points:10,met:!!(form&&form.format)||/\b(html|pdf|pagina|app|aula|relatorio|jogo|texto|roteiro)\b/.test(n)}
 ];
 const score=rubric.reduce((a,b)=>a+(b.met?b.points:0),0);
 return {source:s,domain,label:domain.label,tokens,markers,conflicts,audience,platform,success,doubts,score,rubric};
}
function modeText(x){return ['direto','equilibrado','profundo'].includes(x)?x:'equilibrado';}
function draft(input,form,mode){const a=infer(input,form||{});const depth=modeText(mode);const sections=[];const push=(s)=>sections.push(s);
 if(!a.source)return '';
 push('# WRITE AND BACK — PROMPT '+({direto:'DIRETO',equilibrado:'PROFISSIONAL',profundo:'APROFUNDADO'}[depth]));
 push('**Objetivo:** '+a.domain.objective+'.');
 push('**Solicitação original (não substituir):** '+JSON.stringify(a.source));
 push('**Papel:** Atue como especialista em '+a.label.toLowerCase()+', com rigor, comunicação clara e foco na execução verificável.');
 push('**Entrega esperada:** '+a.domain.deliver+'.');
 if(a.audience)push('**Público informado:** '+a.audience+'.');
 else push('**Público:** não especificado; não presumir características ou necessidades individuais.');
 if(a.platform)push('**Ambiente declarado:** '+a.platform+'.');
 if(form&&clean(form.limitations))push('**Restrições adicionais informadas:** '+clean(form.limitations)+'.');
 if(a.markers.length)push('**Condições textualmente identificadas (a confirmar):** '+a.markers.join(', ')+'.');
 push('\n## Execute nesta ordem');
 const max=depth==='direto'?3:depth==='equilibrado'?4:a.domain.actions.length;
 a.domain.actions.slice(0,max).forEach((step,i)=>push((i+1)+'. '+step+'.'));
 if(depth!=='direto'){
 push('\n## Forma da resposta');
 push('Comece pela solução ou entrega principal, sem introduções extensas. Descreva etapas concretas, a saída esperada e como utilizar cada resultado. Use tabelas ou listas somente se facilitarem a leitura.');
 push('Diferencie: **informado pelo solicitante**, **inferido**, **sugestão opcional** e **pendente de validação**. Não crie números, fontes, integrações, código testado ou funcionalidades que não foram verificadas.');
 }
 if(a.conflicts.length){push('\n## Contradições ou dependências');a.conflicts.forEach((c,i)=>push((i+1)+'. '+c));}
 if(depth==='profundo'){
 push('\n## Refinamento especializado');
 push('Para cada componente: defina entrada, processamento, saída, estado de erro, requisito mínimo e responsável a confirmar. Avalie experiência do usuário, acessibilidade, privacidade, desempenho e manutenção conforme a tarefa.');
 push('Proponha alternativas tecnicamente distintas apenas quando houver diferença relevante. Justifique escolhas sem atribuir resultados não observados.');
 }
 push('\n## Verificação antes da entrega');
 a.domain.tests.slice(0,depth==='direto'?2:3).forEach(x=>push('- '+x+'.'));
 if(a.success)push('- Critério definido pelo solicitante: '+a.success+'.');
 push('- Compare o resultado com a ideia original, evite acréscimos não autorizados e identifique testes efetivamente realizados ou pendentes.');
 if(depth!=='direto'){
 push('\n## Dados a confirmar (não bloquear a parte viável)');
 a.doubts.slice(0,depth==='profundo'?4:2).forEach(q=>push('- '+q));
 }
 push('\n**Regra final:** entregue a parte útil agora, com objetividade. Declare limitações reais e não confunda proposta, simulação ou texto com implementação funcional.');
 return sections.join('\n');
}
function advise(input,form){const a=infer(input,form||{});if(!a.source)return 'Descreva uma ideia no Estúdio para receber orientações práticas.';
 const lines=['DIAGNÓSTICO OBJETIVO • '+a.label,'','O QUE FAZER: '+a.domain.objective+'.','ENTREGA RECOMENDADA: '+a.domain.deliver+'.'];
 lines.push('','PRÓXIMAS AÇÕES:');a.domain.actions.slice(0,3).forEach((s,i)=>lines.push((i+1)+'. '+s+'.'));
 if(a.conflicts.length){lines.push('','ALERTAS:');a.conflicts.forEach(s=>lines.push('• '+s));}
 lines.push('','VALIDAÇÃO: '+a.domain.tests[0]+'.');
 lines.push('INFORMAÇÃO QUE MAIS AJUDA: '+a.doubts[0]);
 lines.push('','Leitura por regras offline; recomendações e classificações devem ser revisadas pelo usuário.');
 return lines.join('\n');
}
function audit(input,output,form){const a=infer(input,form||{});const t=normalize(output);const terms=a.tokens.filter(w=>!STOP.has(w)&&w.length>3);
 const covered=terms.filter(w=>t.includes(w));const misses=terms.filter(w=>!t.includes(w));
 const checks=[
  {name:'Solicitação original preservada',met:!!a.source&&output.includes(a.source),weight:25},
  {name:'Objetivo da tarefa',met:/objetivo|missao|execute nesta ordem/.test(t),weight:15},
  {name:'Ações concretas',met:/(?:\b[123]\.\s|\bpasso\b|\betapa\b)/.test(t),weight:15},
  {name:'Verificação e QA',met:/verificac|validac|teste|criterio/.test(t),weight:15},
  {name:'Limitações explicitadas',met:/limitac|nao confunda|pendente|nao criar|sem inventar|nao foram verificad/.test(t),weight:10},
  {name:'Temas da ideia contemplados',met:terms.length?covered.length/terms.length>=.6:true,weight:20}
 ];
 const score=checks.reduce((x,c)=>x+(c.met?c.weight:0),0);
 const warnings=[];
 if(misses.length)warnings.push('Termos da ideia com correspondência literal ausente: '+misses.slice(0,6).join(', ')+'. Verifique sinônimos e contexto; isso não comprova erro.');
 if(a.conflicts.length)warnings.push(...a.conflicts);
 if(a.score<50)warnings.push('Entrada pouco definida: o texto gerado deve manter pendências explícitas, sem completar com suposições.');
 if(/\b(100% garantido|validado em producao|testes concluidos|sem qualquer falha)\b/.test(t))warnings.push('Há expressão de garantia ou teste concluído; confirme evidências antes de utilizar.');
 return {sourceQuality:a.score,outputCoverage:score,checks,misses,warnings,conflicts:a.conflicts,disclaimer:'Indicadores de completude textual, não provas de exatidão factual ou funcionamento real.'};
}
function tutor(question,input,form){const q=normalize(question);const a=infer(input,form||{});
 if(/\b(como|melhorar|refinar|otimizar|fortalecer|deixar)\b/.test(q))return 'Para tornar o prompt mais eficaz em '+a.label+': (1) especifique um resultado observável, (2) dê um exemplo de uso, (3) declare restrições, (4) exija evidências de teste. Próxima pergunta útil: '+a.doubts[0];
 if(/\b(qa|qualidade|teste|validar|revisar)\b/.test(q))return 'Revisão sugerida: '+a.domain.tests.join('; ')+'. Compare sempre com a solicitação original. A pontuação do sistema é heurística, não uma certificação.';
 if(/\b(porque|por que|objetiv|resum|direto|curto)\b/.test(q))return 'Use o modo Direto: começa pela finalidade, limita-se a três ações e dois testes pertinentes. Aprofunde apenas quando houver decisões relevantes ou riscos.';
 if(/\b(offline|custo|ia local|ollama|modelo neural)\b/.test(q))return 'O motor de precisão funciona offline, sem cobrar por tokens. É baseado em regras e não é um modelo neural. Para geração neural livre, instale opcionalmente Ollama com um modelo local; isso usa recursos do computador.';
 return advise(input,form).split('\n').slice(0,8).join('\n');
}
return {version:'5.0.2',infer,draft,advise,audit,tutor};
});


