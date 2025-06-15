'use client'

import { usePollBlockNumber } from './block/hooks'
import { usePollCoreFarmData } from './farms/hooks'

const Updaters = () => {
  usePollBlockNumber()
  usePollCoreFarmData()
  return null
}

export default Updaters
