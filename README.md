# Bot Advertising Platform SDK

This repository holds SDK related to
[Bot Advertising Platform](https://publisher.socialjet.pro/).

## Requirements

- node.js 20+

## Installation

Install the latest version with

```bash
npm i @codd-tech/bap-sdk-node
```
## Usage

SDK accepts single update from the Telegram bot as an object.

### Basic usage

```js
const bap = new BAP('<bap_token>')
bap.handleTelegramUpdates(update)
```

If your advertisement mode is set to **manual** you can mark ad placement in your code by calling:
```js
bap.advertisement(update)
```

**Interrupting control flow**

At times, BAP may introduce telegram updates within its advertisement flow. To maintain the logical consistency of your bot, it is necessary to ignore such updates.  

The `BAP::handleTelegramUpdates` method returns a boolean value indicating whether you should proceed with handling the request or skip it as an internal BAP request.

When the method returns `false`, it signifies that the current request should not be processed by your bot.

### API Key

**API key is not your Telegram bot token.**

API key must be obtained from [socialjet.pro](https://publisher.socialjet.pro/)

## About

### Submitting bugs and feature requests

Bugs and feature request are tracked on [GitHub](https://github.com/codd-tech/bap-sdk-node)

### License

Bot Advertising Platform SDK is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
