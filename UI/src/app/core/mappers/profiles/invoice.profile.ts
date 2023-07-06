import { MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { InvoiceInputModel } from "../../models/input/invoice-input.model";
import { InvoiceModel } from "../../models/inner/invoice.model";

export const invoiceProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        InvoiceInputModel,
        InvoiceModel,
        forMember(
            (dest) => dest.id,
            mapFrom((source) => source.id)
        ),
        forMember(
            (dest) => dest.amount,
            mapFrom((source) => source.amount)
        ),
        forMember(
            (dest) => dest.statusId,
            mapFrom((source) => source.statusId)
        ),
        forMember(
            (dest) => dest.status,
            mapFrom((source) => source.status)
        ),
        forMember(
            (dest) => dest.date,
            mapFrom((source) => new Date(source.date))
        ),
    );
};