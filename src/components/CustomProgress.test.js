import React from 'react';
import { render, act } from '@testing-library/react';
import CustomProgress from './CustomProgress';

jest.useFakeTimers();

describe('CustomProgress Component', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('calls onTimeFinish when progress reaches 0', () => {
    const onTimeFinishMock = jest.fn();
    render(<CustomProgress seconds={2} onTimeFinish={onTimeFinishMock} />);

    act(() => {
      jest.runAllTimers(); // Fast forward to the end
    });

    expect(onTimeFinishMock).toHaveBeenCalledTimes(1);
  });

  it('stops progress and timer when unmounted', () => {
    const { unmount } = render(<CustomProgress seconds={5} />);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});
