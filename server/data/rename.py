import pandas as pd

renames = [
    ["Count: Arts","Awards: Arts"],
    ["Count: Competition","Awards: Competitions"],
    ["Count: GAE","Awards: Scholastic"],
    ["Count: Research","Awards: Research"],
    ["Count: Service","Awards: Service"],
    ["Count: Leadership","Awards: Leadership"],
    ["GPA_Merged","GPA"],
    ["work_experience_int","Work Experience"],
    ["admit_code", "Admission Decision"],
    ["tiers","Tier of Undergraduate Institution"],
    ["GRE APT Verb Percentile","GRE Verbal Percentile"],
    ["GRE APT Analyt Percentile","GRE Analytical Percentile"],
    ["GRE APT Quant Percentile","GRE Quant Percentile"],
]

files = ['data.csv','data_test.csv','data_train.csv']

if __name__ == '__main__':
    for filename in files:
        df = pd.read_csv('server/data/'+filename,header=0)
        df=df.rename(columns=dict(renames))
        df.to_csv('server/data/'+filename)