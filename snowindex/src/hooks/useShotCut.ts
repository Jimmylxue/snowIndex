export function useShotCut() {
	document.onkeydown = (e: KeyboardEvent) => {
		const key = e.key
		console.log('key~')
		/**
		 * todo:
		 *  - 自动聚焦Input
		 *  - 匹配快捷键
		 */
	}
}
