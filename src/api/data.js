export const fetchData = () => 
    fetch('/api/data').then(data => data.json())
