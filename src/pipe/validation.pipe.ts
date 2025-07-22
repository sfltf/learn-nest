import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationParamPipe implements PipeTransform {
    transform(query: any, metadata: ArgumentMetadata) {
        console.log("管道触发", query)
        try {
            console.log("管道触发1", JSON.parse(query.id.replace(/'/g, '"')))
            return JSON.parse(query.id.replace(/'/g, '"'))
        } catch {
            return []
        }
    }
}