# TinyYana-Leveling

LevelService是一個用TypeScript寫的module，它可以管理成員的等級、經驗值和貨幣。它原本是[TinyYana-Community/LevelBot](https://github.com/TinyYana-Community/LevelBot)這個專案的一部分內容，但由於這個等級系統本身可以被用在discord bot以外的地方，所以將此專案獨立出來。

## 安裝

你可以用npm來安裝這個module：

```sh
npm i tinyyana-leveling
```

你可以用import或require來引入這個module：
```js
import LevelService from 'level-service';
// or
const LevelService = require('level-service');
```
然後你就可以使用LevelService這個類別的靜態方法來管理會員的等級、經驗值和貨幣了。例如：
```js
// 為某個會員增加100點經驗值
await LevelService.addExp('123456789', 100);

// 為某個會員增加10點貨幣
await LevelService.addCurrency('123456789', 10);

// 獲取某個會員的等級
const level = await LevelService.getLevel('123456789');

// 獲取某個會員的貨幣
const currency = LevelService.getCurrency('123456789');
```

## License

This work is licensed under the [MIT License](https://opensource.org/licenses/MIT).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
