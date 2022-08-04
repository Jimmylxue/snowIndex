import {
	Controller,
	Req,
	Get,
	Post,
	Body,
	Query,
	UseGuards,
} from '@nestjs/common'
import { WeatherService } from './weather.service'
// import { BcryptService } from '../auth/auth.service';

@Controller('weather')
export class WeatherController {
	constructor(private readonly weatherService: WeatherService) {}

	// @UseGuards(AuthGuard('jwt'))
	@Get('all-user')
	async getAllUser(@Req() req) {
		let obj: any = {}
		obj.code = 200
		obj.result = await this.weatherService.findAll()
		return obj
	}

	@Post('all-user')
	async getPostUser(@Body() body, @Req() req, @Query() query) {
		console.log(req.query.id)
		console.log(body)
		console.log(query)
		let obj: any = {}
		obj.code = 200
		obj.result = await this.weatherService.findAll()
		return obj
	}
}
