import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Blocker", () => {
  describe("/GET blockers", done => {
    it("can do sth", done => {
      chai
        .request(server)
        .get("/blockers")
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });
  });
});
