import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Pessoa, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css'],
})
export class PessoaComponent implements OnInit {
  pessoa: Pessoa = {
    nome: '',
    data_nasc: '',
    cpf: '',
    sexo: 'M',
    altura: 0,
    peso: 0,
  };

  resultado: any;
  mensagem: string = '';
  sucesso: boolean = false;
  modalAberto: boolean = false;
  modalSucessoAberto: boolean = false;
  modalPesquisaAberto: boolean = false;

  pesquisa = {
    id: '',
    cpf: '',
  };

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
      this.sucesso = false;
      return;
    }
    this.incluir();
  }

  limparFormulario(): void {
    this.pessoa = {
      id: undefined,
      nome: '',
      data_nasc: '',
      cpf: '',
      sexo: 'M',
      altura: 0,
      peso: 0,
    };
  }

  incluir(): void {
    this.pessoaService.incluir(this.pessoa).subscribe({
      next: (res) => {
        this.pessoa = res; // O objeto retornado da API contém o ID
        console.log('Pessoa incluída:', res);
  
        // Verifica se o ID foi retornado corretamente
        console.log('ID da pessoa cadastrada:', this.pessoa.id);
  
        this.modalSucessoAberto = true; // Abre o modal de sucesso
  
        this.mensagem = 'Pessoa incluída com sucesso!';
        this.sucesso = true;
      },
      error: (err) => {
        console.error('Erro ao incluir:', err);
        if (
          err.error &&
          err.error.cpf &&
          err.error.cpf[0] === 'pessoa with this cpf already exists.'
        ) {
          this.mensagem =
            'O CPF informado já existe. Por favor, verifique e tente novamente.';
        } else {
          this.mensagem = 'Erro ao incluir a pessoa.';
        }
        this.sucesso = false;
      },
    });
  }
  

  fecharModalSucesso(): void {
    this.modalSucessoAberto = false;
  }

  alterar(): void {
    if (this.pessoa.id) {
      this.pessoaService.alterar(this.pessoa).subscribe({
        next: (res) => {
          this.resultado = res;
          console.log('Pessoa alterada:', res);
          this.mensagem = 'Pessoa alterada com sucesso!';
          this.sucesso = true;
        },
        error: (err) => {
          console.error('Erro ao alterar:', err);
          this.mensagem = 'Erro ao alterar a pessoa.';
          this.sucesso = false;
        },
      });
    } else {
      alert('Pesquise uma pessoa primeiro para alterar.');
    }
  }

  abrirModal(): void {
    if (!this.pessoa.id) {
      alert('Pesquise uma pessoa primeiro para excluir.');
      return;
    }
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  confirmarExclusao(): void {
    this.modalAberto = false;
    this.pessoaService.excluir(this.pessoa.id!).subscribe({
      next: () => {
        console.log('Pessoa excluída');
        this.mensagem = 'Pessoa excluída com sucesso!';
        this.sucesso = true;
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro ao excluir:', err);
        this.mensagem = 'Erro ao excluir a pessoa.';
        this.sucesso = false;
      },
    });
  }

  abrirModalPesquisa(): void {
    this.modalPesquisaAberto = true;
    this.pesquisa = { id: '', cpf: '' };
  }

  fecharModalPesquisa(): void {
    this.modalPesquisaAberto = false;
  }

  pesquisarModal(): void {
    if (this.pesquisa.id) {
      const idNum = Number(this.pesquisa.id);
      this.pessoaService.pesquisarPorId(idNum).subscribe({
        next: (res) => {
          this.pessoa = res;
          this.mensagem = 'Pessoa encontrada por ID.';
          this.sucesso = true;
          this.fecharModalPesquisa();
        },
        error: (err) => {
          console.error('Erro ao pesquisar por ID:', err);
          this.mensagem =
            err.status === 404
              ? 'Pessoa não encontrada pelo ID.'
              : 'Erro ao pesquisar pessoa por ID.';
          this.sucesso = false;
        },
      });
    } else if (this.pesquisa.cpf) {
      this.pessoaService.pesquisarPorCpf(this.pesquisa.cpf).subscribe({
        next: (res) => {
          this.pessoa = res;
          this.mensagem = 'Pessoa encontrada por CPF.';
          this.sucesso = true;
          this.fecharModalPesquisa();
        },
        error: (err) => {
          console.error('Erro ao pesquisar por CPF:', err);
          this.mensagem =
            err.status === 404
              ? 'Pessoa não encontrada pelo CPF.'
              : 'Erro ao pesquisar pessoa por CPF.';
          this.sucesso = false;
        },
      });
    } else {
      alert('Informe o ID ou o CPF para pesquisa.');
    }
  }

  pesquisar(): void {
    alert('Use o modal de pesquisa (botão Pesquisar Modal).');
  }

  calcularPesoIdeal(): void {
    if (this.pessoa.id) {
      this.pessoaService.calcularPesoIdeal(this.pessoa.id).subscribe({
        next: (res) => {
          this.mensagem = 'Peso Ideal: ' + res.peso_ideal;
          this.sucesso = true;
        },
        error: (err) => {
          console.error('Erro ao calcular peso ideal:', err);
          if (err.status === 404) {
            this.mensagem =
              'Não foi possível calcular o peso ideal. Pessoa não encontrada.';
          } else {
            this.mensagem = 'Erro ao calcular o peso ideal.';
          }
          this.sucesso = false;
        },
      });
    } else {
      this.mensagem =
        'Pesquise uma pessoa primeiro para calcular o peso ideal.';
      this.sucesso = false;
    }
  }
}
