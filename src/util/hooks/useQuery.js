
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom"

export const getQueryString = (key) => (new URLSearchParams(window.location.search)).get(key)

export const setQueryString = (key, value, history) => {
    const params = new URLSearchParams(window.location.search)
    params.set(key,value)
    history.push({ pathname: window.location.pathname, search: '?' + params.toString() }); // need '?' maybe
}

const useQuery = (key, initialValue) => {
  const [value, setValue] = useState(getQueryString(key) || initialValue);
  const history = useHistory()
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setQueryString(key, newValue, history);
    },
    [key, history]
  );

  return [value, onSetValue];
}

export default useQuery;