import { useBrand, useShop } from '@render/auth'
import { Input } from 'antd'
import { observer } from 'mobx-react-lite'
import {
	Keyboard,
	KeyboardProvider,
	useKeyboard,
} from '@render/components/Keyboard'
import { Mask } from '@render/components/Mask'
import { usePrepareGroupCoupon } from '@render/services/groupBuy'
import { GroupActivity } from '@render/services/groupBuy/types'
import { useEffect, useMemo } from 'react'
import { useCheckout } from '@render/context/checkout'
import { toastError } from '@render/utils'
import { useScan } from '@render/hooks/useScan'

type TProps = {
	isOpen: boolean
	onClose(): void
	width?: number
	tickInfo?: GroupActivity
	toUseTick: (tick: GroupActivity, code: string) => void
}

const Child = observer(
	({ isOpen, onClose, width, tickInfo, toUseTick }: TProps) => {
		const brand = useBrand()
		const shop = useShop()
		const brandId = brand?.brandId
		const shopId = shop?.shopId
		const checkout = useCheckout()

		const isQuickCheck = useMemo(() => {
			return !tickInfo // tickInfo 不存在则是快捷验券
		}, [tickInfo])

		const { mutateAsync } = usePrepareGroupCoupon()
		const { inputRef, setValue, value } = useKeyboard()

		const submit = async (code: string) => {
			try {
				let res = await mutateAsync({
					brandId: brandId!,
					shopId: shopId!,
					activityId: tickInfo?.activityId as number,
					platform: tickInfo?.platform,
					orderPrice: tickInfo?.salePrice,
					couponCode: code,
				})
				if (!isQuickCheck) {
					toUseTick(res, code)
					return
				}
				if (
					checkout.groupActivity?.length &&
					checkout.selectPlatform !== res.platform
				) {
					toastError('不支持跨平台的券')
					return
				}
				const res1 = await mutateAsync({
					brandId: brandId!,
					shopId: shopId!,
					activityId: res?.activityId as number,
					platform: res?.platform,
					orderPrice: res?.salePrice,
					couponCode: code,
				})
				toUseTick(res1, code)
			} catch (error: any) {
				toastError(error.msg)
			}
		}

		useEffect(() => {
			setValue('')
		}, [isOpen])

		const { code, clear } = useScan(isOpen)

		useEffect(() => {
			if (code) {
				submit(code)
				clear()
				setTimeout(() => {
					setValue(code)
				})
			}
		}, [code])

		return (
			<Mask
				isOpen={isOpen}
				width={width}
				title="输入团购券码"
				onClose={onClose}
			>
				<div className="flex flex-col items-center">
					<div
						className="my-8"
						style={{
							width: 508,
						}}
					>
						<div className="flex border border-gray-300 pr-1">
							<Input
								ref={inputRef}
								bordered={false}
								value={value}
								placeholder="请输入或扫描识别券码"
								// disabled
								onChange={e => {
									setValue(e.target.value)
								}}
								className="h-10 rounded flex-1 border-0"
							/>
						</div>
					</div>
					<Keyboard
						onSubmit={() => submit(value)}
						onClear={() => {
							console.log('>>>>>')
							setValue('')
						}}
					/>
				</div>
			</Mask>
		)
	}
)

export function ValidateGroup({
	isOpen,
	onClose,
	width,
	tickInfo,
	toUseTick,
}: TProps) {
	return (
		<KeyboardProvider>
			<Child
				isOpen={isOpen}
				onClose={onClose}
				width={width}
				tickInfo={tickInfo}
				toUseTick={toUseTick}
			/>
		</KeyboardProvider>
	)
}
