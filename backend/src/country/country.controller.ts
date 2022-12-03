import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}
  @Get(':lang')
  getCountryCodes(@Param('lang') lang: string) {
    return this.countryService.getCountryCodes(lang);
  }
}
