import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { MessageBoxService } from 'src/app/Services/MessageBox.service';
import { UserService } from 'src/app/Services/Users.service';

@Component({
  selector: 'login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.css'],
  providers: []
})

export class LoginMainComponent implements OnInit {

  public loginForm:FormGroup
  public registerForm:FormGroup

  public Session:boolean

  constructor(private formBuilder:FormBuilder, private _UserService:UserService, private _messageBoxService:MessageBoxService){

    this.Session = false

    this.loginForm = this.formBuilder.group({
      userName: ['',[Validators.required]],
      pass: ['',[Validators.required]],
    })
    
    this.registerForm = this.formBuilder.group({
      email:['', Validators.required],
      userName: ['',[Validators.required]],
      pass: ['',[Validators.required]],
    })

  }

  ngOnInit(): void {

    //this._messageBoxService.sendSuccessMessage('Init cargado')

    this._UserService.validSession$.subscribe(rta =>{
      //console.log('login form rta: '+rta)
      this.Session = rta
    })

    if(sessionStorage.getItem('token') != null || ''){
      console.log('validando sesion')
      this.validateSession(<string>sessionStorage.getItem('token'))
    }
 
    
    
  }

  tryLogin(){

    this._UserService.Login(this.loginForm.value).subscribe(response=>{
       //console.log(response)
      if(response == 3141){
        this._messageBoxService.sendWarningMessage('Porfavor verifique su correo electronico ')
      }else if(response){
         this._UserService.ValidateLogin()
         sessionStorage.setItem('token', <string>response)
         this._messageBoxService.sendSuccessMessage('Session iniciada')
         this.loginForm.reset()
       }else{
        this._messageBoxService.sendWarningMessage('Error, usuario y/o contraseña invalidos')
       }

    },error => {
      
    })

  }

  tryRegister(){

    this._UserService.Register(this.registerForm.value).subscribe(response=>{
       //console.log(response)
       if(response){
         this._messageBoxService.sendSuccessMessage('Se ha enviado un correo de vericiacion a la direccion especificada')
         this.registerForm.reset()
       }else{
        this._messageBoxService.sendWarningMessage('Error, usuario y/o contraseña invalidos')
       }
    },error => {
      
    })

  }

  validateSession(token:string){

    this._UserService.validateSession(token)

 }

}
