import { fetchApi } from '../util/api'

export const fetchData = () => 
    fetchApi('/api/data')
    .then(data => data.json())
