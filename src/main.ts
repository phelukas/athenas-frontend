import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PessoaComponent } from './app/pessoa/pessoa.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'pessoa', pathMatch: 'full' },
      { path: 'pessoa', component: PessoaComponent },
    ]),
  ],
}).catch((err) => console.error(err));
