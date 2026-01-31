# Native Util

[![npm latest package](https://img.shields.io/npm/v/@lfsoftwares/native-util/latest.svg)](https://www.npmjs.com/package/@lfsoftwares/native-util)
[![npm downloads](https://img.shields.io/npm/dm/@lfsoftwares/native-util.svg)](https://npm-stat.com/charts.html?package=@lfsoftwares/native-util)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/emcsistemas/bibliotecas-npm/blob/4a3c9e66ebf043c80b428829457d2d7374c6b744/LICENCE)

## Utility library for react native

[**LFSoftwares**](https://www.lfsoftwares.com.br/)

## Requirements

- Expo SDK 54+
- React Native 0.81+
- React 19.1+

## 1. Install

```sh
npm i @lfsoftwares/native-util
```
ou
```sh
yarn add @lfsoftwares/native-util
```
ou
```sh
pnpm add @lfsoftwares/native-util
```

## 2. Dependencies

> If you used a package manager other than npm in step 2, also use it in the command below

```sh
npx expo install expo-clipboard expo-constants expo-crypto expo-device expo-splash-screen moment react-native-format-currency
```

## 3. What's included?

- **RNGeneralConsts**
- **RNRegexConsts**
- **RNDateUtils**
- **RNFormatUtils**
- **RNGeneralUtils**
- **RNMaskUtils**
- **RNNetworkUtils**
- **RNNumberUtils**
- **RNValidationUtils**

Use: 

```bash
import { RNNetworkUtils } from '@lfsoftwares/native-util'

if (RNNetworkUtils.isInternalNetwork('http://www.meusite.com.br')){
  ...
}
```

## 4. Contribution

Feel free to submit a PR if you want to help!

## 5. Licence

Licensed under the MIT License, Copyright © 2023 LFSoftwares. See [LICENCE](https://github.com/leofernandesbh/npm-libs/blob/0b911851e9a8ebe9670b3cb1f23c8277922c6f4f/LICENCE) for more information.