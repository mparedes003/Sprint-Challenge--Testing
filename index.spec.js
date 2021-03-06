const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  // test for POST ENDPOINT

  const expected = [
    {
      "title": "Pacman",
      "genre": "Arcade",
      "releaseYear": 1980
    },
    {
      "title": "Centipede",
      "genre": "Arcade",
      "releaseYear": 1980
    },
    {
      "title": "Galaga",
      "genre": "Arcade",
      "releaseYear": 1981
    },
    {
      "title": "Ateriods",
      "genre": "Arcade",
      "releaseYear": 1979
    },
    {
      "title": "Tekken World Cup",
      "genre": "Arcade",
      "releaseYear": 1985
    }
  ]
  describe('POST /games', () => {
    // check for adding content inside the db and return status code 201
    it('should add a game and return status code 201', async () => {
      const game = {
        "title": "Tekken World Cup",
        "genre": "Arcade",
        "releaseYear": 1985
      };
      
      const response = await request(server)
        .post(`/games`)
        .send({game});

      expect(response.body).toEqual(expected);
      expect(response.status).toBe(201);
    });

    // check for correct http status code
    it('should return status code 400 when recieiving incorrect game data', async () => {
      
      const response = await request(server)
        .post(`/games`)
        .send({});

      expect(response.status).toBe(400);
    });

    // check for format of response
    it('should return JSON', async () => {
      const response = await request(server).post('/games');

      expect(response.type).toBe('application/json');
    });
  });

  // test for GET ENDPOINT
  describe('GET /pets', () => {
    // check for get list of all games and correct http status code
    it('should get a list of all games and return status code 200(OK)', async () => {
      const response = await request(server)
        .get('/games');

      expect(response.body).toEqual(expected);
      expect(response.status).toBe(200);

    });

    // check that an empty array is returned in no games are stored
    // you will need to comment out all objects inside 
    // expected in index.spec.js and 
    // games in server.js for this test to pass
    it('should return an empty array if no games stored and a status code of 200', async () => {
      const response = await request(server)
        .get('/games');

      const noGamesStored = [];

      expect(response.body).toEqual(noGamesStored);
      expect(response.status).toBe(200);
    });

    // check for format of response
    it('should return JSON', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });
  });

  
});