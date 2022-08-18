# webpack5-react18-cli

---

> ## Engineering configuration

- ### Automatically install husky

  ```shell
  npx husky-init && npm install
  ```

- ### Resolve conflicts between ESlint and Prettier

  1. Install eslint-config-prettier to close the rules that might conflicted with prettier.
  2. Install eslint-plugin-prettier to use prettier to format the code instead of eslint

     ```shell
     npm i eslint-config-prettier eslint-plugin-prettier -D
     ```

  3. Revise "extends", "plugins" and "rules" in eslint configuration

- ### Commitlint

  1. Install commitlint and a commitlint-config-\* of your choice as devDependency and configure commitlint to use it.

     ```shell
     npm install --save-dev @commitlint/config-conventional @commitlint/cli
     ```

  2. Configure commitlint to use conventional config

     ```shell
     echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
     ```

  3. Add hook

     ```shell
     npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
     ```

  4. Commit messages convention

     ```
     [
        'build',    // 构建系统或外部依赖项的更改
        'chore',    // 非 src 和 test 的修改，发布版本等
        'ci',       // 自动化流程配置或脚本修改
        'docs',     // 修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
        'feat',     // 新功能
        'fix',      // 修补 BUG
        'perf',     // 优化相关，比如提升性能、体验
        'refactor', // 重构（既不修复错误也不添加功能）
        'revert',   // 恢复先前的提交
        'style',    // 不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
        'test'      // 增加测试，包括单元测试、集成测试等
     ];
     ```
