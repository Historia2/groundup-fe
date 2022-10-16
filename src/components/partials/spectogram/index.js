
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram';
import colorMap from './colormap.json';
// import axios from "axios";

// Init & load

const Spectrogram = ({id, spectrogramId, sounds}) => {
  
  const wavesurfer = useRef();
  
  function initAndLoadSpectrogram(colorMap) {

    // Create an instance
    wavesurfer.current = WaveSurfer.create({
      container: `#${id}`,
      waveColor: 'rgb(3 105 161)',
      progressColor: 'purple',
      loaderColor: 'purple',
      backend: 'MediaElement',
      mediaControls: true,
      xhr: {  
        method: 'GET',
        headers: [ { key: 'Access-Control-Allow-Origin', value: '*' } ]
      }
    });
    wavesurfer.current.load(sounds);
    wavesurfer.current.on('error', function(e) {
      console.log(e, 'error load');
    })
  }
  useEffect(() => {
    initAndLoadSpectrogram(colorMap);

    wavesurfer.current.addPlugin(SpectrogramPlugin.create({
      wavesurfer: wavesurfer.current,
      container: `#${spectrogramId}`,
      labels: true,
      colorMap: colorMap,
      height: 256,
      frequencyMax: 8000
    })).initPlugin('spectrogram');
    return () => {
      // prevent duplicated initialization
      wavesurfer.current.destroy();
    }
  },[wavesurfer, spectrogramId])

  return (
    <>
      <div className="spectrogram" id={id}></div>
      <div id={spectrogramId}></div>
    </>
  )
}

export default Spectrogram