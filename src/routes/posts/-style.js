import { css } from '../../../styled-system/css'

export const page = css({ width: 'min(760px, calc(100% - 40px))', mx: 'auto', my: { base: '10', md: '16' } })
export const panel = css({ p: { base: '5', md: '7' }, mt: '6', mb: '8', borderWidth: '1px', borderColor: 'gray.200', borderRadius: 'md', bg: 'white' })
export const field = css({ display: 'block', width: 'full', px: '3', py: '2', borderWidth: '1px', borderColor: 'gray.300', borderRadius: 'md', bg: 'white', _focusVisible: { outlineWidth: '2px', outlineColor: 'gray.700', outlineOffset: '2px' } })
export const button = css({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', px: '4', py: '2', borderWidth: '1px', borderColor: 'gray.300', borderRadius: 'md', bg: 'white', color: 'gray.900', cursor: 'pointer', fontSize: 'sm', fontWeight: 'medium', _disabled: { opacity: 0.5, cursor: 'not-allowed' }, _hover: { bg: 'gray.50' }, _focusVisible: { outlineWidth: '2px', outlineColor: 'gray.700', outlineOffset: '2px' } })
export const primaryButton = css({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', px: '4', py: '2', borderRadius: 'md', bg: 'gray.900', color: 'white', cursor: 'pointer', fontSize: 'sm', fontWeight: 'medium', _disabled: { opacity: 0.5, cursor: 'not-allowed' }, _hover: { bg: 'gray.700' }, _focusVisible: { outlineWidth: '2px', outlineColor: 'gray.700', outlineOffset: '2px' } })
export const actions = css({ display: 'flex', flexWrap: 'wrap', gap: '2', mt: '5' })
export const muted = css({ color: 'gray.500', fontSize: 'sm' })
export const alert = css({ color: 'red.700', my: '3' })
