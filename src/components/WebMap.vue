<template>
  <div>
    <div id="viewDiv" ref="mapView"></div>
    <div id="info" ref="info" class="esri-widget">
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import Constants from '../js/constants';

// let view;

export default {
  name: 'web-map',

  data() {
    return {
      geoJSONLayerURL: '/api/getAvalancheCanada',
      camera: Constants.initialCamera,
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
        'esri/layers/ElevationLayer',
        'esri/layers/BaseElevationLayer',
        'esri/Basemap',
        'esri/layers/TileLayer',
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
        // watchUtils,
        ElevationLayer,
        BaseElevationLayer,
        Basemap,
        TileLayer,
      ]) => {
        /** *********************
         * Create pop-up template
         ************************ */

        /** *********************
         * Create layers
         ************************ */
        const geojsonLayer = new GeoJSONLayer({
          url: '/api/getAvalancheCanada', // this.geoJSONLayerURL,
          copyright: 'Avalanche Canada',
          popupTemplate: Constants.template,
          // opacity: 1,
          renderer: this.geoJSONRenderer('alp'),
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

  methods: {
    geoJSONRenderer(altitudeRange) {
      return {
        type: 'unique-value',
        defaultSymbol: {
          type: 'simple-fill',
          color: [136, 136, 136, 0.3],
          title: 'id',
          outline: {
            color: 'white',
            width: '5',
          },
        },
        valueExpression: `Left($feature.${altitudeRange}, 1)`,
        uniqueValueInfos: Constants.uniqueValueInfosArray,
      };
    },
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
