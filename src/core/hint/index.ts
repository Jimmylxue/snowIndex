import { searchCommand } from '@/core/execute/search/search';
import { baiduCommand } from '@/core/execute/search/baidu';
import { googleCommand } from '@/core/execute/search/google';
import { githubCommand } from '@/core/execute/search/github';
import { juejinCommand } from '@/core/execute/search/juejin';
import { zhihuCommand } from '@/core/execute/search/zhihu';
import { biliCommand } from '@/core/execute/search/bilibili';
import { bgCommand } from '@/core/execute/tool/bg';
import { helpCommand } from '@/core/execute/system/help';
import { resetCommand } from '@/core/execute/system/reset';
import { infoCommand } from '@/core/execute/system/info';
import { clearCommand } from '@/core/execute/system/clear';
import { authorShowCommand } from '@/core/execute/system/authorShow';
import { welcomeCommand } from '@/core/execute/system/welcome';
import { weatherCommand } from '@/core/execute/tool/weather';
import { wangYiYunCommand } from '@/core/execute/search/wangyiyun';
import { historyCommand } from '@/core/execute/system/history';
import { bingBgCommand } from '@/core/execute/tool/bingBg';
import { dateCommand } from '@/core/execute/system/date';
import { gotoCommand } from '@/core/execute/search/goto';
import { hintShowCommand } from '@/core/execute/system/hintShow';
import { hostnameCommand } from '@/core/execute/system/hostname';
import { fanyiCommand } from '@/core/execute/tool/fanyi';
import { shortcutCommand } from '@/core/execute/system/shortCut';
import { timeCommand, timeShowCommand } from '@/core/execute/system/time';
import { varbookCommand } from '@/core/execute/tool/varbook';
import { pingCommand } from '@/core/execute/tool/ping';
import { npmCommand } from '@/core/execute/search/npm';
import { jumpCommand } from '@/core/execute/tool/jump';
import { chatroomCommand } from '../execute/system/chatroom';
import { bgAutoCommand } from '../execute/tool/bgAuto';
import { gameCommand } from '@/core/execute/system/game';
import { todoListCommand } from '@/core/execute/tool/todoList';
import { errorCommand } from '../execute/system/error';

export type TSystemCommandType = {
  start: string;
  hint: string;
  desc: string;
  shortStart?: string[];
  params: {
    key: string;
    desc: string;
    isRequire: boolean;
  }[];
  options: {
    key: string;
    desc: string;
    alias: string[];
    isRequire: boolean;
    default: false;
  }[];
};

export const commandGroups: {
  type: string;
  name: string;
  commands: any[];
}[] = [
  {
    type: 'SEARCH',
    name: '搜索类',
    commands: [
      searchCommand,
      baiduCommand,
      googleCommand,
      githubCommand,
      juejinCommand,
      zhihuCommand,
      biliCommand,
      wangYiYunCommand,
      npmCommand,
      gotoCommand,
    ],
  },
  {
    type: 'TOOLS',
    name: '工具类',
    commands: [
      fanyiCommand,
      jumpCommand,
      weatherCommand,
      pingCommand,
      varbookCommand,
    ],
  },
  {
    type: 'SYSTEM',
    name: '系统类',
    commands: [
      dateCommand,
      infoCommand,
      shortcutCommand,
      helpCommand,
      clearCommand,
      resetCommand,
      historyCommand,
    ],
  },
  {
    type: 'STYLE',
    name: '风格类',
    commands: [
      hostnameCommand,
      welcomeCommand,
      authorShowCommand,
      timeCommand,
      timeShowCommand,
      hintShowCommand,
      bgCommand,
      bingBgCommand,
      bgAutoCommand,
    ],
  },
  {
    type: 'ENTERTAINMENT',
    name: '娱乐类',
    commands: [gameCommand],
  },
];

export const commandList = commandGroups.reduce(
  (all, item) => all.concat(...(item.commands || [])),
  [],
) as TSystemCommandType[];
