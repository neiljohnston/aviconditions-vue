<template>
  <div>
    <div id="viewDiv" ref="mapView"></div>
    <!-- <div id="info" ref="info" class="esri-widget"> -->
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const bcExtent = {
  // autocasts as new Extent()
  xmax: -12177718.03530625,
  xmin: -15988562.517490985,
  ymax: 8894547.02325949,
  ymin: 6096340.291796502,
  spatialReference: {
    // autocasts as new SpatialReference()
    wkid: 102100,
  },
};

const initialCamera = {
  position: {
    x: -117.63062,
    y: 47.69173,
    z: 90000,
  },
  tilt: 75,
};

// let view;

export default {
  name: 'web-map',

  data() {
    return {
      geoJSONLayerURL: '/api/getAvalancheCanada',
      camera: initialCamera,
    };
  },

  mounted() {
    loadModules(
      ['esri/Map',
        // 'esri/layers/ImageryLayer',
        // 'esri/layers/support/RasterFunction',
        // 'esri/views/MapView',
        'esri/views/SceneView',
        // 'esri/layers/FeatureLayer',
        'esri/layers/GeoJSONLayer',
        // 'esri/core/watchUtils',
      ],
      {
        version: '4.18',
        css: true,
      },
    )
      .then(([
        Map,
        // ImageryLayer,
        // RasterFunction,
        SceneView,
        // FeatureLayer,
        GeoJSONLayer,
        // watchUtils
      ]) => {
        /** *********************
         * Create pop-up template
         ************************ */
        const template = {
          title: 'Avalanche Region Info',
          content: `Name {name}<br/>
            Date Issued: {dateIssued}<br/>
            validUntil {validUntil}`,
        };

        /** *********************
         * Create layers
         ************************ */
        const geojsonLayer = new GeoJSONLayer({
          url: '/api/getAvalancheCanada', // this.geoJSONLayerURL,
          copyright: 'Avalanche Canada',
          popupTemplate: template,
          opacity: 1,
          // renderer: this.geoJSONRenderer('btl'),
        });

        const map = new Map({
          basemap: 'topo-vector',
          ground: 'world-elevation', // show elevation
        });

        // eslint-disable-next-line prefer-const, no-unused-vars
        let view = new SceneView({
          container: this.$refs.mapView,
          map,
          camera: this.camera,
        });

        /* ******************************
             Add layers to map
           ****************************** */
        map.add(geojsonLayer, 1);
      });
  },

};
</script>

<style>
#info {
    padding: 1em;
  }
</style>
<style scoped>
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
