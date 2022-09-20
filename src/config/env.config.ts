/**
 * 读取配置文件env.yml
 */
import { readFileSync } from 'fs';
import * as yarm from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'env.yaml';
export default () => {
  /**
   * nest将src目录中的源文件编译至dist目录，即源文件执行的目录为dist.
   * nest不会自动维护非JS或TS的文件，故须修改nest-cli.json文件中的compilerOptions#assets
   */

  /**
   * 避坑!
   * nest会根据src目录结构将asset文件拷贝至compilerOptions#assets#outDir目录下的对应位置
   * 即：
   * 若/src/a/b目录中存在文件C,outDir设置为/dist,则c文件会被拷贝到/dist/a/b中
   */
  return yarm.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf-8'),
  ) as Record<string, any>;
};
