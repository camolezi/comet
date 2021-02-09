import chai from "chai";
import chaiHttp from "chai-http";
import chaiExclude from "chai-exclude";

export const mochaHooks = {
  beforeAll(done) {
    chai.use(chaiHttp);
    chai.use(chaiExclude);
    done();
  },
};
