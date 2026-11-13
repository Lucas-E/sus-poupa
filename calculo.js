// A conta inteira da calculadora, num arquivo só.
//
// A página (index.html) carrega este arquivo, e ele também roda no terminal:
//
//   node calculo.js respostas.json   mostra o extrato de uma casa
//   node conferir.js                 refaz as casas de exemplo e compara com o resultado esperado
//
// Cada número aqui tem a sua fonte em FONTES.md. O método está explicado no README.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Calculo = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // plan: 'copay' = plano cobre com coparticipação · 'full' = plano cobre tudo · 'none' = plano não cobre
  // per: uso médio por ano para cada criança (c), adulto (a) e idoso (i)
  // est: preço estimado, porque não existe pesquisa pública do valor no particular
  const ITEMS = [
    { id: 'consulta', label: 'Consultas médicas',               unit: 'por consulta', price: 200,   plan: 'copay', est: true, per: { c: 4, a: 2, i: 5 } },
    { id: 'lab',      label: 'Pedidos de exame de laboratório', unit: 'por pedido',   price: 90,    plan: 'copay', per: { c: 1, a: 1, i: 3 } },
    { id: 'imagem',   label: 'Raio-x ou ultrassom',             unit: 'por exame',    price: 150,   plan: 'copay', est: true, per: { c: 0, a: 0.5, i: 1 } },
    { id: 'tomo',     label: 'Tomografia ou ressonância',       unit: 'por exame',    price: 800,   plan: 'copay', est: true, per: { c: 0, a: 0, i: 0 } },
    { id: 'ps',       label: 'Idas ao pronto-socorro ou UPA',   unit: 'por ida',      price: 400,   plan: 'copay', est: true, per: { c: 1, a: 1, i: 1 } },
    { id: 'vacina_c', label: 'Doses de vacina de criança',      unit: 'por dose',     price: 350,   plan: 'none',  per: { c: 0.6, a: 0, i: 0 } },
    { id: 'vacina_a', label: 'Doses de vacina de adulto ou idoso', unit: 'por dose',  price: 85,    plan: 'none',  per: { c: 0, a: 0.1, i: 3 } },
    { id: 'remedio',  label: 'Remédios de uso contínuo',        unit: 'por remédio, por mês', price: 25, plan: 'none', times: 12, per: { c: 0, a: 0, i: 2 } },
    { id: 'dentista', label: 'Consultas no dentista',           unit: 'por consulta', price: 200,   plan: 'none',  est: true, per: { c: 1, a: 1, i: 1 } },
    { id: 'diaria',   label: 'Dias de internação sem cirurgia', unit: 'por dia',      price: 2500,  plan: 'full',  per: { c: 0, a: 0, i: 0 } },
    { id: 'cirurgia', label: 'Cirurgias',                       unit: 'por cirurgia, já com a internação', price: 15000, plan: 'full', per: { c: 0, a: 0, i: 0 } },
    { id: 'parto',    label: 'Partos',                          unit: 'por parto, com hospital e médicos', price: 20000, plan: 'full', per: { c: 0, a: 0, i: 0 } },
  ];
  const PLAN = [
    { id: 'plan_c', label: 'Plano de saúde, criança (por mês)', price: 370 },
    { id: 'plan_a', label: 'Plano de saúde, adulto (por mês)',  price: 800 },
    { id: 'plan_i', label: 'Plano de saúde, idoso (por mês)',   price: 2080 },
  ];
  const COPAY = 30;
  const SUS_PER_PERSON = 1879;   // gasto público com saúde por habitante em 2022 (IPEA)

  // Mensalidade de referência do plano por região: criança, adulto, idoso (ANS, junho de 2026)
  const REGIONS = {
    N: [435, 890, 2360], NE: [415, 900, 2310], CO: [475, 960, 2490], SE: [340, 720, 1865], S: [385, 830, 2175],
  };
  const UFS = [
    ['AC', 'Acre', 'N'], ['AL', 'Alagoas', 'NE'], ['AP', 'Amapá', 'N'], ['AM', 'Amazonas', 'N'],
    ['BA', 'Bahia', 'NE'], ['CE', 'Ceará', 'NE'], ['DF', 'Distrito Federal', 'CO'], ['ES', 'Espírito Santo', 'SE'],
    ['GO', 'Goiás', 'CO'], ['MA', 'Maranhão', 'NE'], ['MT', 'Mato Grosso', 'CO'], ['MS', 'Mato Grosso do Sul', 'CO'],
    ['MG', 'Minas Gerais', 'SE'], ['PA', 'Pará', 'N'], ['PB', 'Paraíba', 'NE'], ['PR', 'Paraná', 'S'],
    ['PE', 'Pernambuco', 'NE'], ['PI', 'Piauí', 'NE'], ['RJ', 'Rio de Janeiro', 'SE'], ['RN', 'Rio Grande do Norte', 'NE'],
    ['RS', 'Rio Grande do Sul', 'S'], ['RO', 'Rondônia', 'N'], ['RR', 'Roraima', 'N'], ['SC', 'Santa Catarina', 'S'],
    ['SP', 'São Paulo', 'SE'], ['SE', 'Sergipe', 'NE'], ['TO', 'Tocantins', 'N'],
  ];

  // Que parte do uso do dia a dia veio do SUS, pela resposta de "onde a casa cuidou da saúde".
  const SHARE = { so_sus: 1, mais_sus: 0.75, meio: 0.5, mais_fora: 0.25, nada: 0 };
  const PAYERS = ['sus', 'plano', 'bolso'];

  // Só pergunta "foi pelo SUS?" de cada evento caro quando a casa misturou SUS com plano ou particular.
  const mixed = s => s.origem !== 'so_sus' && s.origem !== 'nada';
  const hasPlan = s => s.plano === 'parte' || s.plano === 'todos';
  // Para onde vai o que não é SUS: o plano, se a casa tem um e ele cobre aquilo; senão, o bolso.
  const otherPayer = (s, it) => hasPlan(s) && it.plan !== 'none' ? 'plano' : 'bolso';
  // Quantidades guardam uma casa decimal (0,5 = uma vez a cada dois anos).
  const r1 = n => Math.max(0, Math.round(n * 10) / 10);
  const people = s => (s.c || 0) + (s.a || 0) + (s.i || 0);

  // Tudo o que a casa usou no ano, venha de onde vier.
  function estimateUse(s) {
    const q = {};
    ITEMS.forEach(it => { q[it.id] = s.c * it.per.c + s.a * it.per.a + s.i * it.per.i; });

    if (!s.checkup)  { q.consulta *= 0.6; q.lab *= 0.5; q.imagem *= 0.5; }       // abaixo da média
    if (s.cronico)   { q.consulta *= 1.6; q.lab *= 2; q.remedio += 2; }           // acima da média
    if (s.c > 0 && s.bebe) { q.consulta += 4.5; q.vacina_c += 12; }
    if (s.ps)        { q.ps = Math.max(q.ps * 2.5, 3); }
    if (s.gravidez === 'gravida' || s.gravidez === 'nasceu') { q.consulta += 7; q.imagem += 1; q.lab += 3; }
    if (!s.vacinas)  { q.vacina_c *= 0.3; q.vacina_a *= 0.3; }
    if (!s.dentista) { q.dentista = 0; }

    q.tomo = s.n_tomo || 0;
    q.parto = s.gravidez === 'nasceu' ? 1 : 0;
    q.cirurgia = s.h_cir || 0;
    q.diaria = 6 * (s.h_clin || 0);   // 6 dias por internação sem cirurgia; parto e cirurgia já trazem a internação no preço
    return q;
  }

  // Primeiro palpite de quem pagou cada coisa. A pessoa corrige linha por linha no extrato.
  // Devolve, para cada item, a quantidade de cada pagador: { consulta: { sus, plano, bolso }, … }
  function splitUse(s, q) {
    const share = SHARE[s.origem] ?? 1;
    const viaSus = answer => s.origem === 'so_sus' || (mixed(s) && answer === true);
    const partoSus = viaSus(s.parto_sus), hospitalSus = viaSus(s.hospital_sus);

    // a parte de cada item que veio do SUS
    const sus = {};
    ITEMS.forEach(it => { sus[it.id] = q[it.id] * share; });            // uso do dia a dia
    ['vacina_c', 'vacina_a'].forEach(id => { sus[id] = s.origem === 'nada' ? 0 : q[id]; });   // vacina vem do SUS mesmo para quem tem plano
    sus.tomo = viaSus(s.tomo_sus) ? q.tomo : 0;                          // eventos caros nunca são divididos
    sus.parto = partoSus ? q.parto : 0;
    sus.cirurgia = hospitalSus ? q.cirurgia : 0;
    sus.diaria = hospitalSus ? q.diaria : 0;

    // o resto vai para o plano, se a casa tem um e ele cobre aquilo; senão, para o bolso
    const out = {};
    ITEMS.forEach(it => {
      const total = r1(q[it.id]);
      const a = Math.min(total, r1(sus[it.id]));
      const rest = r1(total - a);
      const toPlan = otherPayer(s, it) === 'plano';
      out[it.id] = { sus: a, plano: toPlan ? rest : 0, bolso: toPlan ? 0 : rest };
    });
    return out;
  }

  // Os preços de partida: cada item pelo preço da tabela, e a mensalidade do plano pela região do estado.
  function defaultPrices(s) {
    const uf = UFS.find(u => u[0] === s.uf);
    const plan = uf ? REGIONS[uf[2]] : PLAN.map(p => p.price);
    const p = { copay: COPAY };
    ITEMS.forEach(it => { p[it.id] = it.price; });
    PLAN.forEach((it, n) => { p[it.id] = plan[n]; });
    return p;
  }

  const premiums = (s, p) => 12 * (s.c * p.plan_c + s.a * p.plan_a + s.i * p.plan_i);

  // Três montes que nunca se subtraem: o que o SUS pagou, o que o plano pagou e o que a casa pagou.
  // Tudo a preço de particular, para os três falarem a mesma língua.
  //   s      as respostas
  //   rows   quantidade de cada pagador em cada linha, como sai de splitUse ou como a pessoa corrigiu
  //   prices preços de cada item e do plano, e a coparticipação (%)
  //   paidPlan o que a casa pagou de mensalidade no ano (só conta se ela tem plano)
  function totals(s, rows, prices, paidPlan) {
    const copay = Math.min(100, prices.copay) / 100;
    const sum = { sus: 0, plano: 0, bolso: 0 };
    const lines = {};
    let withPlan = 0;

    ITEMS.forEach(it => {
      const price = prices[it.id] * (it.times || 1);
      const line = { total: 0 };
      PAYERS.forEach(key => {
        const value = r1(rows[it.id][key]) * price;
        line[key] = value;
        line.total += value;
        sum[key] += value;
        if (key === 'sus') withPlan += it.plan === 'copay' ? value * copay : it.plan === 'none' ? value : 0;
      });
      lines[it.id] = line;
    });

    const fee = hasPlan(s) ? paidPlan : 0;
    const n = people(s);
    return {
      lines,
      sus: sum.sus, plano: sum.plano, bolso: sum.bolso,
      total: sum.sus + sum.plano + sum.bolso,
      // o que saiu do bolso: o particular mais a mensalidade do plano
      fee, pocket: sum.bolso + fee,
      // só para quem não tem plano: o que veio do SUS, se a casa toda tivesse um plano
      withPlan: withPlan + premiums(s, prices),
      showWithPlan: s.plano === 'ninguem' && sum.sus > 0,
      // quanto o SUS custa: a média do país, à parte, nunca subtraída
      people: n, susCost: SUS_PER_PERSON * n,
    };
  }

  // O extrato que a página mostra logo depois da última pergunta, antes de a pessoa corrigir qualquer linha.
  function extrato(s) {
    const rows = splitUse(s, estimateUse(s));
    const prices = defaultPrices(s);
    const paidPlan = s.plano === 'todos' ? premiums(s, prices) : 0;
    return { rows, prices, paidPlan, result: totals(s, rows, prices, paidPlan) };
  }

  return {
    ITEMS, PLAN, COPAY, SUS_PER_PERSON, REGIONS, UFS, SHARE, PAYERS,
    mixed, hasPlan, otherPayer, r1, people,
    estimateUse, splitUse, defaultPrices, premiums, totals, extrato,
  };
});

// No terminal: node calculo.js respostas.json
if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
  const C = module.exports;
  const file = process.argv[2];
  if (!file) {
    console.log('Uso: node calculo.js respostas.json   (veja os exemplos em exemplos.json)');
    process.exit(1);
  }
  const answers = JSON.parse(require('fs').readFileSync(file, 'utf8'));
  const { rows, result } = C.extrato(answers);
  const brl = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
  console.log('Quem pagou o quê, a preço de particular:\n');
  C.ITEMS.forEach(it => {
    const r = rows[it.id];
    if (r.sus + r.plano + r.bolso === 0) return;
    const q = C.PAYERS.filter(k => r[k]).map(k => k + ' ' + String(r[k]).replace('.', ',')).join(', ');
    console.log('  ' + it.label.padEnd(36) + brl(result.lines[it.id].total).padStart(12) + '   (' + q + ')');
  });
  console.log('\n  O SUS pagou            ' + brl(result.sus));
  console.log('  O plano pagou          ' + brl(result.plano));
  console.log('  A casa pagou           ' + brl(result.bolso));
  console.log('  Saiu do bolso da casa  ' + brl(result.pocket) + (result.fee ? ' (com ' + brl(result.fee) + ' de mensalidade)' : ''));
  if (result.showWithPlan) console.log('  Com um plano para todos, o que veio do SUS sairia por ' + brl(result.withPlan));
  console.log('  Quanto o SUS custa para ' + result.people + ' pessoa(s): ' + brl(result.susCost) + ' (média do país, à parte)');
}
