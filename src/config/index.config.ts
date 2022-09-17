/**
 * 导入所有的的配置文件，作为单一入口文件，
 * 以数组的形式向外默认导出，
 * 打散之后放入传入ConfigModule.forRoot()配置对象的load数组
 */

import envConfig from './env.config';
export default [envConfig];
