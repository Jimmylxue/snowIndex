import { memo } from 'react'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import './cover.css'

interface DataType {
	key: string
	name: string
	value: string
}
export default memo(() => {
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

	const data: DataType[] = [
		{
			key: '1',
			name: '小驼峰',
			value: 'Hello',
		},
		{
			key: '2',
			name: '大驼峰',
			value: 'Hello',
		},
		{
			key: '3',
			name: '小蛇型',
			value: 'Hello',
		},
		{
			key: '4',
			name: '大蛇型',
			value: 'Hello',
		},
		{
			key: '5',
			name: '脊柱',
			value: 'Hello',
		},
		{
			key: '6',
			name: '注释',
			value: 'Hello',
		},
	]

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
