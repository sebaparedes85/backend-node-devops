import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/operaciones (GET)', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 10, b: 30 })
      .expect('Content-type', /application\/json/)
      .expect(200);
  });

  it('/operaciones (GET)', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 10, b: 30 })
      .expect('Content-type', /application\/json/)
      .expect(200)
      .expect({ resultado: 40, mensaje: 'operacion exitosa' }).then((res) => {
        expect(res.body.resultado).toBe(40);
        expect(res.body.mensaje).toBe('operacion exitosa');
      });
  });

  it('/operaciones (GET) con error', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'division', a: 90, b: 30 })
      .expect('Content-type', /application\/json/)
      .expect(422);
  });

});
