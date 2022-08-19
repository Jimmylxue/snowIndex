import { Module } from '@nestjs/common'
import { ErrorService } from './error.service'
import { ErrorController } from './error.controller'

@Module({
	imports: [],
	providers: [ErrorService],
	controllers: [ErrorController],
	// exports: [TypeOrmModule],
})
export class ErrorModule {}
