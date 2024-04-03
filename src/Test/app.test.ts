import request from 'supertest';
import mongoose from 'mongoose';
import   connnectionNewDB from '../server';
import app from '../app';

beforeAll(async () => {
  await connnectionNewDB(`${process.env.MONGODB_TEST}` as string);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("GET / - a All api endpoint", () => {
    it("All API Request", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200)
        expect(response.body.message).toBe('pass!')
    });
});

describe("Fail to get All api endpoint", () => {
    it("Not Found API Request", async () => {
      const response = await request(app).get("/notFound");
      expect(response.status).toBe(404)
        expect(response.body.message).toBe('Not Found!')
    });
  });