import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SessionsComponent } from './pages/sessions/sessions.component';
import { LaboratoriesComponent } from './pages/laboratories/laboratories.component';
import { UsersComponent } from './pages/users/users.component';
import { ResultsComponent } from './pages/results/results.component';
import { LabLayoutComponent } from './pages/laboratories/lab-layout/lab-layout.component';
import { LabInicioComponent } from './pages/laboratories/lab-inicio/lab-inicio.component';
import { LabDesarrolloComponent } from './pages/laboratories/lab-desarrollo/lab-desarrollo.component';
import { LabCierreComponent } from './pages/laboratories/lab-cierre/lab-cierre.component';
import { LabEvaluacionComponent } from './pages/laboratories/lab-evaluacion/lab-evaluacion.component';
import { IntroComponent } from './components/intro/intro.component';
import { reflectionGuard } from './guards/reflection.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'intro', component: IntroComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'sessions', component: SessionsComponent },
      { path: 'laboratories', component: LaboratoriesComponent },
      { 
        path: 'laboratories/:id', 
        component: LabLayoutComponent,
        children: [
          { path: 'inicio', component: LabInicioComponent },
          { path: 'desarrollo', component: LabDesarrolloComponent },
          { path: 'cierre', component: LabCierreComponent },
          { path: 'evaluacion', component: LabEvaluacionComponent, canActivate: [reflectionGuard] },
          { path: '', redirectTo: 'inicio', pathMatch: 'full' }
        ]
      },
      { path: 'users', component: UsersComponent },
      { path: 'results', component: ResultsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
