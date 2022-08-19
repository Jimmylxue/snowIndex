import { Injectable } from '@nestjs/common'
@Injectable()
export class ErrorService {
	constructor() {}

	findAll(): any[] {
		return ['111', '222']
	}

	// addUser(params) {
	// 	// this.userRepository.createQueryBuilder().ins
	// 	return this.userRepository.insert(params)
	// }

	// async findUser(phone: string) {
	// 	return await this.userRepository.findOneBy({ phone })
	// }

	// async createToken(user) {
	// 	const payload = { username: user.name, password: user.password }
	// 	//在实际项目中一般要进行数据库验证查看用户用户名密码是否正确
	// 	//const data = await this.userRepository.findOne({username:user.username, password: user.password})
	// 	//if(!data) {
	// 	// return {code: 1 , msg:'登录失败', data: ''}
	// 	//}
	// 	console.log('sadjsad', payload, user)
	// 	console.log(this.jwtService.sign(payload))
	// 	delete user.password
	// 	return {
	// 		msg: '登录成功',
	// 		code: 200,
	// 		result: {
	// 			user: user,
	// 			//得到token
	// 			token: await this.jwtService.sign(payload),
	// 		},
	// 	}
	// }
}
