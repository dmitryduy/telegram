import React from "react";

import Button from "./Button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import noop from "../../helpers/noop";
import { MockStore } from "./mockRedux";
import { themeColor } from "../../globalTypes";

const colors = ['#40a7e3', '#45bce7', '#52b440', '#d46c99', '#df8a49', '#9978c8', '#c55245', '#687b98', '#dea922'] as themeColor[];

export default {
    title: 'Button',
    component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = () => <Button onClick={noop}>Click</Button>;

export const Default = Template.bind({});

Default.decorators = [
    (Story) => (
        <>
            {colors.map(color => (
                <MockStore key={color} initialState={{themeColor: color}}>
                    <Story/>
                </MockStore>))}
        </>
    )
];
