export function storeValue(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function retrieveValue(key: string) {
  const value = localStorage.getItem(key) || '{}';
  return JSON.parse(value);
}

export function removeValue(key: string) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}
