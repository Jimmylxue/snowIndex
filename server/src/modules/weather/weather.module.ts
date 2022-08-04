import { Module } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { WeatherController } from './weather.controller'

@Module({
	imports: [],
	providers: [WeatherService],
	controllers: [WeatherController],
	// exports: [TypeOrmModule],
})
export class WeatherModule {}
