import { useEffect, useState } from "react"

export const getStorage = (key, store, defaultValue = undefined) => {
    const storage = store === "session" ? sessionStorage : localStorage;
    const item = storage.getItem(key);
    if (!item) return defaultValue;
    let returnValue;
    try {
        returnValue = JSON.parse(item)
    }
    catch {
        returnValue = defaultValue
    }
    return returnValue
}

// like useState but caches to local or session storage
const useStorage = (
    defaultValue,
    store, // "local" or "session"
    key,
    dependencies = []
) => {
  const storage = store === "session" ? sessionStorage : localStorage;
  const [value, setValue] = useState(getStorage(key, store, defaultValue));

  useEffect(() => {
    setValue(getStorage(key, store, defaultValue))
  }, [key, ...dependencies])

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