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

[Host Site for D3 Map](https://sbooysen.github.io/C-is-for-Cookie/)

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

For the D3 Leaflet mapping, the zip code areas have been sectioned off and markers were put in place to relay any information needed when clicking on each area.

![Map Output1](https://github.com/sbooysen/Final-Project-Data/blob/catshtml/Images/html_js/boundaries.PNG)
![Map Output2](https://github.com/sbooysen/Final-Project-Data/blob/catshtml/Images/html_js/zipdata.PNG)

With additional coding, as seen below, the map has become more intricate.

![Schema](https://github.com/sbooysen/C-is-for-Cookie/blob/catshtml/Images/ERD%20SQL/schemasnap.PNG)

Once both aspects were combined, outlines and markers, we were able to start adding more details to the map. This has also allowed us to more easily study the areas and the sales therein. As can be seen below, with the circles and area outlines combined, we can visualize the data at a glance. The range of colors offer extra distinction to help zero in on the desired information such as box amounts per area per year.

![New map markers](https://github.com/sbooysen/C-is-for-Cookie/blob/catshtml/Images/html_js/layered_initial.png)


## Machine Learning
### Research questions
 - Does median income predict individual digital cookie sales?  This was addressed using a linear regression model.
 - Do sales of coookie types based on single digital transactions predict low or high income areas?  This was addressed using a logistic regression model.

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

### Explanation of changes in model choice:
 - **Linear Regression:** No changes were made in the linear regression model choice since Segment 2.
 - **Logistic Regression:** No changes were made in the logistic regression model choice since Segment 2.

### Description of how the model was trained or retrained:
 - **Linear Regression:** The model was retrained on scaled data created by StandardScaler() because the R-squared on raw data was 0.0002 and mean squared error was 137.58. The sklearn train_test_split with default split of 80% training and 20% testing was applied to the scaled data as before.

![insert lin_reg_tts_scaled here](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/lin_reg_tts_scaled.png)

 - **Logistic Regression:** The model was retrained initially on scaled data creating by StandardScaler() because precision and recall for "0" (low income areas) were 0.27 and 0.0007, respectively, for the model when using raw data. The sklearn train_test_split with default split of 80% training and 20% testing was applied to the scaled data as before.  

![insert log_reg_tts_scaled here](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/log_reg_tts_scaled.png)

Further attempts to retrain the logistic regression model were performed using SMOTEENN and SMOTE.  Results of the logistic regression model did not improve when using scaled data.  Because there was such discrepancy between the number of digital sales in "0" (low income areas) and "1" (high income areas), SMOTEENN was selected to increase the number of "0" data points while also reducing the number of "1" (high income areas) data points. SMOTE was used to oversample "0" (low income areas) data points only. The sklearn train_test_split was applied to the resampled data in both instances using a default split of 80% training and 20% testing.
 
**SMOTEENN train_test_split:**

![insert SMOTEENN_tts](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/SMOTEENN_tts.png)

**SMOTE train_test_split:**

![insert SMOTE_tts](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/SMOTE_tts.png)

### Description and explanation of each model's confusion matrix and accuracy score:
 - **Linear Regression:** R-squared values were used to score the model because continuous data were used, not classification data.  R-squared values remained the same at 0.0002 for models created on raw data and scaled data (see below) even though the model coefficient and intercept increased for scaled data.  Mean squared error remained the same at 137.58, most likely due to outliers in the data.  Overall, the linear regression model is not a good predictor of boxes sold per digital transaction based on median income.
 - 
**Linear Regression Model on Raw Data:**

![insert lin_reg_score_raw](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/lin_reg_score_raw.png)

**Linear Regression Model on Scaled Data:**

![insert lin_reg_score_scaled](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/lin_reg_score_scaled.png)

 - **Logistic Regression:**  Precision and accuracy scores were identical for the logistic regression model performed on raw data and scaled data.  The accuracy score was 0.747.  Precision for predicting "0" (low income areas) was 0.27 with a recall of 0.0007, whereas precision for predicting "1" (high income areas) was 0.75 with a recall of 1.00. The difference was most likely due to a class imbalance, so the logistic regression was further performed on resampled data using SMOTEENN and SMOTE.

The balanced accuracy score from the logistic regression using SMOTEENN on raw data was 0.50, but the imbalanced classification report did show slight changes.  Precision for "0" (low income areas) increased slightly to 0.30 and recall increased slightly to 0.20, whereas precision remain the same for "1" (high income areas) at 0.75 with a recall of 0.98. 

The balanced accuracy score from the logistic regression using SMOTE on raw data was 0.54. Based on the imbalanced classification report, precision for predicting "0" (low income areas) was 0.28, but a substantial improvement was found in the recall score of 0.60.  Precision for predicting "1" (high income areas) was 0.78 but recall dropped significantly to 0.49.

**Accuracy score, confusion matrix, and classification report for logistic regression on raw data:**

![insert log_reg_accuracy](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/log_reg_accuracy.png)

**Accuracy score, confusion matrix, and classification report for logistic regression on scaled data:**

![insert log_reg_accuracy_scaled](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/log_reg_accuracy_scaled.png)

**Balanced accuracy score, confusion matrix, and imbalanced classification report for logistic regression with SMOTEENN on raw data:**

![insert SMOTEENN_accuracy](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/SMOTEENN_accuracy.png)

**Balanced accuracy score, confusion matrix, and imbalanced classification report for logistic regression with SMOTE on raw data:**

![insert SMOTE_accuracy](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment3/Images/Screenshots/SMOTE_accuracy.png)

### Summary of machine learning models:
 - **Linear Regression:** Median income is not a good predictor of number of boxes sold per digital transaction.  Individuals are just as likely to purchase the same number of boxes of cookies in any given transaction irrespective of median income. The high mean squared error (MSE) can be attributed to high variation and outliers in sales data. 

 - **Logistic Regression:** Types and the numbers of cookies sold per digital transaction are not a good predictor of high or low income areas. This considers scaled data and resampled data using SMOTEENN and SMOTE. 

 - **Suggested Analyses:**  While not performed in these analyses, an ANOVA could be used to determine differenes in total cookie sales per year or differences in sales per cookie type per year.

## Dashboard
Along with our Tableau graphs, we’ll be using D3 and Leaflet to display our data on an interactive map. It will be hosted in a PowerPoint.

### Visualizing the Data

In total, we created six graphs to display our findings on cookie sales over the last four years. 

[Tableau Cookie Story Book](https://public.tableau.com/views/CookieTimeStorybook-2/StoryGraphs?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link)

We began with a look at the overall sales totals for 2019-2022. There was a large spike around COVID's peak, which was a result of the cookie data itself consisting purely of purchases made through ‘Digital Cookie’. This method of payment processing only accepts debit or credit cards, which leaves out any purchases made with cash.

![Line_Graph_Sales]( https://github.com/sbooysen/C-is-for-Cookie/blob/Stacey_3/Images/Graph%20Images/Linechartsales.png)

Next, we sorted the popularity of each cookie in total as well as separately through 2019-2022. As can be seen below, Thinmints, Samoas, and Tagalongs are consistently ranked as the most popular cookie choice among customers. 

![Cookie Popularity]( https://github.com/sbooysen/C-is-for-Cookie/blob/Stacey_3/Images/Graph%20Images/Piecharts.png)

Once we had the popularities displayed, we looked into which method of delivery was most used throughout the last four years. Our goal was to see if the delivery methods were vastly changed due to COVID, and to predict whether or not it would continue to be affected if that happened to be the case.

![Cookie delivery]( https://github.com/sbooysen/C-is-for-Cookie/blob/Stacey_3/Images/Graph%20Images/Cookiesaletype.png)

As shown above, the in-hand methods were lowest to begin with, however, they are also the only delivery method that is on a steady increase. One the other hand, the In-Person Delivery and Shipping categories went up sharply in 2021, but are now seeing a slight decrease in 2022.

Although it could indicate that the In-Person and Shipping delivery methods might start to decline again, they are not declining at a rapid rate. Since the COVID situation has become more lax, it could simply indicate that more people are going out and either paying directly at a booth, or with cash.

Our next inquiry came from the differences in sales for high and low income levels. We wanted to know which income level tended to purchase more cookies, and as shown below, it looks to be the high-income areas that buy the most.

![High low income]( https://github.com/sbooysen/C-is-for-Cookie/blob/Stacey_3/Images/Graph%20Images/CashvsDigital.png)

While this seems straightforward, it is also worth noting that there are far more troops going to the high-income areas to begin with. The data is slightly skewed as a result. Since we do not have an even amount of troops in both high and low income areas, it only makes sense for the high-income areas to have the most sales.

After analyzing the digital cookie data, we brought in the numbers for the cash sales to compare with what we already had. The cash sales are generally booth-related, and therefore the number of boxes sold through this method decreased drastically during COVID’s height.

Overall, the visuals showed us mostly predicted outcomes, though within those outcomes we ran into technicalities that complicated the data slightly. It was determined that the sales were indeed affected by COVID, but had a few other complications in the mix. Things such as the cookie shortage and the income of the areas that were visited by troops.

## Communication Protocol
We are meeting both on Slack and in-person in order to work on this project together.
