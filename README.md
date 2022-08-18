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
