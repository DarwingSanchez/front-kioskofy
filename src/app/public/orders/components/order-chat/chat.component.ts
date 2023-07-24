import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { FONT_AWESOME_ICONS } from 'src/app/core/constants/icons';
import { Order } from 'src/app/core/interfaces/order';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { SocketWebService } from 'src/app/core/services/socket-web/socket-web.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {
  public some_html_code: any = '';
  public readonly FONT_AWESOME_ICONS = FONT_AWESOME_ICONS;
  public form: FormGroup = this.formBuilder.group({ message: [''] });
  public empty_state_msg = '¡Nothing to see here, but you can start this conversation now!'
  @Input() user_id!: string;
  @Input() order!: Order | any;
  @Input() chat: any;
  @Input() buyer: any;
  @Input() seller: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private socketWebService: SocketWebService,
    private chatService: ChatService,
  ) {}


  ngOnChanges(): void {
    if(this.chat) setTimeout(() => { this.scrollToBottom() }, 1500); 
    if(this.order._id) {
      try {
        this.cookieService.set('room', this.order._id);
        this.socketWebService.callback.subscribe((message: any) => {
          this.chat.history.push(message);
          this.scrollToBottom();
          this.playSound();
        });
      } catch (error) {
        console.log('--->', error);
      }
    }
  }

  public async sendMessage() {
    const MESSAGE = {
      user: this.user_id,
      message: this.form.value.message,
      createdAt: new Date().toISOString(),
    }
    this.socketWebService.emitEven(MESSAGE);
    this.chat.history.push(MESSAGE);
    this.saveMessage(MESSAGE);
    this.form.reset();
    this.scrollToBottom();
  }

  // Save message into the database
  private async saveMessage(message: any) {
    await lastValueFrom(this.chatService.sendMessage(this.chat._id, message));
  }

  // Get the object with the profile data of the user in the message box
  getUserData(user_id: string) {
    if (this.buyer._id === user_id)
      return this.buyer;
    else if (this.seller._id === user_id)
      return this.seller;
  }

  // Validates if a message date is different than the previous one
  public isDifferentDay(date_start: any, date_end: any): boolean {
    return new Date(date_start).getDay() !== new Date(date_end).getDay();
  }

  // Scroll to the end of the div
  scrollToBottom() {
    const objDiv: HTMLElement | null = document.getElementById('chat-box');
    setTimeout(() => {
      objDiv!.scrollTop = objDiv!.scrollHeight;
    }, 300);
  }

  // Message chat alert
  playSound() {
    const audio = new Audio('./assets/sounds/bell-notification.wav');
    audio.play();
  }
}
