import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { DatabaseService } from '@shared/service';

import { BrandTestModule } from './module/brand.test.module';
import { sync, teardown } from '../../shared.test.module';

describe('Brand Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BrandTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    sync();
  });

  afterAll(async () => {
    await teardown(app.get<DatabaseService>(DatabaseService));
  });

  const input = {
    name: 'Brand 1',
  };

  let output: any;
  it('/ (POST)', async () => {
    output = await request(app.getHttpServer()).post('/brand').send(input);

    expect(output.status).toBe(201);
    expect(output.body.name).toBe('Brand 1');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/brand').expect(200, [output.body]);
  });

  it('/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/brand/${output.body.id}`)
      .expect(200, { ...output.body, products: [] });
  });
});
