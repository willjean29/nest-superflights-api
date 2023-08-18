import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let bearerToken: string;
  let passengerId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      mongoose.connection.db.dropDatabase();
    });
  })

  afterAll(() => mongoose.disconnect());

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Auth', () => {
    it('(POST) - SignUp User', () => {
      const mockSignUpUser = {
        name: "tomas",
        username: "tomas",
        email: "tomas@gmail.com",
        password: "123456"
      }
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(mockSignUpUser)
        .expect(201)
        .then((res) => {
          expect(res.body.token).toBeDefined();
          bearerToken = res.body.token;
        })
    });

    it('(POST) - SignIn User', () => {
      const mockSignInUser = {
        email: "tomas@gmail.com",
        password: "123456"
      }
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(mockSignInUser)
        .expect(201)
        .then((res) => {
          expect(res.body.token).toBeDefined();
          bearerToken = res.body.token;
        })
    });
  })

  describe('Passengers', () => {
    it('(POST) - Create new passenger', () => {
      const mockCreatePassenger = {
        name: "Diego Torres",
        email: "diego@gmail.com"
      }
      return request(app.getHttpServer())
        .post('/passengers')
        .set('Authorization', 'Bearer ' + bearerToken)
        .send(mockCreatePassenger)
        .expect(201)
        .then((res) => {
          expect(res.body._id).toBeDefined();
          passengerId = res.body._id;
        })
    })

    it('(GET) - Get all passengers', () => {

      return request(app.getHttpServer())
        .get('/passengers')
        .set('Authorization', 'Bearer ' + bearerToken)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeGreaterThan(0);
          expect(Array.isArray(res.body)).toBeTruthy();
        })
    })

    it('(GET) - Get passenger by id', () => {

      return request(app.getHttpServer())
        .get('/passengers/' + passengerId)
        .set('Authorization', 'Bearer ' + bearerToken)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toEqual(passengerId);
        })
    })

    it('(UPDATE) - Update passenger by id', () => {
      const mockUpdatePassenger = {
        name: "Diego Diaz",
      }
      return request(app.getHttpServer())
        .put('/passengers/' + passengerId)
        .set('Authorization', 'Bearer ' + bearerToken)
        .send(mockUpdatePassenger)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toEqual(passengerId);
          expect(res.body.name).toEqual(mockUpdatePassenger.name);
        })
    })

    it('(DELETE) - Get passenger by id', () => {
      return request(app.getHttpServer())
        .delete('/passengers/' + passengerId)
        .set('Authorization', 'Bearer ' + bearerToken)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toEqual(passengerId);
        })
    })
  })
});
