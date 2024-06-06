import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'gptVersion',
});

export const keyStorage = new MMKV({
  id: 'apiKey',
});

export const chatStorage = new MMKV({
  id: 'chats',
});