import { Routes } from '@angular/router';
import { RegistrationPageComponent } from '../pages/registration-page/registration-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'register', component: RegistrationPageComponent },
    { path: 'login', component: LoginPageComponent },
];
