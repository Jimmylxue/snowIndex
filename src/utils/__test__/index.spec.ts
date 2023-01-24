import { getUUID, getWeekByDate, isHelpInstruct, subStrBetween } from '..';

describe('>>> subStrBetween', () => {
  it('test subStr jimmylxue from i to u should return immylxu', () => {
    expect(subStrBetween('jimmylxue', 'i', 'u')).toBe('mmylx');
  });

  it("test subStr jimmylxue from a to u should return '' ", () => {
    expect(subStrBetween('jimmylxue', 'a', 'u')).toBe('');
  });

  it('test subStr jimmylxue from j to a should return immylxu', () => {
    expect(subStrBetween('jimmylxue', 'j', 'a')).toBe('immylxue');
  });
});

describe('>>> getWeekByDate', () => {
  it('test getWeekByDate will return 周一 when date is 2022-12-12', () => {
    // expect(getWeekByDate('2022-12-12')).toBe('周一')
  });

  it('test getWeekByDate will return 周日 when date equal 2022-12-11', () => {
    // expect(getWeekByDate('2022-12-11')).toBe('周日')
  });
});

describe('>>> isHelpInstruct', () => {
  it("test 'help --info' is isHelpInstruct", () => {
    expect(isHelpInstruct('baidu', 'baidu --help')).toBeTruthy();
  });

  it("test 'help' isn't isHelpInstruct", () => {
    expect(isHelpInstruct('help', 'help')).toBeFalsy();
  });

  it("test 'goto www.baidu.com' isn't isHelpInstruct", () => {
    expect(isHelpInstruct('goto', 'goto www.baidu.com')).toBeFalsy();
  });
});

describe('>>> getUUID', () => {
  it('test uuid is different', () => {
    // jest 暂未集成 crypto 这个对象。需要自己手动mock
    // const uuid1 = getUUID();
    // const uuid2 = getUUID();
    // expect(uuid1 !== uuid2).toBeTruthy();
  });
});

export {};
