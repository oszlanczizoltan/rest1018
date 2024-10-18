import { Body, Controller, Delete, Get, NotFoundException, Param, Put, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { replaceProductDto } from './replaceproduct.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  #productlist = [
    {
      name: 'Washing machine',
      price: 80000,
    },
    {
      name:'Basketball',
      price: 15000,
    },
    {
      name:'Detergent',
      price: 4000,
    }
  ]

  @Get('products')
  listProducts() {
    return this.#productlist;
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return JSON.stringify(this.#productlist[id]);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    if (!this.#productlist[id]) {
      throw new NotFoundException("No product with ID")
    }
    this.#productlist.splice(Number(id), 1);
  }

  @Put('products/:id')
  replaceProduct(@Param('id') id: string, @Body() data: replaceProductDto ){
    if (!this.#productlist[id]) {
      throw new NotFoundException("No product with ID")
    }
    this.#productlist[id] = data;
  }
}
