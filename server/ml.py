import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

target_col = 'Admission Decision'

def select_features(df_train, df_test, features):
    # TODO: implement features filters, and check if one-hot is needed
    # df.drop(...)
    all_features = [*features, 'Subject ID', target_col]

    df_selected_train = df_train[all_features]
    df_selected_test = df_test[all_features]

    # process gender
    if 'Gender' in features:
        df_selected_train.loc[:, 'Gender'] = df_selected_train['Gender'].apply(
            lambda x: 1 if x == 'Male' else 0)
        df_selected_test.loc[:, 'Gender'] = df_selected_test['Gender'].apply(
            lambda x: 1 if x == 'Male' else 0)

    # process ethnicity
    if 'Ethnicity' in features:

        def process_ethnicity(df):
            one_hot = pd.get_dummies(df['Ethnicity'])
            return df.drop('Ethnicity', axis=1).join(one_hot)

        df_selected_test = process_ethnicity(df_selected_test)
        df_selected_train = process_ethnicity(df_selected_train)

    X_test = df_selected_test.drop([target_col, 'Subject ID'], axis=1)
    y_test = df_selected_test[target_col].apply(lambda x: 0
                                                  if x == 'D' else 1)
    X_train = df_selected_train.drop([target_col, 'Subject ID'], axis=1)
    y_train = df_selected_train[target_col].apply(lambda x: 0
                                                    if x == 'D' else 1)
    return X_train, X_test, y_train, y_test


def train_and_predict(X_train, y_train, X_test):
    clf = LogisticRegression(random_state=42,
                             max_iter=200).fit(X_train, y_train)
    return clf.predict_proba(X_test)
