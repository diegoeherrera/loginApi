import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.createLoginForm()
  }
  ngOnInit(): void {}

  createLoginForm(){
    return this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }



  public processForm(user: User){

    this.loginService.logUser(user).subscribe((resp)=>console.log(resp));

  }

}
