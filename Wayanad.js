// Define a larger area of interest (AOI) for the new coordinates
var customBounds = ee.Geometry.Polygon(
    [[
      [75.8600, 11.2350], // southwest corner
      [75.9900, 11.2350], // southeast corner
      [75.9900, 11.3550], // northeast corner
      [75.8600, 11.3550]  // northwest corner
    ]]
  );
  
  // Define the date range and the list of years
  var startYear = 2014;
  var endYear = 2024;
  var years = ee.List.sequence(startYear, endYear);
  
  // Access the Landsat 8 Surface Reflectance dataset
  var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
                  .filterBounds(customBounds)
                  .sort('CLOUDY_PIXEL_PERCENTAGE');
  
  // Function to export bands for each year
  var exportBandsForYear = function(year) {
    var yearStr = ee.Number(year).format('%04d');
    var startDate = ee.Date.fromYMD(year, 1, 1);
    var endDate = ee.Date.fromYMD(year, 12, 31);
  
    // Filter dataset for the specific year
    var yearlyData = dataset.filterDate(startDate, endDate).first();
  
    // Check if an image exists for that year
    if (yearlyData) {
      var bands = yearlyData.select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7']);
      
      // Define visualization parameters for debugging
      var visParams = {
        min: 0,
        max: 0.3
      };
  
      // Display each band in the Earth Engine Code Editor with specific palettes
      Map.addLayer(bands.select('SR_B2'), {min: 0, max: 0.3, palette: ['black', 'blue']}, 'Band 2 (Blue)');
      Map.addLayer(bands.select('SR_B3'), {min: 0, max: 0.3, palette: ['black', 'green']}, 'Band 3 (Green)');
      Map.addLayer(bands.select('SR_B4'), {min: 0, max: 0.3, palette: ['black', 'red']}, 'Band 4 (Red)');
      Map.addLayer(bands.select('SR_B5'), {min: 0, max: 0.3, palette: ['black', 'gray']}, 'Band 5 (NIR)');
      Map.addLayer(bands.select('SR_B6'), {min: 0, max: 0.3, palette: ['black', 'gray']}, 'Band 6 (SWIR1)');
      Map.addLayer(bands.select('SR_B7'), {min: 0, max: 0.3, palette: ['black', 'gray']}, 'Band 7 (SWIR2)');
      
      // Export each band separately with correct file name formatting
      ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'].forEach(function(band) {
        Export.image.toDrive({
          image: bands.select([band]),
          description: 'Landsat8_Wayanad_' + yearStr.getInfo() + '_' + band,
          scale: 30,
          region: customBounds,
          fileNamePrefix: 'Landsat8_Wayanad_' + yearStr.getInfo() + '_' + band,
          formatOptions: {
            cloudOptimized: true
          }
        });
      });
    }
  };
  
  // Apply the export function to each year
  years.evaluate(function(yearList) {
    yearList.forEach(function(year) {
      exportBandsForYear(year);
    });
  });
  