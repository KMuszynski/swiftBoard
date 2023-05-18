import {Global} from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/avenir/Avenir-Roman.woff2') format('woff2'), url('./fonts/avenir/Avenir-Roman.woff') format('woff');
      }
      @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('./fonts/avenir/Avenir-Light.woff2') format('woff2'), url('./fonts/avenir/Avenir-Light.woff') format('woff');
      }
      @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/avenir/Avenir-Medium.woff2') format('woff2'), url('./fonts/avenir/Avenir-Medium.woff') format('woff');
      }
      @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url('./fonts/avenir/Avenir-Heavy.woff2') format('woff2'), url('./fonts/avenir/Avenir-Heavy.woff') format('woff');
      }
      `}
  />
)

export default Fonts
