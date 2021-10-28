const glossary = {
    feature: 'Features (or columns) are individual variables that act as input in your model. Examples include age, sex, and income.',
    "bivariate distribution": "A bivariate distribution is the distribution of two variables combined. This can tell us how two variables are related and if there's any correlation.",
    "scatter plot": "Scatter plots contain one dot per data point (row), so each dot represents one measurement (i.e. one person, one event).",
    "box plot": "Box plots show the distribution of a numerical variable for each value of a categorical variable.",
    "stacked bar chart": "For every combination of the two variables, a stacked bar chart shows the frequency of the cominbation occuring in the dataset.",
    distribution: "A distribution of a variable is its shape, which shows the values in the data and how frequently they each occur. Distributions can be visualized in many ways depending on the type of variable."
}

// return alphabetically sorted
export default Object.keys(glossary).sort().reduce(
    (obj, key) => { 
      obj[key] = glossary[key]; 
      return obj;
    }, 
    {}
  );