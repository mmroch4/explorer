const { input } = require("@inquirer/prompts");
const fs = require("fs");
const { z } = require("zod");

const MINIMUM_LEVELS_ALLOWED = 1;
const MAXIMUM_LEVELS_ALLOWED = 12;

(async function () {
  const level = await input({
    message: "Level:",
    validate: (value) => {
      const isNumber = z
        .number({
          coerce: true,
          invalid_type_error: "Level must be a number",
        })
        .gte(MINIMUM_LEVELS_ALLOWED)
        .lte(MAXIMUM_LEVELS_ALLOWED)
        .int("Level must be an integer")
        .positive("Level must be a positive integer")
        .safeParse(value);

      if (!isNumber.success) {
        const { _errors: errors } = isNumber.error.format();

        return errors[0];
      }

      return isNumber.success; // true
    },
  });

  const path = __dirname.slice(0, __dirname.length - "commands".length);

  const levelsDir = `${path}/challenges/levels`;

  const newLevelDir = `${levelsDir}/${level < 10 ? `0${level}` : level}`;

  if (!fs.existsSync(newLevelDir)) {
    fs.mkdirSync(newLevelDir, { recursive: true });

    fs.mkdirSync(`${newLevelDir}/land`, { recursive: true });
    fs.mkdirSync(`${newLevelDir}/stage`, { recursive: true });
  }
})();
