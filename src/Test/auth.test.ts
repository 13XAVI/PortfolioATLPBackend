import request from 'supertest';
import mongoose from 'mongoose';
import   connnectionNewDB from '../server';
import app from '../app';
import bcrypt from 'bcrypt';


describe('User API Endpoints', () => {
    beforeAll(async () => {
        await connnectionNewDB(`${process.env.MONGODB_TEST}` as string);
    },);

    afterAll(async () => {
        await mongoose.disconnect();
    });


    describe("GET / - a All api endpoint", () => {
        it("Hello API Request", async () => {
          const response = await request(app).get("/");
          expect(response.status).toBe(200)
            expect(response.body.message).toBe('pass!')
        });
      });

    const saltRounds = 10;
    const hashedPassword =  bcrypt.hash("123456", saltRounds);

    const userData = {
        name: 'test',
        email: 'test@gmail.com',
        password: '123456',
    };
    
    const adminToken = process.env.APP_TOKEN_ADMIN;

    let id: any; 

    describe('POST api/V1/User/Create', () => {
        it.only('should create a new user', async () => {
            const response = await request(app)
                .post('/api/v1/User/Create')
                .send({
                    name: 'test',
                    email: 'test@gmail.com',
                    password: '123456',
                    role: 'user'
                });
    
                expect(response.status).toBe(201);
                expect(response.body.message).toBe('User Created Successfully!');
                expect(response.body.user).toHaveProperty('_id');

        },);
    });
    
    describe("Fail Login a bad credential User",()=>{
        it("Fail Login user with status 401", async () => {
            const res = await request(app).post("/api/V1/User/Login").send({
              email:userData.name,
              password: "123456789"
            });
            expect(res.status).toBe(401);
            
          });
    })
    

    describe("Fail to Login User if on credential is missing", () => {
        it("Signin User POST: api/V1/User/Login ", async () => {
            const response = await request(app)
                .post("/api/v1/User/Login")
                .send({
                    email: 'test@gmail.com',
                })

            expect(response.status).toBe(401);
        });
    });
    describe('DELETE /api/v1/User/Delete/:id', () => {
        it('should delete an existing user', async () => {
            const response = await request(app)
                .delete(`/api/V1/User/Delete/${id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'User deleted successfully');
        },);
    });
    describe('PUT /api/V1/User/update/:id', () => {
        it('should update an existing user',  async() => {
            
            const response = await request(app)
                .put(`/api/V1/User/update/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'test',
                    email: 'test@gmail.com',
                    password: hashedPassword,
                    role: 'user'
                });
            expect(response.status).toEqual(200);
           
        }, );
    });

    describe("Given  user does not Exist",()=>{
        it("should return 404",async()=>{
            await request(app).get(`/api/V1/User/find/${id}`)
            expect(404)
            expect("user Not Found")
        })
    })
    
});
