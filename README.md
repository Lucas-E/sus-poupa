# Quanto o SUS te poupa?

Uma calculadora que estima quanto a sua casa gastaria com saúde em um ano se o SUS não existisse.

**Use agora:** https://rannyeribatista.github.io/sus-poupa/

Você responde umas doze perguntas simples, e ela mostra a conta: o que você usa de saúde, quanto isso custaria no particular e quanto custaria com um plano.

É uma página só, sem servidor e sem cadastro. As suas respostas não saem do seu aparelho.

Se você aceitar o aviso de cookies, a página carrega o Google Analytics para contar as visitas. Ele não recebe o que você respondeu.

> **É uma estimativa, não um dado oficial.** Os preços e as médias de uso que vêm preenchidos são aproximações do autor e ainda não foram conferidos com fontes públicas. Todos podem ser trocados na própria página, e correções são muito bem-vindas (veja [Como ajudar](#como-ajudar)).

## A ideia

Perguntar "quanto o SUS me poupa" é perguntar: **quanto eu pagaria pelo mesmo cuidado se ele não existisse?**

Só que "pagar por fora" pode significar duas coisas, e elas dão números diferentes:

1. **Pagar particular**, uma coisa de cada vez: cada consulta, cada exame, cada vacina.
2. **Ter um plano de saúde**: mensalidade todo mês, mais uma parte de cada uso, mais tudo aquilo que o plano não cobre.

Em um ano tranquilo, pagar particular costuma sair mais barato. Em um ano com parto ou cirurgia, o plano ganha de longe. Por isso a calculadora não escolhe um dos dois: ela mostra os dois e apresenta o resultado como uma faixa.

Os impostos ficam fora da conta de propósito. Você paga pelo SUS usando ou não, então eles não mudam a comparação.

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

No fim, o uso estimado aparece na tela e pode ser corrigido item por item.

### 2. Os preços

Cada item tem um preço-base (o valor "médio" do país) que é ajustado pelo lugar onde você mora:

- **Estado:** SP, RJ e DF usam o preço-base × 1,2. Sul, Sudeste (menos SP e RJ) e Centro-Oeste usam × 1,0. Norte e Nordeste usam × 0,85.
- **Interior:** fora da capital e da região metropolitana, mais × 0,9.

Os preços-base:

| Item | Preço-base | Com plano de saúde |
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

### 3. Os dois cenários

Para cada item, `valor = quantidade × preço` (remédio contínuo é multiplicado por 12 meses).

**Pagando particular**, o custo é a soma de todos os valores.

**Com plano de saúde**, cada item entra de um jeito:

- *coparticipação*: você paga 30% do valor;
- *coberto*: você paga zero;
- *plano não cobre*: você paga o valor inteiro, igual ao particular.

A isso se somam 12 mensalidades por pessoa da casa.

O terceiro grupo é o detalhe que mais passa despercebido: vacinas e remédios de uso contínuo vêm do SUS mesmo para quem tem plano. Num mundo sem SUS, quem tem plano pagaria por eles do bolso, então eles entram na conta dos dois lados.

### 4. O que você já pagou do bolso

As perguntas estimam **tudo** o que a casa usa, no SUS ou fora dele. Se você pagou parte disso no particular, essa parte o SUS não poupou. Por isso o valor que você digita é subtraído dos dois cenários:

```
poupado (particular) = custo particular − o que você já pagou
poupado (plano)      = custo com plano  − o que você já pagou
```

Nenhum dos dois resultados fica negativo. Se você pagou mais do que o custo estimado, o resultado é zero: quer dizer que a estimativa de uso ficou baixa para a sua casa, não que o SUS te custou alguma coisa.

O número grande no topo é a faixa entre esses dois resultados.

## O que a conta não considera

- **Qualidade e espera.** Uma consulta no SUS e uma particular não são o mesmo produto. A conta compara preço, não experiência.
- **Carências e reajustes** dos planos, e as diferenças entre tipos de plano.
- **Tratamentos de alto custo** (câncer, hemodiálise, transplante, remédios caros). Nesses casos o valor poupado é muito maior do que qualquer número que a calculadora mostra.
- **O que o SUS faz por todo mundo ao mesmo tempo:** vigilância sanitária, SAMU, campanhas de vacinação, controle de epidemias.

Ou seja: o resultado tende a ser um piso, não um teto.

## Como rodar

Baixe o `index.html` e abra no navegador. É só isso: não tem instalação, dependência nem etapa de build.

O código inteiro está nesse arquivo. As tabelas acima correspondem às constantes `ITEMS`, `PLAN`, `UFS` e `STEPS`, e os ajustes das respostas estão na função `estimateUsage`.

## Como ajudar

A ajuda mais valiosa é **trocar um chute por um dado**: se você conhece uma fonte pública para um preço ou para uma média de uso, abra uma issue ou um pull request com o link.

Bons pontos de partida seriam os dados de preços de planos da ANS, a tabela de preços máximos de medicamentos da CMED e pesquisas de uso de serviços de saúde como a PNS, do IBGE.

## Licença

[MIT](LICENSE). Use, copie e adapte à vontade.
