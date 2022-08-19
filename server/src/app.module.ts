import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WeatherModule } from './modules/weather/weather.module'
import { ErrorModule } from './modules/error/error.module'
import { NestLogsModule } from 'nest-logs'
@Module({
	imports: [NestLogsModule, WeatherModule, ErrorModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
