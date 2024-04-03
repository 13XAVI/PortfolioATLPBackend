import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import connnectionNewDB from '../server'; 
import dotenv from "dotenv";
dotenv.config();

describe('Blog API Tests', () => {
  let id: string;
  const token = process.env.APP_TOKEN_ADMIN;

  beforeAll(async () => {
    await connnectionNewDB(`${process.env.MONGODB_TEST}` as string);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('Create a new blog', async () => {
    const newBlogData = {
      title: "Tech Company",
      description: "This article educates about new technology",
      date: "2023-03-14"
    };

    const response = await request(app)
      .post('/api/V1/Blog/create')
      .send(newBlogData)
      .set("Authorization", `Bearer ${token}`);

   
    expect(response.body).toHaveProperty('_id');
    id = response.body._id;
  });

  test('Update a blog', async () => {
    const updatedBlogData = {
      title: "Updated Tech Company",
      description: "This article educates about updated technology",
      date: "2024-07-3",
      file:"https://res.cloudinary.com/daxeymqvv/image/upload/v1711978638/s4qqu3ct1sklciptb7cl.jpg"
    };

    const response = await request(app)
      .put(`/api/V1/Blog/update/${id}`)
      .send(updatedBlogData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Tech Company');
  });

  test('Delete a blog', async () => {
    const response = await request(app)
      .delete(`/api/V1/Blog/delete/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test('Get All blog', async () => {
    const response = await request(app)
      .get('/api/V1/Blog/All')
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
   
  });

  test('Fetch a single blog after deletion', async () => {
    const response = await request(app)
      .get(`/api/V1/Blog/find/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Not Found!');
  });

  test('Attempt to update a non-existent blog', async () => {
    const nonExistentBlogId = 'non-existent-id';
    const updatedBlogData = {
      title: "Attempted Update",
      description: "This is an attempted update on a non-existent blog",
      date: new Date()
    };

    const response = await request(app)
      .put(`/api/V1/Blog/update/${nonExistentBlogId}`)
      .send(updatedBlogData)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Not Found!');
  });

  test('Attempt to delete a non-existent blog', async () => {
    const nonExistentBlogId = 'non-existent-id';

    const response = await request(app)
      .delete(`/api/V1/Blog/delete/${nonExistentBlogId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Not Found!');
  });
});
