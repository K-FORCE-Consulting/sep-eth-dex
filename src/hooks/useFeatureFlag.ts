import { FLAG_FARM } from 'config/flag'
import { Atom, useAtomValue } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const isBrowser = typeof window !== 'undefined'

const storage = isBrowser
  ? createJSONStorage(() => sessionStorage)
  : createJSONStorage(() => ({
      getItem: (key: string) => {
        return null
      },
      setItem: (key: string, value: string) => {},
      removeItem: (key: string) => {},
    }))

export const featureFarmApiAtom = atomWithStorage<typeof FLAG_FARM>(
  'feature-farm-api',
  FLAG_FARM,
  // @ts-ignore - Type mismatch between SSR fallback and browser storage
  storage,
)

featureFarmApiAtom.onMount = (set) => {
  if (typeof window !== 'undefined') {
    const params = new URL(window.location.href).searchParams
    const flag = params.get('use')
    if (flag === 'farmApi') {
      set('api')
    }
  }
}

export function useFeatureFlag<T>(featureAtom: Atom<T>) {
  return useAtomValue(featureAtom)
}