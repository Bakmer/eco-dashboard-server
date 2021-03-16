import { Resolver, Authorized, Ctx, Query, Arg } from "type-graphql";
import messages from "../../constants/messages";
import { handleError } from "../../utils";
import { ApiResponse } from "../sharedTypes";
import { IdField, ProvinceId } from "./types";

import { MyContext } from "src/types/MyContext";

const {
  LIST_PROVINCES_SUCCESSFUL,
  LIST_LOCATIONS_SUCCESSFUL,
  GET_PROVINCE_SUCCESSFUL,
  GET_LOCATION_SUCCESSFUL,
} = messages;

@Resolver()
export class GeorefAPI {
  @Query(() => ApiResponse)
  @Authorized()
  async getAllProvinces(@Ctx() { dataSources: { georefAPIService } }: MyContext): Promise<ApiResponse> {
    try {
      const provinces = await georefAPIService.getAllProvinces();

      return {
        data: provinces,
        message: LIST_PROVINCES_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Query(() => ApiResponse)
  @Authorized()
  async getAllLocations(@Ctx() { dataSources: { georefAPIService } }: MyContext): Promise<ApiResponse> {
    try {
      const locations = await georefAPIService.getAllLocations();

      return {
        data: locations,
        message: LIST_LOCATIONS_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Query(() => ApiResponse)
  @Authorized()
  async getProvince(
    @Arg("vars") { id }: IdField,
    @Ctx() { dataSources: { georefAPIService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      const province = await georefAPIService.getProvinceById(id);

      return {
        data: province,
        message: GET_PROVINCE_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Query(() => ApiResponse)
  @Authorized()
  async getLocation(
    @Arg("vars") { id }: IdField,
    @Ctx() { dataSources: { georefAPIService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      const location = await georefAPIService.getLocationById(id);

      return {
        data: location,
        message: GET_LOCATION_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }

  @Query(() => ApiResponse)
  @Authorized()
  async getLocations(
    @Arg("vars") { province_id }: ProvinceId,
    @Ctx() { dataSources: { georefAPIService } }: MyContext
  ): Promise<ApiResponse> {
    try {
      const location = await georefAPIService.getLocations(province_id);

      return {
        data: location,
        message: GET_LOCATION_SUCCESSFUL,
      };
    } catch (error) {
      console.log(error);
      return handleError(error);
    }
  }
}
