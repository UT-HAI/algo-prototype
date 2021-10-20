export const simple = {
    'Some Numbers': {
        description: 'This feature is pretty cool.',
        type: 'numerical',
        min: -1,
        max: 14,
        average: 7,
        median: 6,
        valuesForHistogram: [-1,-1,0,2,2,3,4,4,4,4,5,6,7,8,9,9,9,11,12,14]
    },
    'SAT Score': {
        description: 'Here\'s a description about this feature.',
        type: 'numerical',
        min: 621,
        max: 1600,
        average: 1420,
        median: 1450,
        valuesForHistogram: [621, 700, 800, 1000, 1100, 1200, 1250, 1251, 1400, 1400, 1420, 1500, 1510, 1520, 1530, 1540, 1560, 1570, 1580, 1600]
    },
    // boolean feature
    'Binary': {
        description: 'Lorem ipsum dolor',
        type: 'numerical',
        min: 0,
        max: 1,
        average: 0.7,
        median: 0.7,
        valuesForHistogram: [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    },
    'Letter': {
        description: 'Lorem ipsum',
        type: 'categorical',
        min: 0,
        max: 1,
        average: 0.7,
        median: 0.7,
        valuesForHistogram: ['a','a','c','b','b','a','a','c','b','b','a','a','c','b','b','a','a','c','b','b']
    },
    'Country': {
        description: 'Lorem ipsum',
        type: 'categorical',
        min: 0,
        max: 1,
        average: 0.7,
        median: 0.7,
        valuesForHistogram: ['US','CA','CH','MX','FR','UK','ES','CH','CA','FR','ES','CA','CH','MX','UK','FR','CH','MX','US','US']
    },
}