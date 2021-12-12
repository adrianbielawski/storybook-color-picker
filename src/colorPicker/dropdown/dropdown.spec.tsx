import React from 'react';
import Dropdown from './dropdown';
import { automation } from '../../utils/testsUtils';
import { shallow } from 'enzyme';

const Item = (props: { item: string, index: number }) => <div>{props.item}</div>;

describe('Dropdown', () => {
    const label = 'Label';
    const e = { preventDefault: jest.fn() };
    
    let onLabelClick: (active: boolean) => void;
    let onItemClick: (item: string, index: number) => void;

    beforeEach(() => {
        onLabelClick = jest.fn();
        onItemClick = jest.fn();
    })

    it.each([
        ["has only one item and renderList === undefined", undefined, ['first'], true, true],
        ["has only one item and renderList === '>1'", '>1', ['first'], false, false],
        ["has only one item and renderList === 'allways'", 'allways', ['first'], true, true],
        ["has more than one item and renderList === undefined", undefined, ['first', 'second'], true, true],
        ["has more than one item and renderList === '>1'", '>1', ['first', 'second'], true, true],
        ["has more than one item and renderList === 'allways'", 'allways', ['first', 'second'], true, true],
    ])('renders correctly when %s', (desc, renderList, items, expectedList, expectedChevron) => {
        const dropdownComponent = (
            <Dropdown
                label={label}
                items={items}
                renderList={renderList as '>1' | 'allways'}
                itemComponent={Item}
                onItemClick={onItemClick}
            />
        );
        const wrapper = shallow(dropdownComponent);

        const dropdown = wrapper.find(automation('dropdown'));
        const dropdownLabel = dropdown.find(automation('dropdownLabel'));
        const dropdownChevron = dropdown.find(automation('dropdownChevron'));
        const dropdownList = dropdown.find(automation('dropdownList'));

        expect(dropdownLabel.children().contains(label)).toBe(true);
        expect(dropdownChevron.exists()).toBe(expectedChevron);
        expect(dropdownList.exists()).toBe(expectedList);
    });

    it.each([
        ['', 'defined', true, 1],
        ['do NOT', 'undefined', false, 0]
    ])('%s calls onLabelClick when onLabelClick is %s', (desc1, desc2, isCallbackDefined, expectedCallsQty) => {
        const dropdownComponent = (
            <Dropdown
                label={label}
                items={['item']}
                itemComponent={Item}
                onLabelClick={isCallbackDefined ? onLabelClick : undefined}
                onItemClick={onItemClick}
            />
        );
        const wrapper = shallow(dropdownComponent);

        const dropdown = wrapper.find(automation('dropdown'));
        const dropdownButton = dropdown.find(automation('dropdownButton'));
        const dropdownChevron = dropdown.find(automation('dropdownChevron'));
        const dropdownList = dropdown.find(automation('dropdownList'));

        dropdownButton.simulate('click', e);

        expect(onLabelClick).toHaveBeenCalledTimes(expectedCallsQty);
        if (isCallbackDefined) {
            expect(onLabelClick).toHaveBeenCalledWith(true);
        } else {
            expect(onLabelClick).not.toHaveBeenCalled();
        }
        expect(dropdownChevron.exists()).toBe(true);
        expect(dropdownList.exists()).toBe(true);
    });
});