import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import BackButton from "../BackButton/BackButton";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../../Theme";


export default {
    component: BackButton,
    title: 'BackButton',
    argTypes: {
        backEventName: {
            description: 'Название события, которое тригерится при нажатии на кнопку назад',
        }
    }
} as ComponentMeta<typeof BackButton>;

const Template: ComponentStory<typeof BackButton> = (args) => <BackButton {...args}/>;

export const Light = Template.bind({});

Light.args = {
    backEventName: 'test-emit',
};

export const Dark = Template.bind({});

Dark.decorators = [
    (Story) => (
        <ThemeProvider theme={darkTheme}>
            <Story/>
        </ThemeProvider>
    )
];

Dark.args = {...Light.args};