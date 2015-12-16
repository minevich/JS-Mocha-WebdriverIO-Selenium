Parallel tests with Mocha and WD.js
=============

## 1/ Configure your Sauce Labs credentials

```
export SAUCE_USERNAME=<SAUCE_USERNAME>
export SAUCE_ACCESS_KEY=<SAUCE_ACCESS_KEY>
```

## 2/ Install local packages and tools

In this sample directory (there should be a `package.json` file) run:

```
npm install
```

## 3/ Inspect the code

- The browsers are configured in `desireds.js`
- The mocha test suites is in `tests/` folder
- The parallel runner is in `Gruntfile.js`

Go [Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/tests) to view the tests.

## 4/ Run tests in parallel

```
npm test
```