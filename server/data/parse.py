import pandas as pd
import json
import numpy as np

""" Parse metadata and descriptive statistics from data.csv"""


# to encode numpy datatypes into json
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

if __name__ == '__main__':
    df = pd.read_csv('data.csv',header=0)
    numeric_columns = df._get_numeric_data().columns.tolist()
    
    desc = {}
    desc['rows'] = len(df)
    features = {}
    for col in df.columns:
        f = {}
        f['description'] = ""
        numeric = col in numeric_columns
        f['type'] = 'numerical' if numeric else 'categorical'
        if numeric:
            f['min'] = df[col].min()
            f['max'] = df[col].max()
            f['mean'] = df[col].mean()
            f['median'] = df[col].median()
        else:
            counts = df[col].value_counts()
            f['unique'] = len(counts)
            topCounts = {}
            for value, count in counts[:10].iteritems():
                topCounts[value] = count
            topCounts['other'] = counts[10:].sum()
            f['counts'] = topCounts
        features[col] = f
    desc['features'] = features

    with open("parsed.json","w") as file:
        json.dump(desc,file,cls=NpEncoder,indent=4)

    print("wrote parsed descriptors into parsed.json")