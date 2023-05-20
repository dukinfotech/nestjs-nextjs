import { Controller, Get } from '@nestjs/common';
import { EnvService } from './config/enviroments/env.service';

@Controller()
export class AppController {
  constructor(private envService: EnvService) {}

  @Get()
  getHello(): string {
    return 'Enviroment: ' + this.envService.appEnv;
  }
}
