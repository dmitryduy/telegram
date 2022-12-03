import { Injectable } from '@nestjs/common';
import { getCountyCodesByName } from './utils/getCountyCodesByName';

@Injectable()
export class CountryService {
  getCountryCodes(lang: string) {
    return getCountyCodesByName(lang);
  }
}
