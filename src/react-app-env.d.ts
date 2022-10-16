/// <reference types="react-scripts" />
declare module '*.mp4'
declare module 'styled-components';
declare module 'react-lazy-load-image-component';
declare module 'react-intl-tel-input/*';
declare module 'wavesurfer.js/*';
declare module '*.wav' {
  const src: string;
  export default src;
}