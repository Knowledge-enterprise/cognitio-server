import chai from "chai";
import chaiHttp from "chai-http";

import server from "../app";
import { testUser } from "./testData";
const expect = chai.expect;
chai.use(chaiHttp);

describe("Blocker", () => {
  describe("/POST users", () => {
    it("can create a new user", done => {
      chai
        .request(server)
        .post("/api/v1/users")
        .send(testUser)
        .end((err, res) => {
          expect(res.body.message.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("/GET users", () => {
    it("can get users", done => {
      chai
        .request(server)
        .get("/api/v1/users")
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body[0].name).to.eql("Montaro Zen");
          done();
        });
    });
  });
});
