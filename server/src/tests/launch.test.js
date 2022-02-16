const request = require('supertest');
const app = require('../app');
const API_URL = '/api/v1/launches';

describe('get launches', () => {
  it('should response with 200 success', async () => {
    const response = await request(app)
      .get(`${API_URL}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

describe('create launch', () => {
  const completeLaunch = {
    mission: 'Kepler X',
    rocket: 'Explorer IS1',
    launchDate: 'January 27 2040',
    destination: 'Kepler b',
  };

  const launchWithoutDate = {
    mission: 'Kepler X',
    rocket: 'Explorer IS1',
    destination: 'Kepler b',
  };

  it('should response with 201 success', async () => {
    const response = await request(app)
      .post(`${API_URL}/`)
      .send(completeLaunch)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunch.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(requestDate).toBe(responseDate);

    expect(response.body).toMatchObject(launchWithoutDate);
  });

  it('should catch missing required properties', async () => {
    const response = await request(app)
      .post(`${API_URL}/`)
      .send(launchWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      message: 'mission, rocket, launchDate or destination missing',
    });
  });

  it('should  catch invalid launch date', async () => {
    const launch = {
      mission: 'Kepler X',
      rocket: 'Explorer IS1',
      launchDate: 'ok',
      destination: 'Kepler b',
    };
    const response = await request(app)
      .post(`${API_URL}/`)
      .send(launch)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      message: 'Invalid lunch date',
    });
  });
});

describe('delete launch', () => {
  it('should response with 200 success', async () => {
    const response = await request(app)
      .delete(`${API_URL}/100`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('should catch invalid non existant flight number', async () => {
    const response = await request(app)
      .delete(`${API_URL}/109`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toStrictEqual({
      message: 'Launch not found',
    });
  });
});
