# Urbanization Change Detection Using Landsat 8 & Machine Learning
Urbanization change analysis from Landsat 8 imagery using spectral indices, unsupervised machine learning, anomaly detection, and time-series analytics.

# Overview
This project quantifies urban expansion from 2014–2024 using seasonally consistent Landsat 8 Surface Reflectance data.
It combines spectral index–based feature engineering, unsupervised clustering, anomaly detection, and temporal analysis to detect, validate, and analyze urban growth in a vegetation-dominated landscape.

# Dataset Collection (Google Earth Engine)

Source: Landsat 8 Collection 2 Level-2 Surface Reflectance

Platform: Google Earth Engine (GEE)

AOI: Custom polygon over the Godavari urban region

Years: 2014–2024

Season: January–May (reduced clouds & monsoon effects)

# Preprocessing

Cloud and shadow masking using QA_PIXEL

Yearly median composites

Reflectance scaled using USGS guidelines

Bands used: Blue, Green, Red, NIR, SWIR1, SWIR2

Exported as 30 m cloud-optimized GeoTIFFs

# Spectral Indices

Computed per pixel:

NDVI – vegetation

NDBI – built-up areas

MNDWI – water bodies

BAEI – built-up enhancement

Urban Index (UI)

These indices form the feature space for all models.

# K-Means Urban Classification

K-Means (k = 2) applied on multi-index feature space

Urban cluster identified automatically using higher mean NDBI

Outputs:

Binary urban / non-urban maps (per year)

Year-wise urban percentage

Urban change trends

# K-Means Accuracy Assessment

Reference: NDBI threshold (NDBI > 0 → Urban)

Metrics:

Overall Accuracy

Kappa

Precision, Recall, F1 (Urban)

Producer’s & User’s Accuracy

Evaluated independently for 2014–2024

Results exported as accuracy_assessment_results.csv

# Isolation Forest–Based Urban Detection
Concept

Urban pixels are treated as spectral anomalies within a vegetation-dominated landscape.
Isolation Forest detects these anomalies without assuming class balance or linear separability.

Model Details

Features: NDVI, NDBI, MNDWI, BAEI, UI

Standardized feature space

200 trees, parallel processing

Anomaly = Urban, Normal = Non-Urban

Adaptive Contamination

Expected urban fraction estimated from NDBI > 0

Multiple contamination values tested

Best model selected using a spectral separation (urban quality) score

Outputs

Binary urban maps

Continuous anomaly score maps (urban intensity proxy)

Year-wise urban percentages

# Urban Change Analysis

Year-to-year urban change (%)

Cumulative change from base year (2014)

3-year moving average smoothing

Comparison with simple NDBI threshold results

# Validation (Manual Interpretation)

Stratified random sampling (urban & non-urban)

200–400 sample points

CSV export with coordinates, indices, predictions, and Google Earth links

Ground truth labeled manually using high-resolution imagery

Supports standard accuracy metrics (OA, F1, Kappa)

# Forecasting & Trend Analysis

ARIMA and Prophet for future urban growth

Linear regression for long-term trend interpretation

# Installation

Required packages:

rasterio

numpy

pandas

matplotlib

seaborn

scikit-learn

statsmodels

prophet

# Use cases: 
Urban growth monitoring, Urban planning and zoning, Land-use and land-cover change analysis, Detection of unplanned urban development, Environmental impact assessment, Policy impact evaluation, Urban growth forecasting, Remote sensing and urban studies research
