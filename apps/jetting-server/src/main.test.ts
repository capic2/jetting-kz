
describe('main', () => {
  const app = require('./main');
  it('should work',async  () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/jetting',

    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty('users');
  });
});

