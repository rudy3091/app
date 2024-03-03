import { bootstrapCss } from './shared';

bootstrapCss`
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

:root {
  font-family: 'Roboto Mono', system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
}

html, body {
  width: 100%;
  height: 100%;
  background-color: #111;
  color: #e8e8e8;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;
