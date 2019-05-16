import { TelegramAlertService } from './../../services/telegram-alert.service';


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private telegramAlertService: TelegramAlertService) { }

  messageForm: FormGroup;

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  sendMessage() {
    this.telegramAlertService.sandMessage(this.messageForm.value.message);
    this.messageForm.reset();
  }

}
