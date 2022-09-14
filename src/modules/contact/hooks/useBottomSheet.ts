import BottomSheet from '@gorhom/bottom-sheet'
import {useCallback, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectBottomSheetIsExpanded, setBottomSheetIsExpanded} from '@/store'

export const useBottomSheet = () => {
  const dispatch = useDispatch()
  const isExpanded = useSelector(selectBottomSheetIsExpanded)
  const ref = useRef<BottomSheet>(null)

  const expand = useCallback(() => {
    ref.current?.expand()
  }, [])

  const close = useCallback(() => {
    ref.current?.close()
  }, [])

  useEffect(() => {
    isExpanded ? expand() : close()
  }, [close, expand, isExpanded])

  const onChange = useCallback(
    (snapPointIndex: number) => {
      const newIsExpanded = snapPointIndex !== -1

      if (isExpanded !== newIsExpanded) {
        dispatch(setBottomSheetIsExpanded(newIsExpanded))
      }
    },
    [dispatch, isExpanded],
  )

  return {
    onChange,
    ref,
  }
}
