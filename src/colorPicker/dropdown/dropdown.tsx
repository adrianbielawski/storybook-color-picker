import React, { ElementType, useCallback, useEffect, useState } from "react";
import { css, jsx } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// Utils
import useOutsideClick from "../../hooks/useOutsideClick";
// Components
import List from "./list";
/** @jsx jsx */

type Props<I> = {
    label: string,
    items: I[],
    itemProps?: Record<string, unknown>
    itemComponent: ElementType<I>;
    closeOnItemClick?: boolean,
    renderList?: '>1' | 'allways',
    onLabelClick?: (active: boolean) => void,
    onItemClick: (item: I, index: number) => void,
};

const Dropdown = (props: Props<any>) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const colorPicker = document.getElementById('color-picker');

        const handleScroll = () => {
            setActive(false);
        };

        if (colorPicker && active) {
            colorPicker.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (colorPicker) {
                colorPicker.removeEventListener('scroll', handleScroll);
            }
        }
    }, [active]);

    const closeList = useCallback(
        () => {
            setActive(false);
        },
        [],
    );

    const wrapperRef = useOutsideClick(closeList);

    const toggleActive = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setActive(!active);
            props.onLabelClick?.(!active)
        },
        [active],
        );

    const handleItemClick = (item: any, index: number) => {
        if (props.closeOnItemClick) {
            closeList();
        }
        props.onItemClick(item, index)
    }

    const renderList = props.renderList === 'allways'
        || (props.renderList === '>1' && props.items.length > 1)

    return (
        <div
            ref={wrapperRef}
            css={css`
                display: inline-block;
            `}
            data-automation="dropdown"
        >
            <button
                data-automation="dropdownButton"
                onClick={toggleActive}
                css={css`
                    background-color: #fff;
                    border: none;
                    font-size: 1.1em;
                    padding: 0;

                    ${renderList && (
                        `&:hover {
                            cursor: pointer;
                        }`
                    )}
                `}
            >
                <p
                    data-automation="dropdownLabel"
                    css={css`
                        display: inline;
                        margin-right: .5em;
                    `}
                >
                    {props.label}
                </p>
                {renderList && (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        color="#777"
                        data-automation="dropdownChevron"
                    />
                )}
            </button>
            {renderList && (
                <List
                    active={active}
                    items={props.items}
                    itemProps={props.itemProps}
                    itemComponent={props.itemComponent}
                    onItemClick={handleItemClick}
                    data-automation="dropdownList"
                />
            )}
        </div>
    );
};

Dropdown.defaultProps = {
    label: null,
    items: null,
    itemComponent: null,
    closeOnItemClick: false,
    renderList: 'allways',
    onLabelClick: () => { },
    onItemClick: () => { },
}

export default Dropdown;