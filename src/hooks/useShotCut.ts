import { TSnowTerminal } from '@/types/TSnowTerminal';
import { shortcutList } from './const';

export function useShotCut(terminal: TSnowTerminal, enable: boolean) {
  document.onkeydown = (e: KeyboardEvent) => {
    // e.preventDefault()
    const key = e.key;
    /**
     * todo:
     *  - 自动聚焦Input
     *  - 匹配快捷键
     */
    // 自动聚焦输入框
    if (key >= 'a' && key <= 'z' && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
      if (enable) {
        terminal.focusInput();
      }
      return;
    }

    let code = e.code;

    for (const shortcut of shortcutList) {
      if (
        code === shortcut.code &&
        e.ctrlKey == !!shortcut.ctrlKey &&
        e.metaKey == !!shortcut.metaKey &&
        e.shiftKey == !!shortcut.shiftKey
      ) {
        // shortcut?.action(e)!
        shortcut?.action(e, terminal);
      }
    }
  };
}
