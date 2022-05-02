import { TestBed } from '@angular/core/testing';

import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';

describe('WebSocketService', () => {
  let webSocketService: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    webSocketService = TestBed.inject(WebSocketService);
  });

  describe('emit', () => {
    it('should be created', () => {
      spyOn(webSocketService.socket, 'emit');

      webSocketService.emit('testEvent', {});

      expect(webSocketService.socket.emit).toHaveBeenCalledWith('testEvent', {});
    });
  });
});
