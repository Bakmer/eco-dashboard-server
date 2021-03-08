import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Discount } from "../../entities/Discount";
import { MyContext } from "../../types/MyContext";
import { DiscountRepository } from "../../repositories";
import messages from "../../constants/messages";

const { DISCOUNT_ALREADY_EXISTS } = messages;

export default class DiscountService extends DataSource {
  ctx: MyContext;

  constructor() {
    super();
  }

  initialize(config: DataSourceConfig<MyContext>) {
    this.ctx = config.context;
  }

  async create(percentage: number): Promise<Discount> {
    const discount = await DiscountRepository.findByName(percentage);
    if (discount) {
      throw { InputErr: DISCOUNT_ALREADY_EXISTS };
    }

    return DiscountRepository.create(percentage);
  }

  list(): Promise<Discount[]> {
    return DiscountRepository.list();
  }
}
