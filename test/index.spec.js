const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

chai.use(chaiHttp);
chai.should();

let id;

describe("Server", () => {

  it("should get all news", (done) => {
    chai.request(app)
     .get('/')
     .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        id = res.body[0]._id
        done();
      });
  });

  it("should get single article", (done) => {
    chai.request(app)
      .get(`/news/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body._id.should.be.equal(id)
        done();
      });
  });

  it("should post an article", (done) => {
    chai.request(app)
      .post('/news')
      .type('form')
      .send({
        "title": 'test',
        "description": 'test',
        "content": 'test',
        "urlToImage": 'test',
        "publishedAt": null,
        "author": 'test',
        "url": 'test',
        "imageType": 'test'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should edit an article", (done) => {
    chai.request(app)
      .put(`/news/${id}`)
      .set({'content-type': 'application/json'})
      .send({
        "title": 'test',
        "description": 'test',
        "content": 'test',
        "urlToImage": 'test',
        "publishedAt": null,
        "author": 'test',
        "url": 'test',
        "imageType": 'test'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should delete an article", (done) => {
    chai.request(app)
      .del(`/news/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
});