import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesService } from './operaciones.service';

describe('OperacionesService', () => {
  let service: OperacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionesService],
    }).compile();

    service = module.get<OperacionesService>(OperacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('probar suma de numeros', () => {

    let a: any = 10;
    let b: any = 40;

    expect(service.operar('suma', a, b)).toBe(50);
    expect(service.operar('suma', a, b)).not.toBe(51);
    expect(service.operar('suma', a, b)).toBeGreaterThan(49);

    a = null;
    b = "50";

    expect(service.operar('suma', a, b)).toBeNaN();

    a = undefined;
    b = 50;

    expect(() => {
      service.operar('suma', a, b)
    }).toThrow('No se puede llamar con numeros indefinidos');


    a = '10';
    b = 30;
    expect(service.operar('suma', a, b)).toBeNaN();


    a = Math.PI;
    b = 30;
    expect(service.operar('suma', a, b)).toBeCloseTo(33.14, 2);

  });
});
