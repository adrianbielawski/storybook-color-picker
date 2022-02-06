import useOutsideClick from './useOutsideClick'
import { act, renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/react'

describe('useOutsideClick', () => {
  let element: HTMLElement
  let outsideElement: HTMLElement
  let callback: () => void

  beforeEach(() => {
    element = document.createElement('div')
    outsideElement = document.createElement('span')
    callback = jest.fn()
  })

  it('adds event listener to the document', () => {
    const mockAddEventListener = jest.spyOn(document, 'addEventListener')
    const { result } = renderHook(() => useOutsideClick(callback))

    act(() => result.current(element))

    expect(mockAddEventListener).toHaveBeenCalledTimes(1)
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'click',
      expect.anything()
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
      expect.anything()
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
