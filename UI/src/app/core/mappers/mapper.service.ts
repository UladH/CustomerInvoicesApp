import { Injectable } from '@angular/core';
import { classes } from '@automapper/classes';
import { Dictionary, MapOptions, Mapper, ModelIdentifier, addProfile, createMapper } from '@automapper/core';
import { invoiceProfile } from './profiles/invoice.profile';
import { statusProfile } from './profiles/status.profile';

@Injectable({
  providedIn: 'root'
})
export class MapperService {
  private mapper : Mapper;

  //#region  constructor

  constructor() { 
    this.mapper = createMapper({
      strategyInitializer: classes(),
    });

    this.addProfiles();
  }

  //#endregion

  //#region public

  public get map(): <TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>
    (sourceObject: TSource, sourceIdentifier: ModelIdentifier<TSource>, destinationIdentifier: ModelIdentifier<TDestination>, 
    options?: MapOptions<TSource, TDestination>) => TDestination {
    return this.mapper.map.bind(this.mapper);
  }

  public get mapArray(): <TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>
    (sourceArray: TSource[], sourceIdentifier: ModelIdentifier<TSource>, destinationIdentifier: ModelIdentifier<TDestination>, 
    options?: MapOptions<TSource[], TDestination[]>) => TDestination[] {
    return this.mapper.mapArray.bind(this.mapper);
  }

  //#endregion

  //#region private

  private addProfiles(): void{
    addProfile(this.mapper, invoiceProfile);
    addProfile(this.mapper, statusProfile);
  }

  //#endregion 
}
