import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // 假设id是字符串或字符串数组，直接打印
        console.log('request.....', req.query?.id);
        next();
    }
}