import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PessoaComponent } from './pessoa.component';
import { PessoaService } from '../pessoa.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('PessoaComponent', () => {
  let component: PessoaComponent;
  let fixture: ComponentFixture<PessoaComponent>;
  let pessoaService: jasmine.SpyObj<PessoaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PessoaService', [
      'incluir',
      'alterar',
      'excluir',
      'pesquisar',
      'calcularPesoIdeal',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [PessoaComponent],
      providers: [{ provide: PessoaService, useValue: spy }],
    }).compileComponents();

    pessoaService = TestBed.inject(
      PessoaService
    ) as jasmine.SpyObj<PessoaService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the pessoa component', () => {
    expect(component).toBeTruthy();
  });

  it('should set success message when pessoa is included successfully', () => {
    const response = {
      id: 1,
      nome: 'Test',
      data_nasc: '2000-01-01',
      cpf: '123',
      sexo: 'M',
      altura: 1.7,
      peso: 60,
    };
    pessoaService.incluir.and.returnValue(of(response));
    component.incluir();
    expect(component.mensagem).toEqual('Pessoa incluída com sucesso!');
    expect(component.sucesso).toBeTrue();
  });

  it('should set error message when inclusion fails', () => {
    pessoaService.incluir.and.returnValue(
      throwError({ error: { cpf: ['pessoa with this cpf already exists.'] } })
    );
    component.incluir();
    expect(component.mensagem).toEqual(
      'O CPF informado já existe. Por favor, verifique e tente novamente.'
    );
    expect(component.sucesso).toBeFalse();
  });
});
