import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { Operation } from "../Models/operation";
import { MessageBoxService } from "./MessageBox.service";
import { UserService } from "./Users.service";

@Injectable()
export class OperationsService{
    
    

    public url:string = "";
    private headerName:string = 'user-token'

    public Operations:Array<any> = []

    public OperationsSubject = new BehaviorSubject<[]>([])
    public CategoriesSubject = new BehaviorSubject<[]>([])
    public TotalAmountSubject = new BehaviorSubject<number>(0)

    constructor(
        private _http: HttpClient,
        private _MessageBoxService:MessageBoxService,
        private _UserService:UserService
    ){
        this.url = "http://localhost:3700/api"
    }


    getAllCategories(){

        this._http.get(this.url+'/categories/get').subscribe(response => {

            this.CategoriesSubject.next(<any>response)

        }, error => {})

    }

    getLastOperations(count:number,token:string){

        const headers = new HttpHeaders().set(this.headerName,token)

        this._http.get(this.url+'/operations/getLast?limit='+count,{headers:headers}).subscribe(res=>{

            this.OperationsSubject.next(<any>res)

        },err => {



        })

    }

    getOperations(token:string ,category:number = 0, typeOf:string = ''){

        const headers = new HttpHeaders().set(this.headerName,token)

        const QueryToSend = 
            category != 0 && typeOf != '' ?
                '?filterTypeOf='+typeOf+'&filterCategory='+category :
            typeOf != '' ?
                 '?filterTypeOf='+typeOf :
            category != 0 ? 
                '?filterCategory='+category : ''

        this._http.get(this.url+'/operations/get'+QueryToSend,{headers:headers}).subscribe(response=>{

            this.OperationsSubject.next(<any>response)

        },error=>{
            this._MessageBoxService.sendDangerMessage('Erro al cargar las operaciones')
        })

    }

    createOperation(OperationToSave:Operation,token:string){

        this._UserService.validateSession(token)

        let params = JSON.stringify(OperationToSave)
 
        let headers = new HttpHeaders().set('Content-Type','application/json').set('user-token',token)

        this._http.post(this.url+'/operations/create',params,{headers:headers}).subscribe(response => {

            this._MessageBoxService.sendSuccessMessage('Operacion agregada con exito!')
            this.getOperations(token)

        },error => {})
        
    }

    updateOperation(OperationToUpdate:any,token:string){

        this._UserService.validateSession(token)

        let params = JSON.stringify(OperationToUpdate)
 
        let headers = new HttpHeaders().set('Content-Type','application/json').set('user-token',token)

        this._http.put(this.url+'/operations/update/'+OperationToUpdate.id,params,{headers:headers}).subscribe(
        response => {

            this._MessageBoxService.sendSuccessMessage('Editado con exito!')

        },error => {

        })
        
    }

    deleteOperation(id:number,token:string){

        this._UserService.validateSession(token)

        let headers = new HttpHeaders().set('user-token',token)

        this._http.delete(this.url+'/operations/delete/'+id,{headers:headers}).subscribe(res => {

            this._MessageBoxService.sendInfoMessage('Operacion Eliminada')
            this.getOperations(token)

        },err => {


        })


    }

    getTotalAmount(token:string){
        //console.log(usr_id)

        const headers = new HttpHeaders().set('user-token', token)

        this._http.get(this.url+'/operations/totalamount',{headers:headers}).subscribe(res => {
            this.TotalAmountSubject.next(<any>res)
        },err => {

        })
        //const TotalAmountEgress = this._http.get(this.url+'/api/Operations/getTotalAmountEgress?usr_id='+user)

        //console.log(TotalAmountEntry)
        
    }

}