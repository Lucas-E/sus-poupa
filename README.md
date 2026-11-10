# Quanto o SUS te poupa?

Uma calculadora que estima quanto a sua casa gastaria com saúde em um ano se o SUS não existisse.

**Use agora:** https://rannyeribatista.github.io/sus-poupa/

Você responde umas quinze perguntas simples, e ela monta o extrato de saúde da sua casa no ano: cada tipo de cuidado em uma linha, com quem pagou por ele. O SUS, o plano ou você.

É uma página só, sem servidor e sem cadastro. As suas respostas não saem do seu aparelho.

Se você aceitar o aviso de cookies, a página carrega o Google Analytics para contar as visitas. Ele não recebe o que você respondeu.

> **É uma estimativa, não um dado oficial.** Os preços e as médias de uso que vêm preenchidos são aproximações do autor e ainda não foram conferidos com fontes públicas. Todos podem ser trocados na própria página, e correções são muito bem-vindas (veja [Como ajudar](#como-ajudar)).

## A ideia

Perguntar "quanto o SUS me poupa" é perguntar: **quanto eu pagaria pelo cuidado que recebi do SUS se ele não existisse?**

A resposta só vale para o que veio de fato do SUS. Por isso o resultado é um extrato, com uma linha por tipo de cuidado e três pagadores possíveis em cada uma:

1. **O SUS pagou:** o que a casa recebeu do SUS. É o número principal da página.
2. **O plano pagou:** o que o plano de saúde cobriu.
3. **A casa pagou:** o que saiu do bolso, no particular.

Os três são medidos a preço de particular, para falarem a mesma língua, e nunca são subtraídos um do outro. Juntos, formam o valor do cuidado com a saúde da casa no ano, e uma barra mostra a parte de cada um.

Três casas, para ver a diferença:

- Quem só usa o SUS e não pagou nada por fora vê todas as linhas no SUS.
- Quem tem plano e resolve quase tudo por ele vê no SUS só o que veio de lá (as vacinas, por exemplo), e o resto no plano.
- Quem mora fora do país e não usou o SUS vê zero no SUS, seja qual for o valor que pagou.

A calculadora preenche o extrato a partir das perguntas, e a pessoa corrige: um toque em SUS, Plano ou Paguei manda a linha inteira para aquele pagador, e as quantidades podem ser divididas (oito consultas, cinco pelo SUS e três pagas). Cada linha tem um total fixo: marcar três consultas como pagas tira três do SUS, e a soma continua a mesma. O total e o preço de cada linha também podem ser trocados ali mesmo.

Abaixo do extrato, a página lista o que o SUS faz e que não vira consulta nem exame: SAMU, vigilância sanitária, controle de epidemias, transplantes, tratamentos de alto custo. Isso não tem preço na conta e não entra em nenhum número.

Os impostos que financiam o SUS ainda não aparecem na página. Eles vão entrar como um terceiro número, separado, quando o valor por pessoa estiver conferido com fonte pública.

## Como a conta é feita

### 1. Das perguntas ao uso estimado

Ninguém lembra quantas consultas a casa fez no ano. Então, em vez de perguntar isso, a calculadora parte de uma média por pessoa e ajusta com perguntas fáceis de responder.

A média de partida, por pessoa, por ano:

| | Criança (0–18) | Adulto (19–58) | Idoso (59+) |
|---|---|---|---|
| Consultas médicas | 4 | 2 | 5 |
| Pedidos de exame de laboratório | 1 | 1 | 3 |
| Raio-x ou ultrassom | 0 | 0,5 | 1 |
| Idas ao pronto-socorro ou UPA | 1 | 0,5 | 1 |
| Doses de vacina | 2 | 1 | 2 |
| Remédios de uso contínuo | 0 | 0 | 2 |
| Consultas no dentista | 1 | 1 | 1 |

Depois, cada resposta empurra essa média para cima ou para baixo:

| Resposta | Efeito no uso da casa |
|---|---|
| Ninguém vai ao médico sem estar doente | consultas × 0,6; laboratório e raio-x/ultrassom × 0,5 |
| Alguém tem condição crônica | consultas × 1,6; laboratório × 2; +2 remédios contínuos |
| Tem bebê de até 2 anos | +6 consultas; +8 doses de vacina |
| Urgência mais de duas vezes no ano | idas ao pronto-socorro × 2,5 (no mínimo 3) |
| Gravidez no último ano | +8 consultas; +4 ultrassons; +3 pedidos de laboratório |
| …e o bebê já nasceu | +1 parto; +2 dias de internação |
| Internação sem cirurgia | +3 dias de internação |
| Internação com cirurgia | +3 dias de internação; +1 cirurgia |
| Fez tomografia ou ressonância | +1 exame |
| Vacinas atrasadas | doses de vacina × 0,3 |
| Não vai ao dentista todo ano | consultas no dentista = 0 |

Os eventos raros e caros (parto, internação, cirurgia, tomografia) são perguntados diretamente, porque nenhuma média consegue adivinhá-los, e um só deles pesa mais do que todo o resto junto.

### 2. Do uso da casa a quem pagou

Duas perguntas dão o primeiro palpite de quem pagou cada linha: se alguém da casa tem plano de saúde, e onde a casa cuidou da saúde no último ano. É só um ponto de partida. O que vale é o que a pessoa marca no extrato.

| Onde a casa cuidou da saúde | Parte do uso do dia a dia contada como SUS |
|---|---|
| Só no SUS | 100% |
| Mais no SUS | 75% |
| Meio a meio | 50% |
| Mais no plano ou no particular | 25% |
| Não usamos o SUS | 0% |

Essa parte vale para consultas, exames, pronto-socorro, remédios e dentista. Duas coisas fogem da regra:

- **Vacinas** contam inteiras como SUS para todo mundo, menos para quem não usou o SUS. Quem tem plano também se vacina no posto.
- **Eventos caros** (parto, internação, cirurgia, tomografia) nunca são divididos. Quando a casa misturou SUS com plano ou particular, a calculadora pergunta de cada um: "foi pelo SUS?". Se não foi, a linha vai inteira para o plano ou para o bolso.

O que não veio do SUS vai para o plano, se a casa tem um e ele cobre aquilo, ou para o bolso. Vacina, remédio de uso contínuo e dentista nunca vão para o plano, porque ele não cobre.

As quantidades aceitam uma casa decimal: 0,5 ida ao pronto-socorro quer dizer uma ida a cada dois anos.

### 3. Os preços

Cada item tem um preço-base (o valor "médio" do país) que é ajustado pelo lugar onde você mora:

- **Estado:** SP, RJ e DF usam o preço-base × 1,2. Sul, Sudeste (menos SP e RJ) e Centro-Oeste usam × 1,0. Norte e Nordeste usam × 0,85.
- **Interior:** fora da capital e da região metropolitana, mais × 0,9.

Os preços-base:

| Item | Preço-base | Num plano de saúde |
|---|---|---|
| Consulta médica | R$ 200 | coparticipação |
| Pedido de exame de laboratório | R$ 150 | coparticipação |
| Raio-x ou ultrassom | R$ 150 | coparticipação |
| Tomografia ou ressonância | R$ 800 | coparticipação |
| Ida ao pronto-socorro | R$ 400 | coparticipação |
| Dose de vacina | R$ 250 | plano não cobre |
| Remédio de uso contínuo (por mês) | R$ 60 | plano não cobre |
| Consulta no dentista | R$ 200 | plano não cobre |
| Dia de internação | R$ 2.500 | coberto |
| Cirurgia | R$ 15.000 | coberto |
| Parto | R$ 12.000 | coberto |

Mensalidade-base do plano: R$ 250 por criança, R$ 550 por adulto e R$ 1.400 por idoso. Coparticipação: 30%.

### 4. Os três montes

Para cada linha e cada pagador, `valor = quantidade × preço` (remédio contínuo é multiplicado por 12 meses).

```
o SUS pagou   = soma das quantidades marcadas como SUS × preço
o plano pagou = soma das quantidades marcadas como plano × preço
a casa pagou  = soma das quantidades marcadas como pagas × preço
```

O que saiu do bolso da casa é uma pergunta à parte: o que ela pagou no particular mais a mensalidade do plano, se tiver. A mensalidade não entra na barra, porque ela é o preço do que o plano cobriu, não um cuidado a mais.

### 5. A comparação com um plano de saúde

Para a casa em que ninguém tem plano, a página mostra mais uma linha: quanto o que veio do SUS custaria com um plano para todos. Cada item entra de um jeito:

- *coparticipação*: 30% do valor;
- *coberto*: zero;
- *plano não cobre*: o valor inteiro, igual ao particular.

A isso se somam 12 mensalidades por pessoa. Essa linha responde a outra pergunta (quanto custa estar coberto, usando ou não), então ela fica separada e não entra no número principal.

## O que a conta não considera

- **O preço de um país sem SUS.** A conta usa os preços de hoje do particular. Sem o SUS, com muito mais gente procurando o particular, esses preços seriam outros, e ninguém sabe dizer quais.
- **A proteção de quem não usou.** Quem passou o ano sem precisar do SUS vê zero, mas estava coberto se precisasse. Esse valor existe e não está no número.
- **Qualidade e espera.** Uma consulta no SUS e uma particular não são o mesmo produto. A conta compara preço, não experiência.
- **Carências e reajustes** dos planos, e as diferenças entre tipos de plano.
- **Tratamentos de alto custo** (câncer, hemodiálise, transplante, remédios caros). Nesses casos o valor poupado é muito maior do que qualquer número que a calculadora mostra.
- **O que o SUS faz por todo mundo ao mesmo tempo:** vigilância sanitária, SAMU, campanhas de vacinação, controle de epidemias.

Os dois últimos itens puxam o número para baixo; o primeiro pode puxar para qualquer lado.

## Como rodar

Baixe o `index.html` e abra no navegador. É só isso: não tem instalação, dependência nem etapa de build.

O código inteiro está nesse arquivo. As tabelas acima correspondem às constantes `ITEMS`, `PLAN`, `UFS`, `STEPS` e `SHARE`, e os ajustes das respostas estão na função `estimateUsage`.

## Como ajudar

A ajuda mais valiosa é **trocar um chute por um dado**: se você conhece uma fonte pública para um preço ou para uma média de uso, abra uma issue ou um pull request com o link.

Bons pontos de partida seriam os dados de preços de planos da ANS, a tabela de preços máximos de medicamentos da CMED e pesquisas de uso de serviços de saúde como a PNS, do IBGE.

## Licença

[MIT](LICENSE). Use, copie e adapte à vontade.
