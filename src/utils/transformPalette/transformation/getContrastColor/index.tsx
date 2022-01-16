const getContrastColor = (hex: string) => {
	hex = hex.slice(1)
	
	const r = parseInt(hex.slice(0, 2), 16)
	const	g = parseInt(hex.slice(2, 4), 16)
	const	b = parseInt(hex.slice(4, 6), 16)

	return (r * 0.299 + g * 0.587 + b * 0.114) > 186
		? '#000000'
		: '#FFFFFF'
}

export default getContrastColor