import React from 'react';
import { render, act } from '@testing-library/react';
import CustomProgress from './CustomProgress';

jest.useFakeTimers();

/**
 * Test suite for the CustomProgress component.
 */
describe('CustomProgress Component', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  /**
   * Test case to verify that onTimeFinish is called when progress reaches 0.
   */
  it('calls onTimeFinish when progress reaches 0', () => {
    const onTimeFinishMock = jest.fn();
    render(<CustomProgress seconds={2} onTimeFinish={onTimeFinishMock} />);

    act(() => {
      jest.runAllTimers(); // Fast forward to the end
    });

    expect(onTimeFinishMock).toHaveBeenCalledTimes(1);
  });

  /**
   * Test case to verify that progress and timer stop when the component is unmounted.
   */
  it('stops progress and timer when unmounted', () => {
    const { unmount } = render(<CustomProgress seconds={5} />);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});
