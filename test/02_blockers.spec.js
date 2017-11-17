import chai from "chai";
import chaiHttp from "chai-http";

import server from "../app";
import { testUser, sampleBlocker } from "./testData";
const expect = chai.expect;
chai.use(chaiHttp);
const token = { authorization: "Bearer " };
let blockerId = null;

describe("Blocker", () => {
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users")
      .send(testUser)
      .end((err, res) => {
        token.authorization += res.body.message;
        done();
      });
  });

  describe("/POST blockers", () => {
    it("can create a blocker", done => {
      chai
        .request(server)
        .post("/api/v1/blockers")
        .send(sampleBlocker)
        .set(token)
        .end((err, res) => {
          blockerId = res.body._id;
          expect(res.body).to.be.a("object");
          expect(res.body.title).to.eql("Simple Print in JS");
          done();
        });
    });
  });

  describe("/GET blockers", () => {
    it("can get blockers", done => {
      chai
        .request(server)
        .get("/api/v1/blockers")
        .set(token)
        .end((err, res) => {
          expect(res.body.docs).to.be.a("array");
          expect(res.body.docs[0].title).to.eql("Simple Print in JS");
          done();
        });
    });
  });

  describe("/DELETE blocker", () => {
    it("can delete a blocker", done => {
      chai
        .request(server)
        .del(`/api/v1/blockers/${blockerId}`)
        .set(token)
        .end((err, res) => {
          expect(res.body.message).to.eql("successfully archived");
          done();
        });
    });
  });
});
