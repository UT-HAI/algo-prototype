import { useState } from "react"

// like useState but caches to local or session storage
const useStorage = (
    defaultValue,
    store, // "local" or "session"
    key
) => {
  const storage = store === "session" ? sessionStorage : localStorage;
  const [value, setValue] = useState(() => {
    const item = storage.getItem(key);
    let returnValue;
    try {
        returnValue = JSON.parse(item)
    }
    catch {
        returnValue = defaultValue
    }
    return returnValue
  });

  const onChange = (val) => {
      storage.setItem(key, JSON.stringify(val))
      setValue(val)
  }

  return [value, onChange]
}

export const useSessionStore = (defaultValue, key) => {
    return useStorage(defaultValue, "session", key)
}

export const useLocalStore = (defaultValue, key) => {
    return useStorage(defaultValue, "local", key)
}