const glossary = {
    feature: 'Features (or columns) are individual variables that act as input in your model. Examples include age, sex, and income.',
    "bivariate distribution": "A bivariate distribution is the distribution of two variables combined. This can tell us how two variables are related and if there's any correlation.",
    "scatter plot": "Scatter plots contain one dot per data point (row), so each dot represents one measurement (i.e. one person, one event).",
    "box plot": "Box plots show the distribution of a numerical variable for each value of a categorical variable.",
    "stacked bar chart": "For every combination of the two variables, a stacked bar chart shows the frequency of the cominbation occuring in the dataset.",
    distribution: "A distribution of a variable is its shape, which shows the values in the data and how frequently they each occur. Distributions can be visualized in many ways depending on the type of variable.",
    'confusion matrix': "A table that summarizes a model's performance, comparing the real decisions in the data and the predictions the model makes.",
    accuracy: 'fraction of predictions that a classification model got right',
    algorithm: 'A series of steps (or set of rules) for solving or performing a task',
    'artificial intelligence': 'Any computer system taught to mimic intelligent human behaviors',
    bias: 'Stereotyping, prejudice or favoritism towards some things, people, or groups over others. These biases can affect collection and interpretation of data, the design of a system, and how users interact with a system.',
    confidence: 'The confidence level for a model is a statistical measure of how certain a prediction or outcome is',
    dataset: 'large collections of digital information that are used to train AI',
    'demographic parity': 'fairness metric that is satisfied if the results of a model\'s classification are not dependent on a given sensitive attribute',
    'disparate impact': 'Making decisions about people that impact different population subgroups disproportionately. This usually refers to situations where an algorithmic decision-making process harms or benefits some subgroups more than others',
    diversity: 'Diversity has come to refer to the various backgrounds and races that comprise a community, nation or other grouping. In many cases the term diversity does not just acknowledge the existence of variations in background, race, gender, religion, sexual orientation and so on, but implies an appreciation of these differences',
    'equal opportunity': 'fairness metric that requires that all groups (by sensitive attribute) should be accepted, if qualified, at equal rates',
    ethics: 'guidelines that govern how AI is built and used',
    'individual fairness': 'All similar individuals should receive the same outcome from the model, all accepted or all rejected. A challenge with this is determining what metric(s) is/are appropriate to measure similarity.',
    inequity: 'Lack of fairness or justice',
    intersectionality: 'The concept that a person’s identity and experiences with discrimination is related to the interconnections of their social classifications like race, class, gender, sexuality, and so on.',
    'machine learning': 'A branch of artificial intelligence in which a computer generates rules and predictions based on raw data that has been fed into it',
    'marginalized communities': 'Social marginalization is social disadvantage and relegation to the fringe of society. Marginalized communities are those which are prevented from participating fully in the economic, social, and political life of the society in which they live.',
    recall: 'A metric for classification models that answers the following question: Out of all the possible positive labels, how many did the model correctly identify?',
    precision: 'the frequency with which a model was correct when predicting the positive class',
    'false negative (type 2 error)': 'When the ML algorithm classifies an object as not in a certain category, when it actually is. For example, if it was searching for sneakers, and it didn’t return several true images of sneakers.',
    'false positive (type 1 error)': ' When the machine learning algorithm classifies an object as belonging to a certain category, but it is not in that category. For example, if the algorithm incorrectly identified a sneaker as a llama.',
    'true positive': 'When the machine learning algorithm classifies an object in a certain category, and the object is in that category',
    'true negative': 'When the machine learning algorithm classifies an object as NOT in a certain category and it is indeed not in that specific category. For example, it correctly classifies a llama as “not a sneaker”.',
    model: 'representation of what a machine learning system has learned from the training data',
    overfitting: 'When a model is optimized for predictive power for a training dataset that is narrower than the ML model’s intended use.',
    prediction: 'AI system output of how likely something is to occur',
    'sensitive attribute': 'a human attribute that may be given special consideration for legal, ethical, social, or personal reasons',
    'supervised machine learning': 'When you “teach” your algorithm on training data. Often this is based on examples manually labeled by humans to show “right” and “wrong” answers.',
    training: 'the (often iterative) process of determining the ideal parameters comprising a model.',
    underfitting: 'When a model has a low predictive power across a more varied dataset.',
    'unsupervised machine learning': 'Training a model to find patterns in a dataset, typically an unlabeled dataset. The most common use of unsupervised machine learning is to cluster data into groups of similar examples. For example, an unsupervised machine learning algorithm can cluster songs together based on various properties of the music.',
}

// return alphabetically sorted
export default Object.keys(glossary).sort().reduce(
    (obj, key) => { 
      obj[key] = glossary[key]; 
      return obj;
    }, 
    {}
  );