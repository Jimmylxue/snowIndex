import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCounter } from '../useCounter';

const UseCounterTest = () => {
  const [counter, { inc, set, dec, reset }] = useCounter(0);
  return (
    <section>
      <div>Counter: {counter}</div>
      <button onClick={() => inc(1)}>inc(1)</button>
      <button onClick={() => dec(1)}>dec(1)</button>
      <button onClick={() => set(10)}>set(10)</button>
      <button onClick={reset}>reset</button>
    </section>
  );
};

describe('>>> useCounter', () => {
  it('可以做加法', async () => {
    render(<UseCounterTest />);
    const incBtn = screen.getByText('inc(1)');
    await userEvent.click(incBtn);
    expect(screen.getByText('Counter: 1')).toBeDefined();
  });

  it('可以做减法', async () => {
    render(<UseCounterTest />);
    const incBtn = screen.getByText('dec(1)');
    await userEvent.click(incBtn);
    expect(screen.getByText('Counter: -1')).toBeDefined();
  });

  it('可以设置值', async () => {
    render(<UseCounterTest />);
    const setBtn = screen.getByText('set(10)');
    await userEvent.click(setBtn);
    expect(screen.getByText('Counter: 10')).toBeDefined();
  });

  it('可以重置值', async () => {
    render(<UseCounterTest />);
    const incBtn = screen.getByText('inc(1)');
    const resetBtn = screen.getByText('reset');
    await userEvent.click(incBtn);
    await userEvent.click(resetBtn);
    expect(screen.getByText('Counter: 0')).toBeDefined();
  });
});
