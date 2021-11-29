import { apiFetch } from '../util/api'

export const fetchNotebook = (id) =>
    apiFetch(`/api/notebook?id=${id}`)
    .then(data => data.json())

export const postNotebook = (id, data) =>
    apiFetch('/api/notebook', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, ...data })
    })

export const fetchNotebookUsers = () => 
    apiFetch('/api/notebooks/users')
    .then(data => data.json())

export const deleteAllNotebooks = () => apiFetch('/api/notebooks', { method: 'DELETE' })
