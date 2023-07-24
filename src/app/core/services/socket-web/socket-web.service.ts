import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService  extends Socket {
  outEven: EventEmitter<any> = new EventEmitter();
  callback: EventEmitter<any> = new EventEmitter();

  constructor(private _cookieService: CookieService) {
    // Creates the cookie with the room id of the order
    super({
      url: environment.HOST,
      options: {
        query: {
          nameRoom: _cookieService.get('room'),
        },
      },
    });
    this.listen();
  }

  // Listen to the changes emitted via the socket
  listen = () => {
      this.ioSocket.on('event', (res: any) => { this.callback.emit(res) });
  };

  // Emit the event with the information of the message
  emitEven = (payload = {}) => {
    this.ioSocket.emit('event', payload);
  };
}
