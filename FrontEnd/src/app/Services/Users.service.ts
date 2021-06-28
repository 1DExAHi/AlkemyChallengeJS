import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable , Subject } from "rxjs";
import { MessageBoxService } from "./MessageBox.service";

@Injectable()
export class UserService{

    public SESSION_EXPIRED = 3312
    public ERROR_USER_DATA = 1111

    private URL: string

    validSession$ = new BehaviorSubject<boolean>(false)

    public validSession:boolean

    constructor(private _http: HttpClient, private _MessageBoxService:MessageBoxService){
        this.URL = "http://localhost:3700/api"

        this.validSession = false
    }

    Register(newUserData:FormGroup){

        let params = JSON.stringify(newUserData)
 
        let headers = new HttpHeaders().set('Content-Type','application/json')

        return this._http.post(this.URL+'/users/create',params,{headers:headers})

    }

    Login(userData:FormGroup){
        
        let params = JSON.stringify(userData)
 
        let headers = new HttpHeaders().set('Content-Type','application/json')

        return this._http.post(this.URL+'/users/login',params,{headers:headers})
    
    }

    ValidateLogin(){
        this.validSession$.next(true)
    }

    expiredLogin(){
        this.validSession$.next(false)
    }

    validateSession(token:string){

        const headers = new HttpHeaders().set('user-token',token)

        this._http.get(this.URL+'/validatesession',{headers:headers}).subscribe(res => {
            if(res == this.SESSION_EXPIRED){
                this._MessageBoxService.sendWarningMessage('Su sesion ha expirado!')
                this.expiredLogin()
            }else{
                this.ValidateLogin()
            }
        },err => {

        })

    }

}