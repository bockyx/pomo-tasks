export interface ElectronAPI {
  ping: (msg: string) => Promise<string>;
  pomodoroDone: () => void;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}
