import {
	Controller,
	Req,
	Get,
	Post,
	Body,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ErrorService } from './error.service'
import { NestLogger } from 'nest-logs'
import { Logger } from 'nest-logs'
// import { BcryptService } from '../auth/auth.service';

@NestLogger()
@Controller('error')
export class ErrorController {
	constructor(private readonly weatherService: ErrorService) {}

	// @UseGuards(AuthGuard('jwt'))
	@Get('upload')
	async getAllUser(@Req() req) {
		let obj: any = {}
		obj.code = 200
		obj.result = await this.weatherService.findAll()
		Logger.error('测试代码', obj.result)
		return obj
	}

	@Post('all-user')
	async getPostUser(@Body() body, @Req() req, @Query() query) {
		let obj: any = {}
		obj.code = 200
		obj.result = await this.weatherService.findAll()
		return obj
	}
}
