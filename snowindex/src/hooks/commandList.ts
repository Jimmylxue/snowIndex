export const commandList = [
	{
		start: 'search',
		hint: 'search <搜索内容> [-f from] [-s 是否当前页面打开]',
		desc: '在不同的平台快速搜索内容',
		options: [
			{
				key: 'self',
				desc: '是否在当前页面打开',
				alias: ['-s'],
				type: 'boolean',
				default: false,
			},
			{
				key: 'from',
				desc: '搜索的地址',
				type: 'string',
				default: 'baidu',
			},
		],
	},
	{
		start: 'help',
		hint: 'help 命令英文名称',
	},
]
