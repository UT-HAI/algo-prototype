import { apiFetch } from '../util/api'

export const fetchUsers = () => 
    apiFetch('/api/selections/users')
    .then(data => data.json())

export const postSelections = (id, selections) =>{
    console.log(selections)
    const booleanSelections = Object.fromEntries(Object.entries(selections)
        .map(([f,selection]) => [f,selection === 'include' ? true : false]))
    return apiFetch('/api/selection',{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, selections: booleanSelections})
    })
}
    