import joinStringList from '.'

describe('joinStringList', () => {
  it.each([
    [undefined, 'foo, bar and baz'],
    [0, '3'],
    [1, 'foo and 2 others'],
    [2, 'foo, bar and 1 other'],
    [3, 'foo, bar and baz'],
    [4, 'foo, bar and baz'],
  ])('renders correctly when limit is %p', (limit, expected) => {
    const output = joinStringList(['foo', 'bar', 'baz'], limit)

    expect(output).toBe(expected)
  })
})
