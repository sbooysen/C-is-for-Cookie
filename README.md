# One Smart Cookie

## What's the deal?
Our goal is to analyze the Girl Scout cookie data to compare and predict sales in high-income vs. low-income areas. Our data encompasses information from 2019-2022, allowing us to see before, during, and after COVID results. Along with the sales analysis, we'll be analyzing the in-person vs online order data to see if we can predict how the majority of the orders will occur next year.

Our project will be focused on the items listed within the Analytical Chart Prediction file.

We will also be looking over the popularity of certain cookies in the various zips/areas that we are analyzing.

## Technologies Used
* Excel
* HTML
* JavaScript
* Postgress13/PGAdmin 4
* Pandas with Jupyter Notebook
* D3 Leaflet
* Tableau
* Supervised Learning (Regression)
* Census for 2020 Household Median Income

## Dataset Used
We will be using Girl Scout Cookie Sales Data (Hornets' Nest) from 2019-2022.

[Zip code boundaries](https://rapidapi.com/VanitySoft/api/boundaries-io-1)

[US Census for Household Income](https://data.census.gov/cedsci/table?q=median%20income&g=0500000US37119%248600000&tid=ACSST5Y2020.S1903 "US Census for Household Income")

[Host Site for D3 Map](www.cookiefrenzy.com)

[Clipart For Presentation](https://www.littlebrowniebakers.com/clipart/)

## Data Cleaning and Analysis
Postgress will be used to clean and merge the data. Excel will be used to organize and sort the data. Pandas will be used to visualize the data as well as manipulate and analyze the data.

Microsoft Excel was used to format the columns into similar data types for the proper connections in Postgres.

The first ERD, as shown below, was the stepping stone for creating our main cookie database.

![ERD_First](https://github.com/sbooysen/Final-Project-Data/blob/catsdatabase/Images/ERD%20SQL/project-ERD_start.PNG)

The final ERD brought in clean data on zip code incomes and service unit territories.
![ERD_Final](https://github.com/sbooysen/Final-Project-Data/blob/catsdatabase/Images/ERD%20SQL/project-ERD_final.png)

## Database Storage
Postgress will be used for housing our database while we store our data in GitHub.

## JavaScript/HTML

For the D3 Leaflet mapping, the zip code areas have been sectioned off and markers are being put in place to relay any information needed when clicking on each area.

![Map Output1](https://github.com/sbooysen/Final-Project-Data/blob/catshtml/Images/html_js/boundaries.PNG)
![Map Output2](https://github.com/sbooysen/Final-Project-Data/blob/catshtml/Images/html_js/zipdata.PNG)

## Machine Learning

![Machine Learning Output](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment2/Images/Stats/sales_by_income.png)

### Description of preliminary data preprocessing
 - **Linear Regression:** Three tables (incomes_final, serviceunits_final, and cookiedata_final) were imported from pgAdmin and read into dataframes (incomes_df, serviceunits_df, and gscd_df, respectively).  The incomes_df was merged with the gscd_df to produce the merged_df.  Two unnecessary columns were dropped and numerical data types were converted to "integer", except for the "bill_zip" column.  Rows that contained "NaN" and "0" values in the median_income column were dropped from the dataframe. We were able to retain approximatly 70% of the original data and had 129,219 rows of data in the lin_reg_df dataframe.

 - **Logistic Regression:** Data preprocessing was the same as it was for linear regression, except that an additional column (high_low_income) was created in order to bucket median_income values into "low" (0) and "high" (1) income areas.

### Description of preliminary feature engineering and feature selection
 - **Linear Regression:** In order to address the question, "Does median income of an area predict boxes of cookies sold per digital transaction?", the single feature (X) was the 'median_income' column in the lin_reg_df (dataframe).  The tartet column (y),was the total number of boxes of cookies per transaction ('grand_total' column of the lin_reg_df dataframe).  This is why it was necessary to merge the incomes_df with the gscd_df, which was previously described.

 - **Logistic Regression:** In order to address the question, "Do sales of cookie types predict income of an area?", multiple features (X) were selected that included columns for all of the individual cookie types only.  The target column (y) was "high_low_income", where "0" was considered a low income area (below $60,000 median income) and "1" was considered a high income area (above $60,000 median income).

### Description of how data were split into training and testing sets
 - **Linear Regression:** We used sklearn train_test_split with the default split of 80% training and 20% testing on the feature and target columns of the "lin_reg_df" dataframe.

![Machine Learning Output1](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment2/Images/Screenshots/lin_reg_1.png)
![Machine Learning Output2](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment2/Images/Screenshots/lin_reg_2.png)

 - **Logistic Regression:** We used sklearn train_test_split with the default split of 80% training and 20% testing on the feature and target columns of the "log_reg_df" dataframe.

![Machine Learning Output3](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment2/Images/Screenshots/log_reg.png)

### Explanation of model choice:
 - **Linear Regression:** We used sklearn LinearRegression() model to fit the training data and make predictions. Because this is continuous data, only the R-squared values, mean squared error, slope, and intercept were calculated.  Because this is not classification, neither a confusion matrix nor accuracy score could be calculated.

 - **Logistic Regression:** We used sklearn LogisticRegression() model to fit the training data and make predictions.  An accuracy score, confusion matrix, and classification report were produced in order to evaluate the model.

## Dashboard
Along with our Tableau graphs, we’ll be using D3 and Leaflet to display our data on an interactive map. It will be hosted in a PowerPoint.

- We are separating the dataset into various categories for analyzation. Using a pie graph, we're separating the cookie types into their sales amounts in order to get an idea of overall popularity.

![Cookie Graph](https://github.com/sbooysen/Final-Project-Data/blob/Stacey_2/Graph%20Images/Cookie_Graph.png)

- Using bar charts and line graphs, we're studying various differences between yearly sales as well as the differences between high and low income area sales.

![Income Graph](https://github.com/sbooysen/Final-Project-Data/blob/Stacey_2/Graph%20Images/Income_Graphs.png)

Our findings with the high and low income areas showed a higher sales amount in the high income areas. We had predicted this to be the case, but also found an interesting variable that potentially skewed the information into favoring this outcome. The higher income areas were more valued by the troops than lower income areas, and therefore the troops would choose mostly high income areas over low income areas. The fact that there are more high income areas to begin with in the dataset, means that there is an imbalance when concluding that one income type buys more boxes than another.

To get a good idea of the discrepancy, we will be graphing the amount of high income zip codes compared to low income zip codes for a more detailed comparison.

## Communication Protocol
We are meeting both on Slack and in-person in order to work on this project together.
