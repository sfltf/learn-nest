import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ZodType } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor (private scheam: ZodType) {

    }
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            console.log("触发zod", value.id)
            const parsedValue = this.scheam.safeParse(value);
            console.log("parsedValue=====>", parsedValue)
            return parsedValue
        } catch (error: any) {
            console.log("错误详情", error)
            throw new BadRequestException("Validation failed")
        }
    }
}

// 验证前台传的参数是否符合规则有两种方式
// 1. 使用zod
// 2. 使用类验证器 class-validator