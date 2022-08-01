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
		start: 'baidu',
		hint: 'baidu <搜索内容> [-s 是否当前页面打开] [-p 是否搜索图片]',
		desc: '百度搜索引擎搜索',
		options: [
			{
				key: 'self',
				desc: '是否在当前页面打开',
				alias: ['-s'],
				type: 'boolean',
				default: false,
			},
			{
				key: 'photo',
				desc: '是否搜索图片',
				alias: ['-p'],
				type: 'boolean',
				default: false,
			},
		],
	},
	{
		start: 'github',
		hint: 'github <搜索内容> [-u 是否搜索作者] [-s 是否当前页面打开]',
		desc: '百度搜索引擎搜索',
		options: [
			{
				key: 'self',
				desc: '是否在当前页面打开',
				alias: ['-s'],
				type: 'boolean',
				default: false,
			},
			{
				key: 'user',
				desc: '是否搜索作者',
				alias: ['-u'],
				type: 'boolean',
				default: false,
			},
		],
	},
	{
		start: 'help',
		hint: 'help 命令英文名称',
	},
]
