var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
const Joi = require('joi');
const addContext = require('mochawesome/addContext');
const url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata';
const { schemaCotacao } = require('../schemas/cotacao.schema.js');

function addReport(arg1, arg2) {
  addContext(arg1, {title: 'Context', value: arg2});
}

describe('Cotação - Validação por dataCotacao', function () {
  this.timeout(30000);

  it('(GET) Sucess (200): Validar contrato de cotação por DataCotacao', function (done) {
    request(url)
    .get("/CotacaoDolarDia(dataCotacao='10-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.body) };
      expect(200).to.be.equal(res.statusCode);
      Joi.validate(res.body.value, Joi.array().items(schemaCotacao), {
        abortEarly: false
      }, (err, data) => { if (err) throw err; });
      done();
    });
  });

  it('(GET) Sucess (200): Consulta de cotação inexistente (DataCotacao = data futura)', function (done) {
    request(url)
    .get("/CotacaoDolarDia(dataCotacao='10-10-2050')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(200).to.be.equal(res.statusCode);
      expect([]).to.eql(res.body.value);
      done();
    })
  });

  it('(GET) Internal Server Error (500): Consulta por data de cotação com dia inválido', function (done) {
    request(url)
    .get("/CotacaoDolarDia(dataCotacao='10-32-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    })
  });

  it('(GET) Internal Server Error (500): Consulta pot data de cotação com mês inválido', function (done) {
    request(url)
    .get("/CotacaoDolarDia(dataCotacao='13-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error)};
      expect(500).to.be.equal(res.statusCode);
      done();
    })
  });

  it('(GET) Internal Server Error (500): Consulta por data de cotação com ano inválido', function (done) {
    request(url)
    .get("/CotacaoDolarDia(dataCotacao='10-01-AAAA')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    })
  });
});

describe('Cotação - Validação por período <DataInicial> <DataFinal>', function () {
  this.timeout(30000);

  it('(GET) Sucess (200): Validar contrato de cotação por período', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-01-2020',dataFinalCotacao='10-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.body) };
      expect(200).to.be.equal(res.statusCode);
      Joi.validate(res.body.value, Joi.array().items(schemaCotacao), {
        abortEarly: false
      }, (err, data) => { if (err) throw err; });
      done();
    });
  });

  it('(GET) Sucess (200): Consulta de cotação inexistente (periodoCotacao = período futuro)', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-01-2040',dataFinalCotacao='10-01-2040')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.body) };
      expect(200).to.be.equal(res.statusCode);
      expect([]).to.eql(res.body.value);
      done();
    });
  });

  it('(GET) Sucess (200): Consulta de cotação por período com dataInicial > dataFinal', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-01-2020',dataFinalCotacao='08-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.body) };
      expect(200).to.be.equal(res.statusCode);
      expect([]).to.eql(res.body.value);
      done();
    });
  }); //Este cenário poderia ter validação não tratada

  it('(GET) Internal Server Error (500): Consulta de cotação por período (dia inválido em dataInicial)', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-32-2020',dataFinalCotacao='10-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    });
  });

  it('(GET) Internal Server Error (500): Consulta de cotação por período (mês inválido em dataInicial)', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='13-01-2020',dataFinalCotacao='10-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    });
  });

  it('(GET) Internal Server Error (500): Consulta de cotação por período (ano inválido em dataInicial)', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-01-AAAA',dataFinalCotacao='10-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    });
  });

  it('(GET) Internal Server Error (500): Consulta de cotação por período (dia inválido em dataFinal)', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-01-2020',dataFinalCotacao='10-32-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    });
  });

  it('(GET) Internal Server Error (500): Consulta de cotação por período (mês inválido em dataFinal)', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-01-2020',dataFinalCotacao='13-01-2020')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    });
  });

  it('(GET) Internal Server Error (500): Consulta de cotação por período (ano inválido em dataFinal)', function (done) {
    request(url)
    .get("/CotacaoDolarPeriodo(dataInicial='09-01-2020',dataFinalCotacao='10-01-AAAA')")
    .end((err, res) => {
      if (err == null) { addReport(this, res.error) };
      expect(500).to.be.equal(res.statusCode);
      done();
    });
  });
});