module.exports = {
  "presets": [
    "@bluebase/code-standards/babel.config"
  ],
  "env": {
    "test": {
      "plugins": [
        ["istanbul", {
          "exclude": [
            "**/*.test.{ts,tsx,js,jsx}",
            "tests/*.{ts,tsx,js,jsx}"
          ]
        }]
      ]
    }
  }
};