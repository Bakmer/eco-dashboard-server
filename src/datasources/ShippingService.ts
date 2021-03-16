import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Shipping } from "../entities/Shipping";
import { MyContext } from "../types/MyContext";
import { ShippingRepository, ClientRepository } from "../repositories";
import { CreateShippingFields, UpdateShippingFields } from "../resolvers/Shipping/types";
import messages from "../constants/messages";
import { capitalize } from "../utils";

const {
  CLIENT_NOT_FOUND,
  DELETE_SHIPPING_ERROR,
  SHIPPING_NOT_FOUND,
  GENERIC_ERROR,
  GET_LOCATIONS_ERROR,
  GET_LOCATION_ERROR,
  GET_PROVINCE_ERROR,
} = messages;

export default class ShippingService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(data: CreateShippingFields): Promise<Shipping | undefined> {
    const validations = await Promise.all([
      ClientRepository.simpleFindById(data.client_id),
      this.ctx.dataSources.georefAPIService.getProvinceById(data.province_id),
      this.ctx.dataSources.georefAPIService.getLocations(data.province_id),
    ]);

    if (!validations[0]) {
      throw { InputErr: CLIENT_NOT_FOUND };
    }

    const province: object = validations[1].provincias[0];
    if (!province) {
      throw { Err: GET_PROVINCE_ERROR };
    }

    if (!validations[2].localidades.length) {
      throw { Err: GET_LOCATIONS_ERROR };
    }

    const location = validations[2].localidades.find((x: any) => x.id === data.location_id);

    if (!location) {
      throw { Err: GET_LOCATION_ERROR };
    }

    const newShipping = await ShippingRepository.create({
      ...data,
      name: capitalize(data.name),
      street: capitalize(data.street),
      province,
      location,
    });

    return ShippingRepository.findById(newShipping.id);
  }

  async update(data: UpdateShippingFields): Promise<Shipping | undefined> {
    const shipping = await ShippingRepository.findById(data.id);
    if (!shipping) {
      throw { InputErr: SHIPPING_NOT_FOUND };
    }

    if (shipping.client_id !== data.shipping.client_id) {
      throw { Err: GENERIC_ERROR };
    }

    await ShippingRepository.update({
      ...data,
      shipping: {
        ...data.shipping,
        name: capitalize(data.shipping.name),
        street: capitalize(data.shipping.street),
      },
    });

    return ShippingRepository.findById(data.id);
  }

  async delete(id: number): Promise<void> {
    const shipping = await ShippingRepository.findById(id);
    if (!shipping) {
      throw { InputErr: DELETE_SHIPPING_ERROR };
    }

    await ShippingRepository.delete(id);
  }

  //   list(): Promise<Discount[]> {
  //     return ShippingRepository.list();
  //   }
}
