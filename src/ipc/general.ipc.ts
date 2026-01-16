import { ipcMain } from 'electron';

let registered = false;

export function registerGeneralIpc() {
  if (registered) return;
  registered = true;
  ipcMain.handle('ping', (_, msg: string) => {
    return `pong: ${msg}`;
  });
}
