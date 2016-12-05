import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '../shared'; // all services
import { LoginComponent } from './';


@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [ LoginComponent ],
  providers: []
})

export class LoginModule { }
