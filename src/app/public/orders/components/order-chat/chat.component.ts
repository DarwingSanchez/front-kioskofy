import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Order } from 'src/app/core/interfaces/order';
import { SocketWebService } from 'src/app/core/services/socket-web/socket-web.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges {
  public some_html_code: any = '';
  @Input() user_id!: string;
  @Input() order!: Order | any;
  @Input() chat: any;

  constructor(
    private cookieService: CookieService,
    private socketWebService: SocketWebService,
  ) {
    // this.user = this.authService.user;
    /** Función para escuchar los mensajes y colocarlos en la caja de mensajes de chat actual */
    socketWebService.callback.subscribe((res) => {
      console.log('****', res);
      
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
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.order._id) {
                  let resp = this.cookieService.set('room', this.order._id);
                  console.log('resp', resp);
                  
      }
  }
}
