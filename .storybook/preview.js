import { Emitter } from "../src/helpers/emitter";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../src/Theme";
import '../src/index.css';

window.emitter = new Emitter();

export const decorators = [
  (Story) => (
      <ThemeProvider theme={ lightTheme }>
        <Story/>
      </ThemeProvider>
  )
];


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
