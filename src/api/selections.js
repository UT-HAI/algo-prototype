import { apiFetch } from '../util/api'

export const fetchUsers = () => 
    apiFetch('/api/selections/users')
    .then(data => data.json())

export const postSelections = (id, selections) =>
    apiFetch('/api/selection', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, selections })
    })

export const deleteAllSelections = () => apiFetch('/api/selections', { method: 'DELETE', })