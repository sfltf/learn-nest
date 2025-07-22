import { Transform } from "class-transformer";
import { IsArray } from "class-validator"
import { z } from "zod"

// export class CreateCatDto {
//     @Transform(({ value }) => {
//         try {
//             console.log("触发转换器", typeof value, value)
//             return JSON.parse(value.replace(/'/g, '"'))
//         } catch {
//             return []
//         }
//     })
//     @IsArray()
//     id: string[];
// }

export const createCatScheam = z.object({
    // 校验数据是否符合规则
    id: z.string()
})
export type CreateCatDto = z.infer<typeof createCatScheam>