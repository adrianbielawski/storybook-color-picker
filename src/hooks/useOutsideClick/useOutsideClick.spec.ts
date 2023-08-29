import useOutsideClick from './useOutsideClick'
import { fireEvent, act, renderHook } from '@testing-library/react'

const countAddEventListenerCalls = () => {
  const spiedAddEventListener =
    document.addEventListener as any as jest.SpiedFunction<
      typeof document.addEventListener
    >

  spiedAddEventListener.mock.calls = spiedAddEventListener.mock.calls.filter(
    ([fn]) => fn !== 'selectionchange',
  )

  return spiedAddEventListener
}

describe('useOutsideClick', () => {
  let element: HTMLElement
  let callback: () => void

  beforeEach(() => {
    element = document.createElement('div')
    callback = jest.fn()
  })

  it('adds event listener to the document', () => {
    jest.spyOn(document, 'addEventListener')
    const { result } = renderHook(() => useOutsideClick(callback))

    act(() => result.current(element))

    expect(countAddEventListenerCalls()).toBeCalledTimes(1)
    expect(countAddEventListenerCalls()).toHaveBeenCalledWith(
      'click',
      expect.anything(),
    )
  })

  it('removes event listener on cleanup', () => {
    const mockRemoveEventListener = jest.spyOn(document, 'removeEventListener')
    const { result, unmount } = renderHook(() => useOutsideClick(callback))

    act(() => result.current(element))

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledTimes(1)
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'click',
      expect.anything(),
    )
  })

  it('calls callback on click outside', () => {
    const { result } = renderHook(() => useOutsideClick(callback))

    act(() => result.current(element))
    fireEvent.click(document)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(expect.anything())
  })

  it('do NOT calls callback on click inside', () => {
    const { result } = renderHook(() => useOutsideClick(callback))

    act(() => result.current(element))
    fireEvent.click(element)

    expect(callback).toHaveBeenCalledTimes(0)
  })
})
