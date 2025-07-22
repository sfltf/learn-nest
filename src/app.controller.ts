import { Controller, Get, Req, Param, Query, HttpException, HttpStatus, ParseArrayPipe, ParseIntPipe, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';
import { createCatScheam, CreateCatDto } from "./cto/create-dto"
import { ValidationParamPipe } from "./pipe/validation.pipe"
import { ZodValidationPipe } from "./pipe/zodValidation.pipe"
import { AuthGuard } from "./guard/auth.guard"

// dto 参数接收类

@Controller("cats")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("getHello")
  getHello(@Req() request: Request): string {
    console.log("参数", request.query.a)
    return this.appService.getHello();
  }
  // @Get(":id")
  // findOne(@Param() params: any): string {
  //   console.log("路由参数", params.id)
  //   return "111"
  // }
  // 获取get请求所有参数，无需通过req
  @Get("dog")
  @UsePipes(new ZodValidationPipe(createCatScheam))
  @UseGuards(AuthGuard)
  findDog(@Query(new ValidationParamPipe()) query: CreateCatDto): string {
    // console.log("query===>", JSON.parse(query.id)[0]);
    // new ValidationParamPipe()
    console.log("id=======>", query)
    console.log("id1=====>", query[0])
    // throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: "这是一个错误",
    //   msg: "error"
    // }, HttpStatus.FORBIDDEN)
    return "111"
  }
}
