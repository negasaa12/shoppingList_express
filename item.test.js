
process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app')
let items = require('./fakeDb')
console.log(items)
let apples = {name: 'apple', price: 3.50 }

beforeEach(function() {
    items.push(apples)
});
 

afterEach(function(){
    items.length = 0;
})

describe("GET LIST OF ITEMS",() => {
    test('Get all cats', async () =>{
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [apples]})
    })
})


describe("POST /items", () => {
    test('creating an item', async () =>{
        const res = await request(app).post('/items').send({name: 'bread', price: 2.00})
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added:{name: 'bread', price: 2.00} })
    })
})


describe("/PATCH  /items/:name",() => {
    test('updating name', async () =>{
        const res = await request(app).patch(`/items/${apples.name}`).send({name: 'Cheese', price: 3.50})
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name:'Cheese', price : 3.50}})
    })
})

describe("DELETE /items/:name", function () {
    test("Deletes a single item", async function () {
      const response = await request(app)
        .delete(`/items/${apples.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
  });