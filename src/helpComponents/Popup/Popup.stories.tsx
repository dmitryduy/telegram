import React from "react";

import Popup from "./Popup";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MockStore } from "./mockRedux";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../../Theme";
export default {
    title: 'Popup',
    component: Popup,
    argTypes: {
        closeButton: {
            defaultValue: false,
            description: 'Крестик справа в тайтле попапа, при нажатии на которую тригерится событие emitCloseName'
        },
        bottomButton: {
            defaultValue: undefined,
            description: 'Принимает название кнопки в нижней части попапа, при нажатии на которую тригерится событие emitCloseName'
        },
        active: {
            description: 'Булевая переменная, которая говорит об открытии попапа'
        },
        submitButton: {
            defaultValue: undefined,
            description: 'Принимает название кнопки в нижней части попапа, при нажатии на которую вызывается метод onSubmit'
        },
        onSubmit: {
            defaultValue: undefined,
            description: 'Обработчик нажатся на кнопки с именем submitButton'
        },
        emitCloseName: {
            description: 'Имя события, которое будет инициировано при закрытии попапа'
        },
        title: {
            defaultValue: undefined,
            description: 'Заголовок попапа'
        },
        top: {
            defaultValue: 50,
            description: 'Отступ попапа от вержней границы страницы'
        },
        width: {
            defaultValue: 390,
            description: 'Ширина попапа'
        },
        zIndex: {
            description: 'z-index попапа'
        }
    }
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args}></Popup>

export const Empty = Template.bind({});

Empty.args = {
    active: true,
    emitCloseName: 'close'
}


Empty.decorators = [
    (Story) => (
        <MockStore initialState={{themeColor: '#52b440'}}>
            <Story/>
        </MockStore>)
];

export const WithTitle = Template.bind({});

WithTitle.args = {
    title: 'Popup',
    active: true,
    emitCloseName: 'close'
}


WithTitle.decorators = [
    (Story) => (
        <MockStore initialState={{themeColor: '#52b440'}}>
            <Story/>
        </MockStore>)
];

export const WithCloseButton = Template.bind({});

WithCloseButton.args = {
    title: 'Popup',
    active: true,
    emitCloseName: 'close',
    closeButton: true
}


WithCloseButton.decorators = [
    (Story) => (
        <MockStore initialState={{themeColor: '#52b440'}}>
            <Story/>
        </MockStore>)
];

export const WithBottomCloseButton = Template.bind({});

WithBottomCloseButton.args = {
    title: 'Popup',
    active: true,
    emitCloseName: 'close',
    bottomButton: 'close'
}


WithBottomCloseButton.decorators = [
    (Story) => (
        <MockStore initialState={{themeColor: '#52b440'}}>
            <Story/>
        </MockStore>)
];

export const WithSubmitButton = Template.bind({});

WithSubmitButton.args = {
    title: 'Popup',
    active: true,
    emitCloseName: 'close',
    submitButton: 'Submit'
}


WithSubmitButton.decorators = [
    (Story) => (
        <MockStore initialState={{themeColor: '#52b440'}}>
            <Story/>
        </MockStore>)
];

export const FillPopup = Template.bind({});

FillPopup.args = {
    title: 'Popup',
    active: true,
    emitCloseName: 'close',
    submitButton: 'Submit',
    closeButton: true,
    bottomButton: 'Close'
}


FillPopup.decorators = [
    (Story) => (
        <MockStore initialState={{themeColor: '#52b440'}}>
            <Story/>
        </MockStore>)
];

export const DarkFillPopup = Template.bind({});

DarkFillPopup.args = {
    title: 'Popup',
    active: true,
    emitCloseName: 'close',
    submitButton: 'Submit',
    closeButton: true,
    bottomButton: 'Close'
}


DarkFillPopup.decorators = [
    (Story) => (
        <ThemeProvider theme={darkTheme}>
            <MockStore initialState={{themeColor: '#52b440'}}>
                <Story/>
            </MockStore>
        </ThemeProvider>)
];