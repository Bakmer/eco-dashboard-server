import { RESTDataSource } from "apollo-datasource-rest";
import { MyContext } from "../types/MyContext";
// import messages from "../constants/messages";

export default class GeorefAPIService extends RESTDataSource {
  ctx: MyContext;

  constructor() {
    super();
    this.baseURL = "https://apis.datos.gob.ar/georef/api/";
  }

  async getAllProvinces() {
    return this.get("provincias", { max: 50 });
  }

  async getAllLocations() {
    return this.get("localidades", { max: 100, campos: "basico" });
  }

  async getProvinceById(province_id: string) {
    return this.get("provincias", { id: province_id });
  }

  async getLocationById(location_id: string) {
    return this.get("localidades", { id: location_id, campos: "basico" });
  }

  async getLocations(province_id: string) {
    return this.get("localidades", { campos: "basico", provincia: province_id, max: 1500 });
  }
}
