export function Layout() {
  const size = new Array(16).fill('');

  return (
    <div id='app' className='relative'>
      {/* row */}
      {size.map((_, index) => (
        <div
          className='row absolute bg-gray-300'
          key={index}
          style={{
            width: 750,
            height: 1,
            top: (750 / 15) * index,
          }}></div>
      ))}

      {/* col */}
      {size.map((_, index) => (
        <div
          className='col absolute bg-gray-300'
          key={index}
          style={{
            width: 1,
            height: 750,
            left: (750 / 15) * index,
          }}></div>
      ))}
    </div>
  );
}
