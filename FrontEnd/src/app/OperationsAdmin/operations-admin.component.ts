import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';

import { Operation } from '../Models/operation';

import { UserService } from '../Services/Users.service';
import { OperationsService } from '../Services/Operations.service';
import { MessageBoxService } from '../Services/MessageBox.service';

@Component({

  selector: 'app-operations-home',
  templateUrl: './operations-admin.component.html',
  styleUrls: ['./operations-admin.component.css'],
  providers: []
 
})

export class OperationsAdminComponent implements OnInit{
 
  public Categories:Array<any> = []

  public formNewOperation:FormGroup

  public filterTypeOf:string = ''
  public filterCategory:number = 0

  private tokenUser:string

  constructor(
    private _OperationsService:OperationsService,
    private _MessageBoxService:MessageBoxService,
    private formBuilder:FormBuilder
  ){
    
    this.tokenUser = ''

    this.formNewOperation = this.formBuilder.group({
      concept: ['',[Validators.required]],
      amount: [0,[Validators.required]],
      dateOf: ['',[Validators.required]],
      typeOf: ['',[Validators.required]],
      category: [0,[Validators.required]],
    })

  }

  ngOnInit(): void {

    this.tokenUser = <string>sessionStorage.getItem('token')

    this._OperationsService.CategoriesSubject.subscribe(res => {

      this.Categories = res

    })

    this.LoadCategories()
    this.LoadTotalAmout()
    this.LoadOperations()

  }
 
  LoadTotalAmout(){
    
  }

  LoadCategories(){
    this._OperationsService.getAllCategories()
  }

  resetFilters(){
    this.filterCategory = 0
    this.filterTypeOf = ''
  }

  removeFilters(){
    this.filterCategory = 0
    this.filterTypeOf = ''
    this.LoadOperations()
  }

  NewOperation(event: Event){
    //console.log(this.newOperation)
    event.preventDefault()
    if(this.formNewOperation.valid){

      this._OperationsService.createOperation(this.formNewOperation.value,this.tokenUser)

    }
  }
 
  LoadOperations(){
    this._OperationsService.getOperations(this.tokenUser,this.filterCategory,this.filterTypeOf)
  }

}
