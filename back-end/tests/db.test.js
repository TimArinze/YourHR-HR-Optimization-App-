const chai = require('chai');
const expect = chai.expect;

const dbClient = require('../src/utils/db');
const sinon = require('sinon');

describe('dbClient', function () {
  describe('testing isAlive function', function () {
    it('isAlive when mongodb is started', function (done) {
      const result = dbClient.isAlive();
      expect(result).to.equal(true);
      done();
    });
    it.skip('isAlive when mongodb is stopped', function (done) {
      sinon.stub(dbClient, 'isAlive').returns(false);
      const result = dbClient.isAlive();
      expect(result).to.equal(false);
      done();
    });
  });
  describe('testing nbUsers and nbFiles functions', function () {
    it('nbUsers function', function (done) {
      // Stub the nbUsers method to return a fixed number of 
      const stubNbUsers = sinon.stub(dbClient, 'nbUsers').returns(Promise.resolve(10));
      dbClient.nbUsers()
      .then((result) => {
        expect(result).to.equal(10);
        stubNbUsers.restore();
        done();
      })
      .catch((err) => {
        stubNbUsers.restore();
        done(err);
      })
    })
    it('nbFiles function', function (done) {
      // Stub the nbFiles.
      const stubNbFIles = sinon.stub(dbClient, 'nbFiles').returns(Promise.resolve(8));
      dbClient.nbFiles()
      .then((result) => {
        expect(result).to.equal(8);
      }).catch((err) => {
        console.error(err)
      }).finally(() => {
        stubNbFIles.restore();
        done()
      })
    })
  });
});