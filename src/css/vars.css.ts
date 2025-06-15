import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css'
import deepmerge from 'deepmerge'
import { Mode, tokens } from '../../packages/ui/tokens'
import type { Theme } from '../../packages/ui/css/types'

const getVarName = (_value: string | null, path: string[]) => path.join('-')

const baseTokens: Omit<Theme, 'colors'> = tokens
const baseVars = createGlobalThemeContract(baseTokens, getVarName)
createGlobalTheme(':root', baseVars, baseTokens)

const makeColorScheme = (mode: Mode = 'light') => {
  const colors = tokens.colors[mode]
  return {
    ...baseVars,
    colors: createGlobalThemeContract(colors, getVarName),
  }
}

export const vars = makeColorScheme()
export const lightTheme = createGlobalTheme('.light-theme', vars, {
  ...baseTokens,
  colors: tokens.colors.light,
})

export const darkTheme = createGlobalTheme('.dark-theme', vars, {
  ...baseTokens,  
  colors: tokens.colors.dark,
})
