import { apiFetch } from '../util/api'

export const fetchData = () => 
    apiFetch('/api/data')
    .then(data => data.json())
