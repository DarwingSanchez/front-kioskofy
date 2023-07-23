import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService  extends Socket {
  outEven: EventEmitter<any> = new EventEmitter();
  /**
   * Variable que escucha el evento
   */
  callback: EventEmitter<any> = new EventEmitter();
  /**
   * Funcion constructor donde crea la cookie con el id de la sala que es el pedido id
   */
  constructor(private cookieService: CookieService) {
    super({
      url: environment.HOST,
      options: {
        query: {
          nameRoom: cookieService.get('room'),
        },
      },
    });
console.log(this);

    this.listen();
  }
  /**
   * Funcion para estar escuchando los eventos emitidos por el server mediante socket
   */
  listen = () => {
    console.log('entra....---');
    
    this.ioSocket.on('evento', (res: any) => {this.callback.emit(res); console.log('`^^^^^', res);
    });
  };
  /**
   * Funcion par emitir un evento con la informacion del chat o mensaje de la interaccion
   */
  emitEven = (payload = {}) => {
    this.ioSocket.emit('evento', payload);
  };
}
