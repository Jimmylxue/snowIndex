export enum LanguageShort {
  'auto' = '自动检测',
  'yue' = '粤语',
  'kor' = '韩语',
  'th' = '泰语',
  'pt' = '葡萄牙语',
  'el' = '希腊语',
  'bul' = '保加利亚语',
  'fin' = '芬兰语',
  'slo' = '斯洛文尼亚语',
  'cht' = '繁体中文',
  'zh' = '中文',
  'wyw' = '文言文',
  'fra' = '法语',
  'ara' = '阿拉伯语',
  'de' = '德语',
  'en' = '英语',
  'jp' = '日语',
  'ru' = '俄罗斯语',
}

export const languageMap = {
  auto: '自动检测',
  yue: '粤语',
  kor: '韩语',
  th: '泰语',
  pt: '葡萄牙语',
  el: '希腊语',
  bul: '保加利亚语',
  fin: '芬兰语',
  slo: '斯洛文尼亚语',
  cht: '繁体中文',
  zh: '中文',
  wyw: '文言文',
  fra: '法语',
  ara: '阿拉伯语',
  de: '德语',
  en: '英语',
  jp: '日语',
  ru: '俄罗斯语',
};

export type TShortEn = keyof typeof LanguageShort;

export type TBaiduFanyi = {
  code: number;
  result: {
    from: TShortEn;
    to: TShortEn;
    trans_result: [
      {
        src: 'string';
        dst: 'string';
      },
    ];
    // 失败
    message: string;
    result: {
      error_code: string;
      error_msg: string;
    };
  };
};

export type TRequestParams = {
  q: string;
  from: TShortEn;
  to: TShortEn;
};
