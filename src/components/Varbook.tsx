import { memo, useMemo } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import './cover.css'
import { TVarBookResult } from 'types/TVarbook'

interface DataType {
	key: string
	name: string
	value: string
}

type TProps = {
	book: TVarBookResult
}

export default memo(({ book }: TProps) => {
	const columns: ColumnsType<DataType> = [
		{
			title: '变量命名法',
			dataIndex: 'name',
			key: 'name',
			render: text => <div>{text}</div>,
		},
		{
			title: '变量名',
			dataIndex: 'value',
			key: 'value',
		},
	]

	const data: DataType[] = useMemo(() => {
		const { namedVariables } = book
		const list = [
			{
				key: '1',
				name: '小驼峰',
				value: '',
			},
			{
				key: '2',
				name: '大驼峰',
				value: '',
			},
			{
				key: '3',
				name: '小蛇型',
				value: '',
			},
			{
				key: '4',
				name: '大蛇型',
				value: '',
			},
			{
				key: '5',
				name: '脊柱',
				value: '',
			},
			{
				key: '6',
				name: '注释',
				value: '',
			},
		]

		for (const key in namedVariables) {
			// @ts-ignore
			const value = namedVariables[key]
			switch (key) {
				case 'bigHump':
					list[1].value = value
				case 'bigSnake':
					list[3].value = value
				case 'note':
					list[5].value = value
				case 'smallHump':
					list[0].value = value
				case 'smallSnake':
					list[2].value = value
				case 'spinal':
					list[4].value = value
			}
		}
		return list
	}, [book])
	return (
		<div className="varbook-dz my-2">
			<Table
				columns={columns}
				dataSource={data}
				style={{
					width: 500,
					borderRadius: 10,
				}}
				pagination={false}
			/>
		</div>
	)
})
