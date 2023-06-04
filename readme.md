# TinyYana-Leveling

LevelService is a TypeScript module that allows you to manage the levels, experience, and currency of members. It was originally part of the project [TinyYana-Community/LevelBot](https://github.com/TinyYana-Community/LevelBot). However, since this leveling system can be used outside of a Discord bot, it has been extracted into its own project.

## Installation

You can install this module using npm:

```sh
npm i tinyyana-leveling
```

You can then import the module using `import` or `require`:

```js
import LevelService from 'level-service';
// or
const LevelService = require('level-service');
```

You can now use the static methods of the LevelService class to manage the levels, experience, and currency of members. For example:

```js
// Add 100 experience points to a member
await LevelService.addExp('123456789', 100);

// Add 10 currency to a member
await LevelService.addCurrency('123456789', 10);

// Get the level of a member
const level = await LevelService.getLevel('123456789');

// Get the currency of a member
const currency = LevelService.getCurrency('123456789');
```

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/).

[![CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc/4.0/)
