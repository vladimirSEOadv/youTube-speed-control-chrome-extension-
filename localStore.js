const store = chrome.storage.local;

async function set(obj) {
  await store.set(obj);
}
