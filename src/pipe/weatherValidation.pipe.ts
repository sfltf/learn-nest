// 天气管道，检测用户是否添加天气code
import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

export class WeatherValidationPipe implements PipeTransform {
    transform(code: string, metadata: ArgumentMetadata) {
        try {
            if (!/^\d{6}$/.test(code)) {
                throw new BadRequestException("请传入6位城市code")
            }
            return code
        } catch(error) {
            throw new BadRequestException("请传入6位城市code")
        }
    }
}