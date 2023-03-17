import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private countryService: CountryService) {}
  @Get(':lang')
  getCountryCodes(@Param('lang') lang: string) {
    return this.countryService.getCountryCodes(lang);
  }
}
