import React, { useCallback, useEffect, useRef, useState } from "react";
import { css, jsx } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import List from "./list";
import { useOutsideClick } from "../../utils/useOutsideClick";
import { PaletteObj } from "../types";
/** @jsx jsx */

type Props = {
    palettes: PaletteObj[],
    current: number,
    onChange: (newCurrent: number) => void;
};

const PalettesList = (props: Props) => {
    const [active, setActive] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const colorPicker = document.getElementById('color-picker');

        const handleScroll = () => {
            setActive(false);
        };

        if (colorPicker && active) {
            colorPicker.addEventListener('scroll', handleScroll);
        }

        return () => {
            colorPicker.removeEventListener('scroll', handleScroll);
        }
    }, [active])

    const closeList = useCallback(
        () => {
            setActive(false);
        },
        [],
    )
    
    useOutsideClick(buttonRef, closeList);

    const toggleActive = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setActive(!active);
        },
        [active],
    )

    const handleChange = useCallback(
        (newCurrent: number) => {
            props.onChange(newCurrent);
            closeList();
        },
        [props.onChange],
    )

    return (
        <div
            css={css`
                position: relative;
                margin-bottom: .5em;
                display: inline-block;
            `}
        >
            {props.palettes.length > 1 ? (
                <>
                    <button
                        ref={buttonRef}
                        onClick={toggleActive}
                        css={css`
                            background-color: #fff;
                            border: none;
                            font-size: 1.1em;
                            padding: 0;

                            &:hover {
                                cursor: pointer;
                            }
                        `}
                    >
                        <p
                            css={css`
                                display: inline;
                                margin-right: .5em;
                            `}
                        >{props.palettes[props.current].name}</p>
                        <FontAwesomeIcon icon={faChevronDown} color="#777" />
                    </button>
                    <List
                        palettes={props.palettes}
                        active={active}
                        onChange={handleChange}
                    />
                </>
            ) : (
                <p
                    css={css`
                        display: inline;
                        font-size: 1.1em;
                    `}
                >
                    {props.palettes[0].name}
                </p>
            )}
        </div>
    );
};

export default PalettesList;
