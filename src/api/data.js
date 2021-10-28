import { apiFetch } from '../util/api'

export const fetchData = () => 
    apiFetch('/api/data')
    .then(data => data.json())

export const fetchFeatures = () => 
    apiFetch('/api/data/features')
    .then(data => data.json())
