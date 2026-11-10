#!/usr/bin/env python3
"""Mensalidade de referência dos planos de saúde, por faixa etária e por região.

Refaz, a partir dos dados abertos da ANS, os valores de plano de saúde usados na
calculadora. Só usa a biblioteca padrão do Python.

O que é o número: o Valor Comercial da Mensalidade (VCM) que cada plano declara à
ANS na sua nota técnica. É um preço de referência, não o preço efetivamente pago:
a ANS permite que o preço praticado fique até 30% acima ou abaixo dele.

Recorte: planos de contratação individual ou familiar, com cobertura ambulatorial
e hospitalar com obstetrícia. Cada linha é um plano em uma nota técnica; a mediana
não é ponderada pelo número de beneficiários.

Arquivos (baixe os três e passe os caminhos, nesta ordem):

  1. Painel de Precificação (zip com um CSV)
     https://dadosabertos.ans.gov.br/FTP/PDA/painel_precificacao-031/
  2. Características dos produtos (CSV)
     https://dadosabertos.ans.gov.br/FTP/PDA/caracteristicas_produtos_saude_suplementar-008/
  3. Opcional, para a tabela por região: valor comercial por município do mês
     (zip) e a tabela de municípios (CSV) da mesma pasta
     https://dadosabertos.ans.gov.br/FTP/PDA/valor_comercial_medio_por_municipio_NTRP-054/

Uso:
  python3 planos_ans.py 2026-06 painel.zip produtos.csv
  python3 planos_ans.py 2026-06 painel.zip produtos.csv municipios_202606.zip geo.csv
"""
import collections
import csv
import io
import statistics
import sys
import zipfile

FAIXAS = ['0-18', '19-23', '24-28', '29-33', '34-38', '39-43', '44-48', '49-53', '54-58', '59+']


def linhas(caminho):
    """Lê um CSV separado por ';', direto ou de dentro de um zip, sem carregar tudo na memória."""
    if caminho.endswith('.zip'):
        with zipfile.ZipFile(caminho) as z, z.open(z.namelist()[0]) as f:
            yield from csv.DictReader(io.TextIOWrapper(f, encoding='utf-8', errors='replace'), delimiter=';')
    else:
        with open(caminho, encoding='utf-8', errors='replace') as f:
            yield from csv.DictReader(f, delimiter=';')


def valor(texto):
    return float(texto.replace(',', '.'))


def planos_do_recorte(produtos):
    return {
        r['ID_PLANO'] for r in linhas(produtos)
        if r['CONTRATACAO'].startswith('Individual')
        and r['SGMT_ASSISTENCIAL'].startswith('Ambulatorial + Hospitalar com obst')
    }


def tabela(titulo, grupos):
    print('\n' + titulo + '\n')
    print('| | n | ' + ' | '.join(FAIXAS) + ' |')
    print('|---|---|' + '---|' * len(FAIXAS))
    for nome in sorted(grupos):
        g = grupos[nome]
        medianas = [statistics.median(g[fx]) for fx in range(1, 11)]
        print(f'| {nome} | {len(g[1])} | ' + ' | '.join(f'{m:.2f}' for m in medianas) + ' |')
        if nome == 'Brasil':
            adulto = statistics.mean(medianas[1:9])
            print(f'\nAdulto (19 a 58), média simples das oito medianas: {adulto:.2f}')


def nacional(mes, painel, recorte):
    brasil = collections.defaultdict(list)
    for r in linhas(painel):
        if r['ANO_MES'] == mes and r['ID_PLANO'] in recorte:
            brasil[int(r['CD_FAIXA_ETARIA'])].append(valor(r['VCM']))
    if not brasil:
        sys.exit(f'Nenhuma linha para o mês {mes}. O formato é AAAA-MM.')
    tabela(f'Mediana do valor comercial, {mes}, R$ por mês', {'Brasil': brasil})


def regional(municipios, geo, recorte):
    regiao = {r['CD_MUNICIPIO']: r['NM_REGIAO'] for r in linhas(geo)}
    vistos = set()   # o mesmo plano repete o valor em cada município: conta uma vez por região
    for r in linhas(municipios):
        if r['ID_PLANO'] in recorte and r['CD_MUNICIPIO'] in regiao:
            vistos.add((r['ID_PLANO'], int(r['CD_FAIXA_ETARIA']), regiao[r['CD_MUNICIPIO']], r['VCM']))
    grupos = collections.defaultdict(lambda: collections.defaultdict(list))
    for _, faixa, nome, vcm in vistos:
        grupos[nome][faixa].append(valor(vcm))
    tabela('Mediana do valor comercial por região, R$ por mês', grupos)


if __name__ == '__main__':
    if len(sys.argv) not in (4, 6):
        sys.exit(__doc__)
    recorte = planos_do_recorte(sys.argv[3])
    nacional(sys.argv[1], sys.argv[2], recorte)
    if len(sys.argv) == 6:
        regional(sys.argv[4], sys.argv[5], recorte)
