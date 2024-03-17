import { BadRequestException, Injectable } from '@nestjs/common';
import * as DeviceDetector from 'device-detector-js';

@Injectable()
export class DeviceInfoService {
private deviceDetector
  constructor() {
    // this.deviceDetector = 
  }

  getDeviceInformation(userAgent: string) {
    try {
        console.log(userAgent)
        const deviceDetector = new DeviceDetector({});
        return deviceDetector.parse(userAgent);
    } catch (error) {
        console.log(error)
        throw new BadRequestException()
    }
  }
}