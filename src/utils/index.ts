import dayjs from 'dayjs';

let UID = {
  _nextID: 0,
  get() {
    return this._nextID++;
  },
};

export const uuid = () => UID.get();

export function subStrBetween(str: string, start: string, end: string) {
  const split1 = str.split(start)[1];
  if (!split1) {
    return '';
  }
  const split2 = split1.split(end)[0];
  return split2;
}

export function getToday() {
  return dayjs().format('YYYY-MM-DD');
}

type TWeak = '1' | '2' | '3' | '4' | '5' | '6' | '0';

export function getWeekByDate(date: string): string {
  const week: TWeak = String(dayjs(date).get('day')) as unknown as TWeak;

  const map = {
    '1': '周一',
    '2': '周二',
    '3': '周三',
    '4': '周四',
    '5': '周五',
    '6': '周六',
    '0': '周日',
  };
  return map[week];
}

export function getFullToday() {
  const ymd = dayjs().format('YYYY-MM-DD');
  const week = getWeekByDate(ymd);
  const hms = dayjs().format('HH:mm:ss');
  return `${ymd} ${week} ${hms}`;
}

export function isChinese(str: string) {
  var reg = /^[\u4E00-\u9FA5]+$/;
  if (!reg.test(str)) {
    // alert('不全是中文')
    return false;
  } else {
    // 全是中文
    return true;
  }
}

export function isHelpInstruct(key: string, fullInstruct: string) {
  if (key === fullInstruct.trim()) {
    // 兼容 只输入一个 help 时的 指令
    return false;
  }
  if (
    fullInstruct.split('--')[0].trim() === key &&
    fullInstruct.split('--')[1].trim() === 'help'
  ) {
    return true;
  }
  return false;
}

/**
 * 错误上报，就是将触发错误时的error信息进行上报
 *  其中最核心的应该就是粗无栈，其实我们定位错误时最主要的也就是错误栈
 *  错误对战中包含了大多数调试有关的信息，其中就包括了异常的位置（行号，列号）信息，以及异常信息
 */

type TUploadParams = {
  lineno: number;
  colno: number;
  error: {
    stack: string;
  };
  timeStamp: number;
  message: string;
  filename: string;
};

export const uploadError = ({
  lineno, // 异常行号
  colno, // 异常列号
  error: { stack }, // 错误信息
  timeStamp, // 时间戳
  message, // 错误信息
  filename, // 触发异常的uri
}: TUploadParams) => {
  // 过滤
  const info = {
    lineno,
    colno,
    stack,
    timeStamp,
    message,
    filename,
  };
  /**
   * window.bota(str) 将 str 转换为 base64 编码的字符串
   *  可以通过 window.atob() 方法进行解码
   */
  const str = window.btoa(JSON.stringify(info));
  const host = 'http://localhost:9999/catch/upload';
  new Image().src = `${host}?info=${str}`; // 通过 IMG 是最快的上报和发请求的方式 因为不需要引入第三方的库
};

export function getUUID() {
  return crypto.randomUUID();
}

export function isFunction(fn: any): boolean {
  return typeof fn === 'function';
}
