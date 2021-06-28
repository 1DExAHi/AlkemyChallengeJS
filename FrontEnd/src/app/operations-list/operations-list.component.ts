import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';

import { Operation } from '../Models/operation';

import { OperationsService } from '../Services/Operations.service';
import { UserService } from '../Services/Users.service';

@Component({
  selector: 'operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css']
})
export class OperationsListComponent implements OnInit {

  @Input() canEdit:boolean = false;
 
  public Operations:Array<any> = []
  
  public Categories:Array<any> = []

  private tokenUser:string

  constructor(
    private _OperationsService:OperationsService,
    private formBuilder:FormBuilder,
    private _UserService:UserService
  ){
    
    this.tokenUser = ''

  }

  ngOnInit(): void {

    this.tokenUser = <string>sessionStorage.getItem('token')

    this._OperationsService.OperationsSubject.subscribe(res => {

      //console.log(res)  
      if(<any>res != this._UserService.SESSION_EXPIRED){
        this.Operations = res
      }

    })
    this._OperationsService.CategoriesSubject.subscribe(res => {

      this.Categories = res

    })


  }

  deleteOperation(id:number){

    this._OperationsService.deleteOperation(id,this.tokenUser)

  }
  
  UpdateOperation(editOperation:Operation){
    //console.log(editOperation)

    this._OperationsService.updateOperation(editOperation,this.tokenUser)

    
  }
}
