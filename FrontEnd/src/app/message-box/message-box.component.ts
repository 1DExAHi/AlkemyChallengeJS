import { Component, OnInit } from '@angular/core';
import { messageData } from '../Models/messageData';
import { MessageBoxService } from '../Services/MessageBox.service';

@Component({
  selector: 'message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  providers: []
})

export class MessageBoxComponent implements OnInit {

  public MessageBox:messageData = new messageData('','')

  constructor(private _messageBoxService:MessageBoxService) { }

  ngOnInit(): void {
    //console.log('init messagebox!!!')
    this._messageBoxService.MessageToSend$.subscribe(rta => {
      //console.log('rta messagebox subscrive',rta)
      //console.log('sending message -> ',rta)
        this.MessageBox = rta
        setTimeout(() => {
          this.MessageBox = new messageData('','')
        }, 3000);
    })
  }

  public sendMessage(Data:messageData){
    //console.log('sending message -> ', Data)
    this.MessageBox = Data
    setTimeout(() => {
      this.MessageBox = new messageData('','')
    }, 3000);
  }

}
