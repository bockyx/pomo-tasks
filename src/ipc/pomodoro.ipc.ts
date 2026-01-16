import { ipcMain, Notification, BrowserWindow } from 'electron';

let registered = false;

export function registerPomodoroIpc(mainWindow: BrowserWindow) {
  if (registered) return;
  registered = true;
  ipcMain.on('pomodoro-done', () => {
    new Notification({
      title: 'Pomodoro completo',
      body: 'Hora de descansar 🍵',
    }).show();

    mainWindow.flashFrame(true);

    mainWindow.webContents.executeJavaScript(`
      new Audio('assets/alarm.mp3').play();
    `);
  });
}
