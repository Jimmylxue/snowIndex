import { memo } from 'react'

export default memo(() => {
	return (
		<div className="my-1">
			<div>
				关于本站：SnowIndex 极客范儿的浏览器主页（reference from coder_yupi
				<a className=" text-blue-500 ml-1" href="https://www.yuindex.com/#/">
					[YuIndex]
				</a>
				）
			</div>
			<a
				className=" text-blue-500"
				href="https://github.com/Jimmylxue/snowIndex"
			>
				代码开源，欢迎 star 和贡献~
			</a>
			<div>
				作者：
				<a className=" text-blue-500 ml-1" href="https://github.com/Jimmylxue">
					Jimmy
				</a>
			</div>
			<div>F&Q：</div>
			<div>someone：为啥还搞这个？花里胡哨，没什么用！🤷🏻‍♀️🤷🏻‍♀️🤷🏻‍♀️</div>
			<div>
				answer：我觉得有用啊！就像鱼皮说的将大而全的功能继承到这个小而美的界面中，很酷！😎😎😎
			</div>
		</div>
	)
})
