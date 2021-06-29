import React, { useCallback } from "react";
import { css, jsx } from '@emotion/react';
import AnimateHeight from 'react-animate-height';
import { PaletteObj } from "../types";
/** @jsx jsx */

type Props = {
    palettes: PaletteObj[],
    active: boolean,
    onChange: (newCurrent: number) => void;
};

const PalettesList = (props: Props) => {
    const getList = () => props.palettes.map((palette, i) => {
        const handleChange = useCallback(
            () => {
                props.onChange(i);
            },
            [],
        );

        return (
            <button
                key={i}
                onClick={handleChange}
                css={css`
                    background-color: #fff;
                    padding: .25em 1em 0 1em;
                    margin-bottom: .25em;
                    border: none;
                    width: 100%;
                    font-size: 1.1em;
                    display: block;

                    &:hover {
                        cursor: pointer;
                        background-color: #f5f5f5;
                        
                        p {
                            transform: scale(1.05);
                            border-bottom: 1px solid #f5f5f5;
                        }
                    }
                `}
            >
                <p
                    css={css`
                        margin: 0;
                        transition: transform .25s;
                        border-bottom: 1px solid #eee;
                    `}
                >
                    {palette.name || `Palette No${i + 1}`}
                </p>
            </button>
        )
    });

    return (
        <div
            css={css`
                position: fixed;
                left: .5em;
                z-index: 1;
            `}
        >
            <AnimateHeight height={props.active ? 'auto' : 0}>
                <div
                    css={css`
                        box-shadow: 0px 0px 4px 1px #eee;
                        background: #fff;
                        border-radius: .5em;
                        margin: .25em;
                        max-height: 200px;
                        overflow-y: auto;
                        &::-webkit-scrollbar {
                            width: .5em;
                            height: .5em;
                        }
                        &::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        &::-webkit-scrollbar-thumb {
                            background: #ccc;
                            border-radius: .25em;
                            &:hover {
                                background-color: #666;
                            }
                        }
                    `}
                >
                    {getList()}
                </div>
            </AnimateHeight>
        </div>
    );
};

export default PalettesList;
