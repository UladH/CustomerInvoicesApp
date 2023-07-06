import { MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { StatusInputModel } from "../../models/input/status-input.model";
import { StatusModel } from "../../models/inner/status.model";

export const statusProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        StatusInputModel,
        StatusModel,
        forMember(
            (dest) => dest.id,
            mapFrom((source) => source.id)
        ),
        forMember(
            (dest) => dest.name,
            mapFrom((source) => source.name)
        )
    );
};