import { apiFetch } from "../util/api";

export const postTrain = (features) =>
    apiFetch('/api/ml/train', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selected_features: features })
    })

export const fetchModels = (id) =>
    apiFetch(`/api/ml/predictions?id=${id}`)
    .then(data => data.json())

export const fetchModelUsers = () => 
    apiFetch('/api/ml/models/users')
    .then(data => data.json())

export const deleteAllModels = () => apiFetch('/api/ml/models', { method: 'DELETE' })
