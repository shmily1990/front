import AMapLoader from '@amap/amap-jsapi-loader'
class Map {
  map = null
  layer = {}
  ruler = null
  AMap = null
  polygons = []
  areaNodes = null
  districtExplorers = null
  tileLayer = {
    satellite: null, // 卫星图层
    traffic: null, // 交通图层
    road: null, // 路网图层
  }
  mouseTool = null // 距离测量
  windy = {
    ins: null,
    canvasOverlayVector: null,
    customLayer: null,
  }

  init(dom, options) {
    return AMapLoader.load({
      key: '13e9c66757d38a6d7ce3ac5beadb4267',
      version: '2.0', // JSAPI 版本号
      plugins: [
        'Map3D',
        'AMap.RangingTool',
        'AMap.Geocoder',
        'AMap.CitySearch',
        'AMap.ControlBar',
        'AMap.MouseTool',
        'AMap.Weather',
        'geo/DistrictExplorer',
        'AMap.moveAnimation',
        'AMap.MarkerClusterer',
      ], // 同步加载的插件列表
      AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleMarker', 'geo/DistrictExplorer'],
      },
    })
      .then(async (AMap) => {
        this.AMap = AMap
        this.map = new AMap.Map(dom, options)
        return Promise.resolve()
      })
      .catch((e) => {
        console.error(e) // 加载错误提示
      })
  }
}

const proxyMapSingleton = (() => {
  let mapIns = null
  return function () {
    if (!mapIns) {
      mapIns = new Map()
    }

    return mapIns
  }
})()

export default proxyMapSingleton
