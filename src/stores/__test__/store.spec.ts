import { parseStoreParams } from '../system';

const initState = {
  background: {
    background: '',
  },
  baseConfig: {
    hintShow: true,
    hostname: 'local',
    is996: true,
    jumpList: [],
    salary: 2000,
    timeShow: true,
    workingHour: ['09:00:00', '18:00:00'],
  },
  welcome: {
    authorShow: true,
    welcomeText: 'hello world',
  },
};

describe('>>> parseStoreParams', () => {
  it('base use', () => {
    const params = {
      hintShow: false,
      is996: false,
      salary: 1800,
      timeShow: false,
      welcomeText: 'jimmy',
      workingHour: ['09:30:00', '18:30:00'],
    };
    expect(parseStoreParams(initState, params)).toEqual({
      background: {
        background: '',
      },
      baseConfig: {
        hintShow: false,
        hostname: 'local',
        is996: false,
        jumpList: [],
        salary: 1800,
        timeShow: false,
        workingHour: ['09:30:00', '18:30:00'],
      },
      welcome: {
        authorShow: true,
        welcomeText: 'jimmy',
      },
    });
  });
});

export {};
