import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TokenMiddleware } from './middleware/token.middleware';

// imports 管理各个module之间的关系
// exports 共享服务，任何导入该模块的模块都可以使用该服务

@Module({
  imports: [],
  controllers: [AppController],
  // 依赖注入
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 针对以cats开头的路由添加中间件
    consumer.apply(LoggerMiddleware)
    .exclude({
      path: 'cats/getHello',
      method: RequestMethod.GET
    })
    .forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
    // 可以apply多个中间件来实现不同的功能
    consumer.apply(TokenMiddleware).forRoutes("*")
  }
}

// controller里先触发 中间件 -> 守卫 -> 拦截器（before）-> 管道 -> 控制器方法 -> 拦截器(after) -> 异常过滤器
// 需要处理 HTTP 请求/响应本身（如修改 Header、全局鉴权）→ 中间件。
// 需要验证或转换 控制器方法的参数（如 DTO、路径参数）→ 管道

// @anatine/zod-nestjs

// 使用场景
// 守卫 
// 执行时机：在中间件之后，管道之前执行
// 主要职责：认证和授权
// 验证用户身份，检查用户权限，基于角色/权限的访问控制，API 密钥验证，JWT 令牌验证


// 管道 
// 执行时机：在守卫之后，拦截器之前执行
// 主要职责：数据转换和验证
// 验证请求参数，转换数据格式，数据清洗，提供默认值

// 拦截器
// 执行时机：在管道之后，控制器方法执行前后
// 主要职责：处理请求/响应的横切关注点
// 响应格式标准化, 错误映射, 缓存处理,日志记录,性能监控,超时处理

// 中间件
// 执行时机：在守卫之前执行，最接近原始请求
// 主要职责：处理 HTTP 请求的底层操作
// CORS 处理, 请求压缩, 静态文件服务, 原始日志记录, 请求体解析, IP 过滤