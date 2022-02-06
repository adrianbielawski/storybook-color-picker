import { useEffect, useCallback, useState } from 'react'

const useOutsideClick = (callback: Function) => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const elementRef = useCallback(setElement, [])

  useEffect(() => {
    if (!element) {
      return
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (element && !element.contains(e.target as Node)) {
        callback(e)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [element, callback])

  return elementRef
}

export default useOutsideClick
