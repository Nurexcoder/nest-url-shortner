import { BrowserType, DeviceType } from './enum';

export type DeviceInfo = {
  os: string;
  browser: string;
  device: string;
};

export type InfoCount = Record<string, number>