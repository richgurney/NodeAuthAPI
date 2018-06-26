/* eslint-disable */
process.env.NODE_ENV = 'test';

const Post = require('../../models/post');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Posts Service', () => {

  beforeEach((done) => {
    Post.remove({}, (err) => {
      if (err) throw err
      done();
    });
  });

  describe('/GET all posts', () => {
    it('It should GET all the posts', (done) => {
      chai.request(server)
        .get('/api/posts')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/GET one post', () => {
    it('It should GET one post by the given id', (done) => {
      const post = new Post({
        title: 'Richard\'s First Post',
        author: 'Richard Gurney',
        body: 'This is the most exciting blog post in the world',
        likes: 1,
      })
      post.save((err, post) => {
        chai.request(server)
          .get(`/api/posts/${post.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('body');
            res.body.should.have.property('likes');
            res.body.should.have.property('createdAt');
            res.body.title.should.equal(post.title);
            res.body.author.should.equal(post.author);
            res.body.body.should.equal(post.body);
            done();
          });
      })
    });
  });

  describe('/POST new post', () => {
    it('It should POST one new post and return created post', (done) => {
      const newPostModel = {
        title: 'This is the title',
        author: 'This is the author',
        body: 'This is the body',
      };
      chai.request(server)
        .post(`/api/posts`)
        .send(newPostModel)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('body');
          res.body.should.have.property('likes');
          res.body.should.have.property('createdAt');
          res.body.title.should.equal(newPostModel.title);
          res.body.author.should.equal(newPostModel.author);
          res.body.body.should.equal(newPostModel.body);
          done();
        });
    })
  })

  describe('/POST like post', () => {
    it('It should add a like to a POST ', (done) => {
      // chai.request(server)
      //   .post(`/api/posts`)
      //   .end((err, res) => {
      //     res.should.have.status(201);
      //     done()
      //   });
      done()
    })
  })


});
