
// Area of Interest (AOI) 

var customBounds = ee.Geometry.Polygon(
  [[
    [81.2725, 16.8500], // southwest corner
    [81.4073, 16.8500], // southeast corner
    [81.4073, 16.9848], // northeast corner
    [81.2725, 16.9848]  // northwest corner
  ]]
);


// Date range and the list of years

var startYear = 2014;
var endYear = 2024;
var years = ee.List.sequence(startYear, endYear);


// Access the Landsat 8 Surface Reflectance dataset

var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                .filterBounds(customBounds);


// Cloud Masking Function

function maskL8sr(image) {
  var qaPixel = image.select('QA_PIXEL');
  var mask = qaPixel.bitwiseAnd(1 << 3).eq(0) // clear
             .and(qaPixel.bitwiseAnd(1 << 4).eq(0)); // no cloud shadow
  return image.updateMask(mask);
}

// Apply cloud mask to dataset
dataset = dataset.map(maskL8sr);


// Function to export bands for each year

var exportBandsForYear = function(year) {
  var yearStr = ee.Number(year).format('%04d');
  // Seasonal filter → Jan to May (clearer skies, less monsoon disturbance)
  var startDate = ee.Date.fromYMD(year, 1, 1);
  var endDate = ee.Date.fromYMD(year, 5, 31);

  // Filter dataset for the specific year and take median composite
  var yearlyData = dataset.filterDate(startDate, endDate).median();

  // Scale reflectance values (as per USGS Landsat Collection 2 guidelines)
  var scaled = yearlyData.select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'])
                         .multiply(0.0000275).add(-0.2);

  // Define visualization parameters
  var visParams = {
    min: 0,
    max: 0.3
  };

  // Display each band in the Earth Engine Code Editor with specific palettes
  Map.addLayer(scaled.select('SR_B2'), {min: 0, max: 0.3, palette: ['black', 'blue']}, 'Band 2 (Blue) ' + year);
  Map.addLayer(scaled.select('SR_B3'), {min: 0, max: 0.3, palette: ['black', 'green']}, 'Band 3 (Green) ' + year);
  Map.addLayer(scaled.select('SR_B4'), {min: 0, max: 0.3, palette: ['black', 'red']}, 'Band 4 (Red) ' + year);
  Map.addLayer(scaled.select('SR_B5'), {min: 0, max: 0.3, palette: ['black', 'gray']}, 'Band 5 (NIR) ' + year);
  Map.addLayer(scaled.select('SR_B6'), {min: 0, max: 0.3, palette: ['black', 'gray']}, 'Band 6 (SWIR1) ' + year);
  Map.addLayer(scaled.select('SR_B7'), {min: 0, max: 0.3, palette: ['black', 'gray']}, 'Band 7 (SWIR2) ' + year);

  // Export each band separately with correct file name formatting
  ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'].forEach(function(band) {
    Export.image.toDrive({
      image: scaled.select([band]),
      description: 'Landsat8_Godavari_' + yearStr.getInfo() + '_8' + band,
      scale: 30,
      region: customBounds,
      fileNamePrefix: 'Landsat8_Godavari_' + yearStr.getInfo() + '_8' + band,
      formatOptions: {
        cloudOptimized: true
      }
    });
  });
};


// Apply the export function to each year

years.evaluate(function(yearList) {
  yearList.forEach(function(year) {
    exportBandsForYear(year);
  });
});
