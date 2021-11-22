import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression


def select_features(df, features):
    # TODO: implement features filters, and check if one-hot is needed
    # df.drop(...)

    # process gender
    df['Gender'] = df['Gender'].apply(lambda x: 1 if x == 'Male' else 0)

    # process ethnicity
    one_hot = pd.get_dummies(df['Ethnicity'])
    df = df.drop('Ethnicity', axis=1)
    df = df.join(one_hot)

    X = df.drop(['admit_code'], axis=1)
    y = df['admit_code'].apply(lambda x: 0 if x == 'D' else 1)
    return train_test_split(X, y, test_size=0.3, random_state=42)


def train_and_predict(X_train, y_train, X_test):
    clf = LogisticRegression(random_state=42).fit(X_train, y_train)
    return clf.predict_proba(X_test)
