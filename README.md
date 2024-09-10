# Urbanization_change_detection
Urbanization change detection from Landsat 8 images using Data Analytics and Machine Learning

# Overview
This project focuses on detecting urbanization changes using Landsat 8 satellite imagery. The aim is to analyze urban expansion over time by computing various indices and applying machine learning techniques to track and predict changes.

# Key Features
Satellite Data: Utilizes Landsat 8 bands (Blue, Green, Red, NIR, SWIR1, SWIR2) for analysis.

Indices Computation: Calculates NDVI, NDBI, MNDWI, BAEI, and Urban Index to assess vegetation, built-up areas, water bodies, and urban regions.

Visualization: Provides plots and maps to visualize the computed indices and detected urban areas.

Clustering: Applies K-means clustering to classify pixels into urban and non-urban categories.

Change Detection: Computes year-to-year urbanization changes and cumulative changes from the base year (2014).

Forecasting: Utilizes ARIMA and Prophet models for predicting future urbanization trends.

Regression Analysis: Includes linear regression analysis to understand the relationships between year-to-year changes.

# Methodology
Data Preparation: Load and preprocess Landsat 8 imagery bands.

Index Calculation: Compute NDVI, NDBI, MNDWI, BAEI, and Urban Index from the satellite images.

Visualization: Plot indices to visualize vegetation, built-up areas, water bodies, and urban regions.

Clustering: Classify images into urban and non-urban areas using K-means clustering.

Change Analysis: Calculate and visualize urbanization changes over time.

Forecasting: Apply ARIMA and Prophet models to forecast future urbanization trends.

Regression Analysis: Perform linear regression to analyze relationships in the data.

# Installation
Ensure you have the following Python packages installed:

rasterio

numpy

matplotlib

earthpy

scikit-learn

seaborn

pandas

statsmodels

prophet

# Usage
Load Data: Load the Landsat 8 bands into your Python environment.

Compute Indices: Use the provided functions to compute NDVI, NDBI, MNDWI, BAEI, and Urban Index.

Run Clustering: Apply K-means clustering on the computed indices.

Analyze Changes: Calculate and visualize year-to-year changes in urbanization.

Forecast Trends: Use ARIMA and Prophet models for forecasting future urbanization trends.

Perform Regression: Analyze data using linear regression.
