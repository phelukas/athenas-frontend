import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PessoaService, Pessoa } from './pessoa.service';

describe('PessoaService', () => {
  let service: PessoaService;
  let httpMock: HttpTestingController;
  const dummyPessoa: Pessoa = {
    id: 1,
    nome: 'João da Silva',
    data_nasc: '1990-01-01',
    cpf: '123.456.789-00',
    sexo: 'M',
    altura: 1.75,
    peso: 70,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PessoaService],
    });
    service = TestBed.inject(PessoaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a pessoa by id', () => {
    service.pesquisar(1).subscribe((pessoa) => {
      expect(pessoa).toEqual(dummyPessoa);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}1/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPessoa);
  });
});
