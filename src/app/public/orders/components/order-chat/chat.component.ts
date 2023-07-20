import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from 'src/app/core/interfaces/order';
import { SocketWebService } from 'src/app/core/services/socket-web/socket-web.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {
  public some_html_code: any = '';
  public icon_send_msg = faPaperPlane;
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
  ) {
    // this.user = this.authService.user;
    /** Función para escuchar los mensajes y colocarlos en la caja de mensajes de chat actual */
    // socketWebService.callback.subscribe((res: any) => {
    //   console.log('****', res);
      
    //   /** Marca el mensaje como leido */
    //   res.leido = true;
    //   /** Añade el mensaje al array de mensajes para guardar en la base */
    //   // this.conversacion.push(res);
    //   /** Si viene una imagen lo formatea para mostrarlo en el DOM */
    //   /** Añade el mensaje al DOM desde el socket */
    //   if (res.mensaje.startsWith('https://feat-resources.s3')) {
    //     this.some_html_code =
    //       this.some_html_code +
    //       `<br><p class="text-center timestamp">${res.tiempo}</p>
    //       <div class="text-left"> <span >  ${res.usuarioNombre}</span><span class="letra-auxiliar"> (${res.tipo}) </span></div>
    //             <div class="d-flex flex-row card card-mensaje">
    //             <div class="text-left card-body mensaje mensaje-dist"><p class="m-0"><img src="${res.mensaje}" style="width: 100%;" alt="imagen mensaje" class="img-mensaje"></p></div></div>`;
    //   } else {
    //     this.some_html_code =
    //       this.some_html_code +
    //       `<br><p class="text-center timestamp">${res.tiempo}</p>
    //       <div class="text-left"> <span >  ${res.usuarioNombre}</span><span class="letra-auxiliar"> (${res.tipo}) </span></div>
    //             <div class="d-flex flex-row card card-mensaje">
    //             <div class="text-left card-body mensaje mensaje-dist"><p class="m-0">${res.mensaje}</p></div></div>`;
    //   }
    //   // this.scrollToBottom();
    //   // this.playSound();
    // });
  }


  ngOnChanges(changes: SimpleChanges): void {
      if(this.order._id) {
        console.log('entra');
        try {
          
          
          let resp = this.cookieService.set('room', this.order._id);
          this.socketWebService.callback.subscribe((res: any) => {
            console.log('****->', res);
          /** Marca el mensaje como leido */
          res.leido = true;
          /** Añade el mensaje al array de mensajes para guardar en la base */
          // this.conversacion.push(res);
          /** Si viene una imagen lo formatea para mostrarlo en el DOM */
          /** Añade el mensaje al DOM desde el socket */
          if (res.mensaje.startsWith('https://feat-resources.s3')) {
            this.some_html_code =
              this.some_html_code +
              `<br><p class="text-center timestamp">${res.tiempo}</p>
              <div class="text-left"> <span >  ${res.usuarioNombre}</span><span class="letra-auxiliar"> (${res.tipo}) </span></div>
                    <div class="d-flex flex-row card card-mensaje">
                    <div class="text-left card-body mensaje mensaje-dist"><p class="m-0"><img src="${res.mensaje}" style="width: 100%;" alt="imagen mensaje" class="img-mensaje"></p></div></div>`;
          } else {
            this.some_html_code =
              this.some_html_code +
              `<br><p class="text-center timestamp">${res.tiempo}</p>
              <div class="text-left"> <span >  ${res.usuarioNombre}</span><span class="letra-auxiliar"> (${res.tipo}) </span></div>
                    <div class="d-flex flex-row card card-mensaje">
                    <div class="text-left card-body mensaje mensaje-dist"><p class="m-0">${res.mensaje}</p></div></div>`;
          }
          // this.scrollToBottom();
          // this.playSound();
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
    // this.saveMessage(MESSAGE);
    this.form.reset();
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
}
