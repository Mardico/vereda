# Vereda Challenge

Desenvolvimento do teste proposto pela Escola Vereda em : https://github.com/pedrovaferreira/VeredaChallenge

## Configurando

O projeto está dividido em 2 pastas, api e frontend
Em ambas as pastas, basta rodar 
``` 
npm install 
```

Tenha certeza que está utilizando a versão mais recente do node.

* **frontend**
Abra a pasta frontend no terminal e use o comando `ng serve`

* **api**
Abra a pasta api no terminal e use o comando nodemon ou npm run dev

tenha certeza de rodar ambos juntos no ambiente de DEV

## Testando

O projeto conta com uma barra de busca que faz requisições na api sugerida:


```
http://www.omdbapi.com/
```

O título deve ser ingles, respeitando as regras da api terceira.
Para acompanhar, os textos também foram escritos em us/EN.

Ao carregar a lista de filmes, basta selecionar um dos itens para acessar mais detalhes.

Nesta página, o usuário pode avaliar o filme com uma nota de 1 a 5
O resultado é exibido na tela mostrando a média de avaliações cadastradas no banco.

### end to end tests

Rode ambas pastas conforme as configurações

Busque por um título ingles de um filme (a forma escrita pode influenciar o resultado), a busca não pode ser vazia.

```
avenger != avengers
```

Após carregar a lista, selecione uma página para carregar mais resultados.
A paginação não carrega outra tela, apenas refaz a requisição e carrega novos resultados na mesma.

Selecione um título para acessar seus detalhes.

O resultado das avaliações cadastradas devem aparecer na página
Dê uma nota ao filme, resultados inferiores a .0 serão arredondados,
enquanto decimais deverão ser exibidos.

Após dar a nota, os botões devem desaparecer exibindo uma mensgem.

Repita o processo, ao invés de buscar por um filme, selecione a opção de Série, esta deve se comportar da mesma maneira que a anterior.

## Autor

* **Matheus Batista**

## Considerações

Foi divertido desenvolver essa solução, por mais simples que seja, obrigado pela oportunidade!

**Cuidado com os spoilers de vingadores**
