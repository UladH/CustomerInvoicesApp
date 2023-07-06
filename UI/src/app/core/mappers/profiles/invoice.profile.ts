import { MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { InvoiceInputModel } from "../../models/input/invoice-input.model";
import { InvoiceModel } from "../../models/inner/invoice.model";
import { InvoiceFormInputModel } from "../../models/input/invoice-form-input.model";
import { InvoiceOutputModel } from "../../models/output/invoice-output.model";

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
    
    createMap(
        mapper,
        InvoiceFormInputModel,
        InvoiceOutputModel,
        forMember(
            (dest) => dest.Id,
            mapFrom((source) => source.id)
        ),
        forMember(
            (dest) => dest.Amount,
            mapFrom((source) => source.amount)
        ),
        forMember(
            (dest) => dest.StatusId,
            mapFrom((source) => source.statusId)
        ),
        forMember(
            (dest) => dest.Date,
            mapFrom((source) => source.date)
        ),
    );
};