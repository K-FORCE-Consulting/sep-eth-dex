import {
  Box,
  Button,
  Flex,
  Text,
  useTooltip,
} from '@pancakeswap/uikit'
import ArrowDownIcon from '@pancakeswap/uikit/src/components/Svg/Icons/ArrowDown'
import ArrowUpIcon from '@pancakeswap/uikit/src/components/Svg/Icons/ArrowUp'
import InfoIcon from '@pancakeswap/uikit/src/components/Svg/Icons/Info'
import { UserMenu, UserMenuDivider, UserMenuItem } from '@pancakeswap/uikit/src/widgets/Menu'
import { ChainId, NATIVE } from '@pancakeswap/sdk'
import { useActiveChainId, useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useHover } from 'hooks/useHover'
import { useNetwork } from 'wagmi'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useMemo } from 'react'
import { chains } from '../utils/wagmi'
import { ChainLogo } from './Logo/ChainLogo'

const NetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()

  return (
    <>
      <Box px="16px" py="8px">
        <Text color="textSubtle">{t('Select a Network')}</Text>
      </Box>
      <UserMenuDivider />
      {chains.map((chain) => (
        <UserMenuItem
          key={chain.id}
          style={{ justifyContent: 'flex-start' }}
          onClick={() => chain.id !== chainId && switchNetwork(chain.id)}
        >
          <ChainLogo chainId={chain.id} />
          <Text color={chain.id === chainId ? 'secondary' : 'text'} bold={chain.id === chainId} pl="12px">
            {chain.name}
          </Text>
        </UserMenuItem>
      ))}
    </>
  )
}

const WrongNetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(
      'The URL you are accessing (Chain id: %chainId%) belongs to %network%; mismatching your wallet’s network. Please switch the network to continue.',
      {
        chainId,
        network: chains.find((c) => c.id === chainId)?.name ?? 'Unknown network',
      },
    ),
    {
      placement: 'auto-start',
      hideTimeout: 0,
    },
  )
  const { chain } = useNetwork()
  const localChainId = useLocalNetworkChain() || ChainId.BSC
  const [, setSessionChainId] = useSessionChainId()

  const localChainName = chains.find((c) => c.id === localChainId)?.name ?? 'BSC'

  const [ref1, isHover] = useHover<HTMLButtonElement>()

  return (
    <>
      <Flex ref={targetRef} alignItems="center" px="16px" py="8px">
        <InfoIcon color="textSubtle" />
        <Text color="textSubtle" pl="6px">
          {t('Please switch network')}
        </Text>
      </Flex>
      {tooltipVisible && tooltip}
      <UserMenuDivider />
      {chain && (
        <UserMenuItem ref={ref1} onClick={() => setSessionChainId(chain.id)} style={{ justifyContent: 'flex-start' }}>
          <ChainLogo chainId={chain.id} />
          <Text color="secondary" bold pl="12px">
            {chain.name}
          </Text>
        </UserMenuItem>
      )}
      <Box px="16px" pt="8px">
        {isHover ? <ArrowUpIcon color="text" /> : <ArrowDownIcon color="text" />}
      </Box>
      <UserMenuItem onClick={() => switchNetwork(localChainId)} style={{ justifyContent: 'flex-start' }}>
        <ChainLogo chainId={localChainId} />
        <Text pl="12px">{localChainName}</Text>
      </UserMenuItem>
      <Button mx="16px" my="8px" scale="sm" onClick={() => switchNetwork(localChainId)}>
        {t('Switch network in wallet')}
      </Button>
    </>
  )
}

export const NetworkSwitcher = () => {
  const { t } = useTranslation()
  const { chainId, isWrongNetwork, isNotMatched } = useActiveChainId()
  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()
  useNetworkConnectorUpdater()

  const foundChain = useMemo(
    () => chains.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )
  const symbol = NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol

  const cannotChangeNetwork = !canSwitch

  if (!chainId || chainId === ChainId.BSC) {
    return null
  }

  return (
    <>
      <UserMenu
        mr="8px"
        variant={isLoading ? 'pending' : isWrongNetwork ? 'danger' : 'default'}
        avatarSrc={
          chainId === 8453
            ? 'https://bridge.base.org/icons/base.svg'
            : `/images/chains/${chainId}.png`
        }
        disabled={cannotChangeNetwork}
        text={
          isLoading ? (
            t('Requesting')
          ) : isWrongNetwork ? (
            t('Network')
          ) : foundChain ? (
            <>
              <Box display={['none', null, null, null, null, 'block']}>{foundChain.name}</Box>
              <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
            </>
          ) : (
            t('Select a Network')
          )
        }
      >
        {() =>
          isNotMatched ? (
            <WrongNetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
          ) : (
            <NetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
          )
        }
      </UserMenu>
    </>
  )
}

