process.env.NODE_ENV = "test";

const request = require("supertest");
const Book = require("../models/book")

const app = require("../app");
const db = require("../db");

beforeEach(async function (){
   await Book.create({	
	"isbn": "32asf23gh",
	"amazon_url": "www.amazon.com",
	"author": "don jonson",
	"language": "English",
	"pages": 24,
	"publisher": "penguin",
	"title": "theBestBook",
	"year": 2014
  })
})

const testBook = {	
	"isbn": "3ad2r",
	"amazon_url": "www.amazon.com",
	"author": "don jonson",
	"language": "English",
	"pages": 24,
	"publisher": "penguin",
	"title": "book2",
	"year": 2004
  }

const badTest = {	
	"isbn": 2,
	"amazon_url": "www.amazon.com",
	"author": "don jonson",
	"language": "English",
	"pages": "long",
	"publisher": "penguin",
	"title": "book2",
	"year": 2004
  }




describe('POST /books', function () {
  test("returns json book", async function () {
    const response = await request(app)
      .post(`/books`)
      .send(testBook);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({book: testBook});
  });

  test("doesnt accept bad data, returns err", async function(){
    const response = await request(app)
    .post('/books')
    .send(badTest);
    expect(response.statusCode).toBe(400);
    expect(JSON.stringify(response.body)).toMatch('not of a type(s)')
  })
});

describe('GET /books', function(){
  test('get all book', async function (){
    const response = await request(app).get('/books');
    expect(response.statusCode).toBe(200)
    expect(JSON.stringify(response.body)).toMatch('theBestBook')    
  })
})

describe('PUT /books/1', function(){
  test("resturns json of updated book", async function(){
    const response = await request(app)
    .put('/books/32asf23gh')
    .send({	
      "isbn": "32asf23gh",
      "amazon_url": "www.amazon.com",
      "author": "don jonson",
      "language": "English",
      "pages": 240,
      "publisher": "penguin",
      "title": "theBestBook",
      "year": 2016
      });
    expect(response.statusCode).toBe(200)
  })
})





afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM books");
});

afterAll(async function () {
  // close db connection
  await db.end();
});