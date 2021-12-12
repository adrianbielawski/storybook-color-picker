import { transformPalette, findDefaultPaletteIndex } from './utils';

describe('transformPalette', () => {
    const inputAsArray = [{
        label: 'light',
        values: [{
            label: '100',
            value: '#fff',
        }],
    }];

    const inputAsObject = {
        light: {
            100: '#fff',
        },
    };

    const inputAsSimpleObject = {
        white: '#fff',
    };

    const inputAsMixedObject = {
        ...inputAsSimpleObject,
        ...inputAsObject,
    };
    
    const expected = [
        {
            label: 'light',
            values: [{
                label: '100',
                value: '#fff',
            }],
        },
    ];

    const expectedFromSimpleObject = [{
        label: 'white',
        values: [{
            label: 'white',
            value: '#fff',
        }],
    }];

    it.each([
        ['input as array', inputAsArray, expected],
        ['input as object', inputAsObject, expected],
        ['input as simple object', inputAsSimpleObject, expectedFromSimpleObject],
        ['input as mixed object', inputAsMixedObject, [...expectedFromSimpleObject, ...expected]],
    ])('returns transformed palette correctly when %s', (desc, input, expected) => {
        const output = transformPalette(input);

        expect(output).toEqual(expected);
    })
});

describe('findDefaultPaletteIndex', () => {
    const palettes = [
      {
        name: 'palette name',
        palette: { '100': '#fff' },
      },
      {
        name: 'palette',
        palette: { '100': '#000' },
      },
    ]

    it.each([
     ['name is on the list', 'palette name', 0],  
     ['name is on the list', 'palette', 1],  
     ['name is NOT on the list', 'pal', 0],  
    ])('return correct index when %s', (desc, defaultPalette, expected) => {
        const output = findDefaultPaletteIndex(palettes, defaultPalette)
        
        expect(output).toEqual(expected);
    })
})