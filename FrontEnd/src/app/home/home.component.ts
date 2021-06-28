import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../Services/Operations.service';
import { UserService } from '../Services/Users.service';
import { Operation } from '../Models/operation';
import { MessageBoxService } from '../Services/MessageBox.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {

  public tokenUser:string = <string>sessionStorage.getItem('token')
 
  public Operations:Array<any> = []
  public TotalBalance:number = 0

  constructor(
    private _UserService:UserService,
    private _OperationsService:OperationsService,
    private _MessageBoxService:MessageBoxService
  ){}

  ngOnInit(): void {

    this._OperationsService.OperationsSubject.subscribe(res => {

      this.Operations = res

    })
    this._OperationsService.TotalAmountSubject.subscribe(res => {
      this.TotalBalance = res
    })

    this.LoadOperations()
    this.LoadBalance()

  }

  LoadOperations(){
    this._OperationsService.getLastOperations(10,this.tokenUser)
  }

  LoadBalance(){
    this._OperationsService.getTotalAmount(this.tokenUser)
  }

}
