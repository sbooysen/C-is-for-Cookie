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

## Machine Learning
Supervised learning with Logistic and Linear Regression.

The first run of a linear regression model was to test for median income in relation to cookie sales:

Preliminary analysis shows that median income is not a predictor for overall individual sales. Scouts are just as likely to sell the same number of boxes regardless of income area.
![Machine Learning Output](https://github.com/sbooysen/Final-Project-Data/blob/Carter_Segment2/Images/Stats/sales_by_income.png)

## Dashboard
Along with our Tableau graphs, we’ll be using D3 and Leaflet to display our data on an interactive map. It will be hosted in a PowerPoint.

## Communication Protocol
We are meeting both on Slack and in-person in order to work on this project together.
