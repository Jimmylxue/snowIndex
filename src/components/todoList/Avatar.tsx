export function Avatar() {
  return (
    <div
      className=' overflow-hidden rounded-full'
      style={{
        width: 30,
        height: 30,
      }}>
      <img
        src='https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220326203849385.png'
        alt=''
        className=' w-full h-full'
      />
    </div>
  );
}
