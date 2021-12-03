import pandas as pd
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

target_col = 'Admission Decision'


def select_features(df_train, df_test, features):
    # TODO: implement features filters, and check if one-hot is needed
    # df.drop(...)
    all_features = ['Subject ID', target_col]

    for feature in features:
        if feature == 'Ethnicity':
            all_features.extend([
                'American Indian or Alaska Native', 'Asian',
                'Black or African American', 'Hispanic',
                'Native Hawaiian or Other Pacific Islander', 'Not Reported',
                'White'
            ])
        else:
            all_features.append(feature)

    df_selected_train = df_train[all_features]
    df_selected_test = df_test[all_features]

    X_test = df_selected_test.drop([target_col, 'Subject ID'], axis=1)
    y_test = df_selected_test[target_col].apply(lambda x: 0 if x == 'D' else 1)
    X_train = df_selected_train.drop([target_col, 'Subject ID'], axis=1)
    y_train = df_selected_train[target_col].apply(lambda x: 0
                                                  if x == 'D' else 1)
    return X_train, X_test, y_train, y_test


def train_and_predict(X_train, y_train, X_test):
    print(X_test.shape)
    pipe = make_pipeline(StandardScaler(),
                         LogisticRegression(random_state=42, max_iter=200))
    pipe.fit(X_train, y_train)
    return pipe[1].coef_[0], pipe.predict_proba(X_test)
