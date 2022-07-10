const mockRedisService = {
  setEx: jest.fn(() => Promise.resolve()),
};

export default mockRedisService;
