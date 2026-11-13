// Refaz a conta das casas de exemplo e compara com o resultado esperado.
//
//   node conferir.js
//
// Usa o mesmo calculo.js que a página carrega, então o número aqui é o número do site
// para as mesmas respostas. Se você mudar um preço ou uma média em calculo.js, este
// teste mostra quais casas mudaram e quanto.
const C = require('./calculo.js');
const exemplos = require('./exemplos.json');

const brl = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const CAMPOS = [
  ['sus', 'O SUS pagou'], ['plano', 'O plano pagou'], ['bolso', 'A casa pagou no particular'],
  ['pocket', 'Saiu do bolso da casa'], ['withPlan', 'Com um plano para todos'], ['susCost', 'Quanto o SUS custa'],
];

let falhas = 0;
exemplos.forEach(ex => {
  const r = C.extrato(ex.respostas).result;
  const erros = CAMPOS.filter(([k]) => k in ex.esperado && Math.round(r[k]) !== ex.esperado[k])
    .map(([k, nome]) => nome + ': esperado ' + brl(ex.esperado[k]) + ', deu ' + brl(r[k]));
  console.log((erros.length ? '✗ ' : '✓ ') + ex.casa + ' — o SUS pagou ' + brl(r.sus));
  erros.forEach(e => console.log('    ' + e));
  falhas += erros.length ? 1 : 0;
});
console.log(falhas ? '\n' + falhas + ' casa(s) com resultado diferente do esperado.' : '\nTodas as ' + exemplos.length + ' casas batem com o esperado.');
process.exit(falhas ? 1 : 0);
