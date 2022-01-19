import { ShadeType } from 'src/colorPicker/types'
import getTextColor from '../getTextColor'

const transformShades = (shades: ShadeType[]) => shades.map(shade => ({
	...shade,
	textColor: getTextColor(shade.value)
}))

export default transformShades
