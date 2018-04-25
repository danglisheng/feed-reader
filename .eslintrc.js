module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery":true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent":0, //忽略indent
        "linebreak-style": [
            "error",
            "unix"
        ]
    }
};