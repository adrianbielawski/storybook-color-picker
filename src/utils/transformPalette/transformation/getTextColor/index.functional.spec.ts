import getTextColor from '.'

describe('getTextColor functional', () => {
  it.each([
    // Greyscale
    ['#000000', '#FFFFFF'],
    ['#AAAAAA', '#FFFFFF'],
    ['#DDDDDD', '#000000'],
    ['#FFFFFF', '#000000'],
    ['rgba(0, 0, 0, .298)', '#000000'],
    ['rgba(0, 0, 0, .299)', '#FFFFFF'],
    // Red
    ['#FF0000', '#FFFFFF'],
    ['#FF8888', '#FFFFFF'],
    ['#FF9999', '#000000'],
    ['rgba(255, 0, 0, .414)', '#000000'],
    ['rgba(255, 0, 0, .415)', '#FFFFFF'],
    // Yellow
    ['#FFFF00', '#000000'],
    ['#FFFF99', '#000000'],
    ['rgba(255, 255, 0, .1)', '#000000'],
    ['rgba(255, 255, 0, 1)', '#000000'],
    // Blue
    ['#0000FF', '#FFFFFF'],
    ['#00BBFF', '#FFFFFF'],
    ['#00CCFF', '#000000'],
    ['#00FFFF', '#000000'],
    ['rgba(0, 0, 255, .329)', '#000000'],
    ['rgba(0, 0, 255, .330)', '#FFFFFF'],
    // Green
    ['#00FF00', '#000000'],
    ['#00CC99', '#000000'],
    ['#00CC88', '#FFFFFF'],
    ['rgba(0, 255, 0, 1)', '#000000'],
    ['rgba(0, 255, 0, .1)', '#000000'],
    // Purple
    ['#FF00FF', '#FFFFFF'],
    ['#FF77FF', '#FFFFFF'],
    ['#FF88FF', '#000000'],
    ['#FF99FF', '#000000'],
    ['rgba(255, 0, 255, .482)', '#000000'],
    ['rgba(255, 0, 255, .483)', '#FFFFFF'],
  ])('returns text color correctly (color = %s)', (color, expected) => {
    const output = getTextColor(color)

    expect(output).toEqual(expected)
  })
})
