import { Component, OnInit } from '@angular/core';
import { MessageBoxService } from '../Services/MessageBox.service';
import { UserService } from '../Services/Users.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: []
})
export class MainComponent implements OnInit {

  constructor(private _messageBoxService:MessageBoxService, private _usersService:UserService) {
   }

  ngOnInit(): void {

  }

  sessionDestroy(){
    this._usersService.expiredLogin()
    sessionStorage.removeItem('token')
    this._messageBoxService.sendInfoMessage('Sesion cerrada')
  }

}
