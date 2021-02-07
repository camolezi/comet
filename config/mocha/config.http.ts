import chai from "chai";
import chaiHttp from "chai-http";

export const mochaHooks = {
  beforeAll(done) {
    chai.use(chaiHttp);
    done();
  },
};
