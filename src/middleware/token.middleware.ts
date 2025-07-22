// 检测用户token是否过期
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("中间件触发")
        next()
    }
}