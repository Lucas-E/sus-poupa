# Fontes e método dos números

Cada número da calculadora, de onde ele vem e o quanto dá para confiar nele. A conta em si está explicada no [README](README.md).

**Solidez:** *forte* = dado oficial ou tabela de preços publicada · *média* = uma ou duas fontes, ou dado indireto · *fraca* = não existe pesquisa pública; o valor é estimativa, e a página avisa isso na própria linha.

Os números entre colchetes apontam para a lista de fontes no fim. Achou um erro ou conhece uma fonte melhor? Abra uma issue.

## Como conferimos

Cada número da coluna "O que as fontes dizem" foi lido duas vezes: uma na pesquisa e outra, depois, direto no documento de origem (o PDF, a planilha ou a página oficial), em 10 de novembro de 2026. O que não pôde ser relido na origem foi tirado da tabela.

Três tipos de número são conta nossa em cima do dado oficial, e não um número publicado:

- **Mensalidades de plano:** medianas calculadas a partir dos dados abertos da ANS. O programa que faz a conta está em [`dados/planos_ans.py`](dados/planos_ans.py) e qualquer pessoa pode rodar de novo.
- **Médias pagas pelos planos** (consulta, pronto-socorro, internação): despesa dividida pelo volume, as duas da mesma tabela [5].
- **Uso do SUS por habitante:** quantidade aprovada no DATASUS dividida pela população estimada pelo IBGE para 2024 (212.583.750). As médias de dias de internação foram recalculadas somando a tabela de procedimentos [18].

Os valores marcados como *fraca* não têm como ser conferidos, porque a fonte não existe. Eles são estimativa e a página diz isso.

## 1. Preços no particular

Um preço para o país inteiro. Não encontramos fonte para diferenças de preço do particular entre estados ou entre capital e interior, então a calculadora não ajusta por lugar. A pessoa pode trocar qualquer preço na própria linha.

| Item | Valor usado | O que as fontes dizem | Solidez |
|---|---|---|---|
| Consulta médica | R$ 200 | Não existe pesquisa nacional. Faixa encontrada: R$ 121 é a média que os planos pagam [5]; R$ 148–193 na tabela do plano do Senado [6]; R$ 252 em maternidade do Rio [9] | fraca |
| Pedido de exame de laboratório | R$ 90 | Pacote de 18 exames básicos por R$ 89,90 no interior de SP [7]; em BH, hemograma R$ 15–38, glicose R$ 7–21, colesterol R$ 15–62 [8] | média |
| Raio-x ou ultrassom | R$ 150 | Preço particular de raio-x não encontrado (plano paga R$ 54,50 [6]). Ultrassom particular: R$ 180–450 [9] | fraca |
| Tomografia ou ressonância | R$ 800 | Preço particular não encontrado. Plano paga R$ 452 (tomografia) e R$ 992 (ressonância) [6] | fraca |
| Ida ao pronto-socorro | R$ 400 | Preço particular não encontrado. Plano paga R$ 112–169 só pela consulta [5][6]; a conta do particular inclui exames, remédio e observação. É o preço menos sustentado da lista | fraca |
| Dose de vacina de criança | R$ 350 | Hexavalente R$ 354; meningocócica ACWY R$ 425; pneumocócica 20 R$ 560 [10] | forte |
| Dose de vacina de adulto ou idoso | R$ 85 | Gripe R$ 85 [10]; em BH, R$ 75–170 [8] | forte |
| Remédio de uso contínuo (mês) | R$ 25 | Genéricos comuns custam R$ 4–38 a caixa nas farmácias de SP [12]; teto oficial de R$ 19–24 para sinvastatina, losartana e metformina genéricas [11]. A Farmácia Popular dá de graça a maioria deles [13] | forte |
| Consulta no dentista | R$ 200 | Única referência: tabela dos conselhos de 2018, cerca de R$ 100 [14]. Nenhuma pesquisa atual | fraca |
| Dia de internação sem cirurgia | R$ 2.500 | Hospitais privados de ponta: R$ 7.043 de receita por paciente-dia, misturando enfermaria e UTI [15]. Planos pagam cerca de R$ 13.000 por internação inteira [5]. O valor usado é conservador | média |
| Cirurgia, já com a internação | R$ 15.000 | Pacotes só do hospital, em SP, 2023: hérnia R$ 5.070, vesícula R$ 8.760, apendicite R$ 9.200–15.460, sem os honorários médicos e já com as diárias [17] | média |
| Parto, com hospital e médicos | R$ 20.000 | Só o hospital: R$ 10.830–14.310, já com 2 diárias. Com obstetra, anestesista e pediatra: R$ 20.630 em Salvador [16] e cerca de R$ 25.000 no Rio [9]. Mesmo preço para normal e cesárea | forte |

Parto e cirurgia não somam dias de internação por fora: os pacotes publicados já incluem as diárias.

## 2. Plano de saúde

Valores de referência que os planos declaram à ANS, junho de 2026, plano individual com consulta, hospital e parto, mediana [1]. Não é o preço efetivamente pago: a ANS permite até 30% acima ou abaixo. O adulto é a média simples das medianas das oito faixas de 19 a 58 anos, que vão de R$ 445 a R$ 1.508 no país.

| Região | Criança (0–18) | Adulto (19–58) | Idoso (59+) |
|---|---|---|---|
| Norte | R$ 435 | R$ 890 | R$ 2.360 |
| Nordeste | R$ 415 | R$ 900 | R$ 2.310 |
| Centro-Oeste | R$ 475 | R$ 960 | R$ 2.490 |
| Sudeste | R$ 340 | R$ 720 | R$ 1.865 |
| Sul | R$ 385 | R$ 830 | R$ 2.175 |
| Brasil | R$ 370 | R$ 800 | R$ 2.080 |

| Regra | Valor usado | O que as fontes dizem | Solidez |
|---|---|---|---|
| Coparticipação | 30% | Não existe teto legal em vigor. 30% é a prática de mercado e o limite que a ANS propôs em 2024 e ainda não aprovou | média |
| Internação, cirurgia e parto | cobertos, sem coparticipação | Cobrar percentual em internação é proibido [4] | forte |
| Vacinas, remédios de uso em casa e dentista | fora do plano | Remédio para tratamento em casa é exclusão prevista em lei [3]; dentista é outro tipo de plano; vacina não é cobertura obrigatória | forte |

Para contexto: 53,1 milhões de pessoas têm plano médico, 24,9% da população (setembro de 2026) [2]. Carências máximas: 300 dias para parto, 180 dias para o resto, 24 meses para doença preexistente [3]. A calculadora não considera carências.

## 3. Uso médio por pessoa, por ano

| Item | Criança / adulto / idoso | O que as fontes dizem | Solidez |
|---|---|---|---|
| Consultas médicas | 4 / 2 / 5 | Cerca de 3 por habitante; 2,3 para quem só usa o SUS e 3,3 para quem tem plano [20]. 76% da população foi ao médico em 12 meses; 87% dos idosos [21]. Não há dado por idade: a divisão é estimativa | média |
| Pedidos de laboratório | 1 / 1 / 3 | O SUS faz 4,6 exames de laboratório por habitante [19], mas a unidade é o exame, não o pedido | fraca |
| Raio-x ou ultrassom | 0 / 0,5 / 1 | SUS: 0,35 raio-x e 0,13 ultrassom por habitante [19] | média |
| Idas ao pronto-socorro | 1 / 1 / 1 | SUS: cerca de 1,2 atendimento de urgência por habitante [19]; planos: 1,35 por beneficiário [5] | média |
| Doses de vacina de criança | 0,6 / 0 / 0 | Calendário oficial [22]: cerca de 6 doses e 4 vacinas de gripe dos 2 aos 18 anos | forte |
| Doses de vacina de adulto ou idoso | 0 / 0,1 / 3 | Calendário oficial [22]: adulto, um reforço a cada 10 anos; idoso, gripe e duas de covid por ano | forte |
| Remédios de uso contínuo | 0 / 0 / 2 | Usam remédio para doença crônica: 5% das crianças, 15% aos 30–39, 50% aos 50–59, 66–80% dos idosos [23]. Entre idosos, 31% nenhum, 17% um, 17% dois, 35% três ou mais [24]. O adulto entra pela pergunta da condição crônica | média |
| Dentista | 1 / 1 / 1 | 49% foram ao dentista em 12 meses; 34% dos idosos [21]. Entre adultos, 41% das últimas consultas foram no serviço público [30]. Só conta se a casa responde que vai ao dentista todo ano | média |

## 4. Ajustes pelas respostas

| Resposta | Efeito | O que as fontes dizem | Solidez |
|---|---|---|---|
| Bebê de até 2 anos | +4,5 consultas, +12 doses de vacina | Rotina oficial: 7 consultas no 1º ano e 2 no 2º [27]. De 22 a 28 doses antes dos 2 anos [22] | forte |
| Gravidez | +7 consultas, +1 ultrassom, +3 pedidos de laboratório | Mínimo de 7 consultas [26]; 1 ultrassom, não obrigatório; 3 rodadas de exames [25] | forte |
| O bebê nasceu | +1 parto | Os dias de hospital já estão no pacote do parto. No SUS: 2,1 dias no parto normal, 2,6 na cesárea [18] | forte |
| Internação sem cirurgia | +6 dias | SUS: 6,4 dias em média na internação clínica [18] | forte |
| Internação com cirurgia | +1 cirurgia | Os dias já estão no pacote. No SUS: 3,2 dias em média [18] | forte |
| Não vai ao médico sem estar doente | consultas × 0,6; exames × 0,5 | Nenhuma fonte. Estimativa | fraca |
| Condição crônica | consultas × 1,6; laboratório × 2; +2 remédios | Nenhuma fonte para os multiplicadores. Estimativa | fraca |
| Urgência mais de duas vezes | pronto-socorro × 2,5, mínimo 3 | Nenhuma fonte. Estimativa | fraca |
| Vacinas atrasadas | doses × 0,3 | Nenhuma fonte. Estimativa | fraca |
| Onde a casa cuidou da saúde | 100 / 75 / 50 / 25 / 0% pelo SUS | Não é dado: é só o primeiro palpite do extrato, que a pessoa corrige linha por linha | — |

## 5. Quanto custa o SUS

- Gasto público com saúde, somando União, estados e municípios: **R$ 1.879 por pessoa em 2022** [28]. Em 2020 foi R$ 1.901 e em 2021, R$ 2.027, tudo em reais de 2022.
- Total de 2023: R$ 454 bilhões, o maior da série [29]. Ainda não há total consolidado de 2024 ou 2025.
- A página mostra R$ 1.879 vezes o número de pessoas da casa, como um número à parte, dizendo que é a média do país e não o imposto que aquela casa pagou.

## 6. O que não aparece na conta

A página lista, sem valor, o que o SUS faz e não vira consulta nem exame: o SAMU 192, que cobre 88% da população [31]; a Farmácia Popular [13]; a vigilância sanitária; o controle de epidemias; os transplantes, dos quais o SUS financia cerca de 86% [32]; e os tratamentos de alto custo.

## Fontes

1. ANS, dados abertos do Painel de Precificação, junho de 2026. As medianas por faixa e região foram calculadas por nós a partir desses dados, com o programa `dados/planos_ans.py`. https://dadosabertos.ans.gov.br/FTP/PDA/painel_precificacao-031/
2. ANS, Dados Gerais do setor, setembro de 2026. https://www.gov.br/ans/pt-br/acesso-a-informacao/perfil-do-setor/dados-gerais
3. Lei 9.656/1998, artigos 10, 11 e 12. https://www.planalto.gov.br/ccivil_03/leis/l9656.htm
4. Resolução CONSU 8/1998, artigo 2º. https://www.legisweb.com.br/legislacao/?id=96457
5. IESS, "Saúde Suplementar em movimento", julho de 2026, sobre o Mapa Assistencial da ANS. As médias por evento são divisão nossa das despesas pelos volumes. https://www.iess.org.br/sites/default/files/2026-07/ES%20-%20Sau%CC%81de%20Suplementar%20em%20movimento%20evoluc%CC%A7a%CC%83o%20da%20produc%CC%A7a%CC%83o%20e%20das%20despesas%20assistenciais%20entre%202019%20e%202025.pdf
6. SIS/Senado, tabela de valores por procedimento, agosto de 2024. https://www12.senado.leg.br/institucional/sis/pdfs/tuss-medico-codigo-evento-e-valor.pdf
7. Unimed Amparo, exames particulares. https://www.unimed.coop.br/site/web/amparo/exames-particulares
8. Pesquisa Mercado Mineiro em Belo Horizonte, via Itatiaia, maio de 2025. https://www.itatiaia.com.br/brasil/sudeste/mg/precos-de-exames-laboratoriais-e-vacinas-podem-variar-mais-de-300-em-bh/
9. Perinatal (Rede D'Or), Rio, tabela de 2026. https://matwp.rededorsaoluiz.com.br/wp-content/uploads/2026/04/PROJETO-NASCER-Custos-hospitalares-Honorarios-Consultas-Gloria_2026.pdf
10. Unimed Porto Alegre, tabela de vacinas. https://www.unimed.coop.br/site/web/portoalegre/informacoes-de-vacinas?delta=40
11. CMED/Anvisa, lista de preços máximos ao consumidor, novembro de 2026. https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/cmed/precos
12. Procon-SP, pesquisa de preços de medicamentos, maio de 2026. https://www.procon.sp.gov.br/wp-content/uploads/2026/06/Relatmedicamentos2026NP.pdf
13. Ministério da Saúde, elenco da Farmácia Popular, agosto de 2026. https://www.gov.br/saude/pt-br/composicao/sectics/farmacia-popular/arquivos/elenco-de-medicamentos-e-insumos-pfpb.pdf
14. CBHPO, tabela de referência odontológica, 2018 (CRO-PR). https://www.cropr.org.br/uploads/arquivo/b11cb64addec1d3225b169135cb47bb9.pdf
15. Anahp, Balanço do Observatório, março de 2026. https://www.anahp.com.br/wp-content/uploads/2026/04/Balanco-Observatorio-9.pdf
16. Mater Dei Salvador, plano maternidade, janeiro de 2025. https://backend.materdei.com.br/wp-content/uploads/2025/01/PLANO-MATERNIDADE-Salvador-Janeiro2025.pdf
17. Hospital Edmundo Vasconcelos, tabela de preço particular, 2023. https://www.hospitaledmundovasconcelos.com.br/assets/doc/Tabela_Preco_Particular.pdf
18. DATASUS, SIH/SUS, procedimentos hospitalares, 2025. http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sih/cnv/qiuf.def
19. DATASUS, SIA/SUS, produção ambulatorial, 2024. As taxas por habitante são divisão nossa pela população estimada pelo IBGE. http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sia/cnv/qauf.def
20. Demografia Médica no Brasil 2023 (FMUSP/AMB). https://blog.hidoctor.com.br/fmfiles/index.asp/::hidoctor::/blog/2023/03/Demografia-Medica-2023-Brasil.pdf
21. IBGE, Pesquisa Nacional de Saúde 2019, volume de acesso e utilização. https://biblioteca.ibge.gov.br/visualizacao/livros/liv101748.pdf
22. Ministério da Saúde, Instrução Normativa do Calendário Nacional de Vacinação 2025. https://prefeitura.poa.br/sites/default/files/usu_doc/hotsites/sms/vigilancia-em-saude/instrucao-normativa-que-instrui-o-calendario-nacional-de-vacinacao-2025.pdf
23. PNAUM 2013–14, Bertoldi e outros, Revista de Saúde Pública, 2016. https://pmc.ncbi.nlm.nih.gov/articles/PMC5157907
24. PNAUM 2013–14, Ramos e outros, Revista de Saúde Pública, 2016. https://pmc.ncbi.nlm.nih.gov/articles/PMC5157903
25. Ministério da Saúde, Cadernos de Atenção Básica 32, pré-natal de baixo risco, 2012. https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf
26. Portaria GM/MS 5.350, de 12 de setembro de 2024 (Rede Alyne). https://acoesnacionais.iff.fiocruz.br/wp-content/uploads/bp-attachments/23250/PRT_GM_MS_5350_2024_diretrizes.pdf
27. Ministério da Saúde, Cadernos de Atenção Básica 33, saúde da criança, 2012. https://bvsms.saude.gov.br/bvs/publicacoes/saude_crianca_crescimento_desenvolvimento.pdf
28. IPEA, Texto para Discussão 3010 (Piola e Vieira, 2024). https://repositorio.ipea.gov.br/bitstream/11058/14118/1/TD_3010_Web.pdf
29. CONASS, "Financiamento do SUS", 2025. https://www.conass.org.br/biblioteca/wp-content/uploads/2025/06/02-Financiamento-do-Sistema-Unico-de-Saude.pdf
30. SB Brasil 2023, análise publicada em BMC Oral Health, 2026. https://link.springer.com/10.1186/s12903-026-09239-w
31. Ministério da Saúde, Relatório Anual de Gestão 2024 (cobertura do SAMU 192: 88,09% da população). https://bvsms.saude.gov.br/bvs/publicacoes/relatorio_anual_gestao_2024.pdf
32. Ministério da Saúde, via Agência Brasil, maio de 2026: o SUS financia cerca de 86% dos transplantes do país. https://www.jb.com.br/bem-viver/saude/2026/05/1059542-brasil-bate-recorde-de-transplantes-em-2025.html
