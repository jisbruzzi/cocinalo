import tileData from './tileData.js';

class Proxy {
    constructor() {
      this._type = 'Proxy';
      this.data = tileData;
    }
  
    singletonMethod() {
      return 'singletonMethod';
    }
  
    static staticMethod() {
      return 'staticMethod';
    }
  
    get type() {
      return this._type;
    }
  
    set type(value) {
      this._type = value;
    }

    getPlatos() {
        return this.data;
    }
  }
  
export default new Proxy();
