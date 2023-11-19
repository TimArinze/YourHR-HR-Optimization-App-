const chai = require('chai');
const sinon = require('sinon')

const redisClient = require('../src/utils/redis.js');

describe('redisClient', function () {
  describe('testing isAlive function', function () {
    //stubbing console.log means that calls to console.log won't actually log anything
    sinon.stub(console, 'log');
    // check if isAlive returns false if redis is not started
    it.skip("isAlive when redis not started", function (done) {
      //setting up a repeating function
      let i = 0;
      const repeatFn = async function () {
        //the function calls redisClient.isAlive() and expects it to return false
        await setTimeout(() => {
          let cResult
          try {
            cResult = redisClient.isAlive();
          } catch (err) {
            cResult = false;
          }
          chai.expect(cResult).to.equal(false);
          i++;
          //this function will be tested for 5 times
          if (i < 5) {
            repeatFn();
          } else {
            done();
          }
          //This function is called every second
        }, 1000);
      }
      repeatFn();
      //timeout is a function used to specify how long to wait for the test to finish,
      //if longer it fails
    }).timeout(10000);

    // check if isAlive returns true if redis is started
    it("isAlive when redis started", function (done) {
      //setting up a repeating function
      let i = 0;
      const repeatFn = async function () {
        await setTimeout(() => {
          i += 1;
          if (i >= 5) {
            chai.assert.isTrue(false);
          } else if (!redisClient.isAlive) {
            repeatFn()
          } else {
            chai.assert.isTrue(true);
            done()
          }
        }, 1000);
      }
      repeatFn();
    }).timeout(10000);

  })
  sinon.restore();
  describe('testing get, set and del functions', function () {
    // check if set function works well
    it("set function works well", function (done) {
      const key = 'testKey';
      const value = 'testValue';
      redisClient.set(key, value, 60)
      // check if the set function returns OK
      .then((setResult) => {
        chai.expect(setResult).to.equal('OK');
        done();
      })
      .catch((err) => {
        done(err);
      })
    })
    // check if get function returns null for non-existence key
    it("get function returns null for non-existence key", function (done) {
      const key = 'nonExistentKey';
      redisClient.get(key).then((result) => {
        chai.expect(result).to.equal(null);
        done();
      }).catch((err) => {
        done(err);
      })
    })
    // check if get function returns the value of a key
    it("get function returns the value of a key", function (done) {
      const key = 'testKey';
      const value = 'testValue';
      redisClient.set(key, value, 60);
      redisClient.get(key).then((result) => {
        chai.expect(result).to.equal(value);
        done();
      }).catch((err) => {
        done(err);
      })
    })
    // check if del function deletes a key
    it("del function deletes a key", function (done) {
      const key = 'testKey';
      const value = 'testValue';
      redisClient.set(key, value, 60);
      redisClient.del(key).then((result) => {
        chai.expect(result).to.equal(1);
        done();
      }).catch((err) => {
        done(err);
      })
    })
  })
})
