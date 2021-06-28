import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { messageData } from "../Models/messageData";

@Injectable()
export class MessageBoxService{

    private dataMessage:messageData = new messageData('','')

    private dataSuccessMessage:messageData = new messageData('alert-success','')
    private dataWarningMessage:messageData = new messageData('alert-warning','')
    private dataDangerMessage:messageData = new messageData('alert-danger','')
    private dataInfoMessage:messageData = new messageData('alert-info','')

    MessageToSend$ = new BehaviorSubject<messageData>(this.dataMessage)

    constructor(){}

    sendSuccessMessage(message:string){
        //console.log('send success')
        this.dataSuccessMessage.message = message
        this.MessageToSend$.next(this.dataSuccessMessage)
    }

    sendWarningMessage(message:string){
        //console.log('send warning -> ',message)
        this.dataWarningMessage.message = message
        this.MessageToSend$.next(this.dataWarningMessage)
    }

    sendDangerMessage(message:string){
        //console.log('send danger')
        this.dataDangerMessage.message = message
        this.MessageToSend$.next(this.dataDangerMessage)
    }
    
    sendInfoMessage(message:string){
        //console.log('send info')
        this.dataInfoMessage.message = message
        this.MessageToSend$.next(this.dataInfoMessage)
    }

}