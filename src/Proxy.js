import appdata from './appData.js';

class Proxy {
    constructor() {
      this._type = 'Proxy';
      this.data = appdata;
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
        return new Promise(function(resolve, reject){
              resolve(appdata.platos);
        });
    }
  }
  
export default new Proxy();
