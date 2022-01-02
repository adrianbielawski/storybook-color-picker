import * as messages from '../../messages'
import validateShade from './'

describe('validateShade', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		global.CSS = {
			supports: jest.fn(),
			escape: jest.fn(),
		}
		jest.spyOn(messages, 'getInvalidShadeMessage')
	})

	it.each([
		['true', 'valid', true, true],
		['undefined', 'invalid and logs warning', false, undefined],
	])('returns %s if color is %s', (desc1, desc2, isValid, expected) => {
		const CSSSupports = global.CSS.supports as jest.Mock
		CSSSupports.mockReturnValue(isValid)

		const output = validateShade('foo', 'bar', 'baz')

		if (!isValid) {
			expect(messages.getInvalidShadeMessage).toHaveBeenCalledTimes(1)
			expect(messages.getInvalidShadeMessage).toHaveBeenCalledWith('foo', 'bar', 'baz')
		} else {
			expect(messages.getInvalidShadeMessage).not.toHaveBeenCalled()
		}

		expect(output).toBe(expected)
	})
})