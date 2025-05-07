import { commandList } from '@/core/hint';
import { languageMap } from '@/types/TBaiduFanyi';

function FanyiList() {
  return (
    <>
      <div className='my-2'>支持语言列表:</div>
      <div>
        {Object.entries(languageMap).map((value, index) => (
          <div className=' flex' key={index}>
            <div>{value[0]}</div>
            <div className=' mx-2'> {'=>'} </div>
            <div>{value[1]}</div>
          </div>
        ))}
        ...
      </div>
      <div className='mt-2'>
        更多语种列表请查询百度翻译API：
        <a className='text-blue-500' href='https://fanyi-api.baidu.com/doc/21'>
          传送门
        </a>
      </div>
    </>
  );
}

type THelpProps = {
  helpKey: string;
};

export function HelpInstructNode({ helpKey }: THelpProps) {
  const command = commandList.find((str) => str.start === helpKey);

  return (
    <div>
      <div className=' mt-1'>⭐️ {command?.start}帮助：</div>
      <div className='text-gray-400'>basic usage: {command?.hint}</div>
      {!!command?.shortStart?.length && (
        <div className='my-1'>
          简化指令：
          {command?.shortStart.map((short) => `${short}  `)}
          <div className='text-gray-400 mt-1'>可以使用简化指令替代完整指令</div>
        </div>
      )}

      {!!command?.params?.length && (
        <div>
          <p>参数：</p>
          {command?.params.map((param) => (
            <p className='ml-5 mb-1'>
              ·{param.key} {param.isRequire ? '必填' : '非必填'} {param.desc}
            </p>
          ))}
        </div>
      )}
      {!!command?.options?.length && (
        <div>
          <p>选项：</p>
          {command?.options.map((opt) => (
            <p className='ml-5 mb-1'>
              ·{opt.alias?.join(' ')} --{opt.key} {opt.desc} 默认
            </p>
          ))}
        </div>
      )}
      {!!(command?.start === 'fanyi') && <FanyiList />}
    </div>
  );
}
