# DESAFIO CORTEX - EXERCÍCIO 2

Repositório destinado para os testes automatizados de API utilizando SuperTest.


## Pré-requisitos para rodar localmente

*  [Instalação do node](https://nodejs.org/en/download/)
*  [Instalação do npm](https://www.npmjs.com/get-npm)


#### Atenção: É necessário que a máquina esteja com todas as dependencias instaladas:

1. Entrar na raíz do projeto `desafioCortex` onde existe o arquivo `package.json`
2. Usar o comando: ```npm install``` 
3. Instalar a dependencia global do mocha: ```npm install -g mocha```

## Rodando os testes localmente com mocha

* Entrar na pasta specs do projeto `desafioCortex/specs`
* Executar o comando `mocha *.js` para executar todos testes


## Rodando os testes com report

* Entrar na raíz do projeto `desafioCortex`
* Usar o comando:
```npm run test```


## Visualizar o report

* Entrar na pasta `desafioCortex/reports` e abrir o arquivo  `index.html`


## Resumindo o projeto

* A pasta principal é a `desafioCortex` e dentro dela temos as pastas `specs` e  `schemas`

* Na pasta `schemas` fica o arquivo `schema.js` que é utilizado na realização dos testes de contrato.

* Na pasta `specs` temos o arquivo `spec.js` que contém os cenários de testes executados.

* Na raiz do projeto também é possível visualizar os seguintes arquivos:

   *  `package.json` e `package-lock.json` arquivo com nossas dependências e o script de test com report