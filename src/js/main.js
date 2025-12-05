import fs from 'fs';
import csv from 'csv-parser';

// Higher-order function for filtering
const filterBy = (criteria) => (vehicles) => vehicles.filter(criteria);

// Curried function for price range filtering
const priceRange = (min) => (max) => (vehicle) => 
    vehicle. Selling_Price >= min && vehicle. Selling_Price <= max;

// Curried function for fuel type filtering  
const fuelType = (type) => (vehicle) => vehicle.Fuel_Type === type;

// Map function for applying markup
const applyMarkup = (percentage) => (vehicles) => 
    vehicles.map(vehicle => ({
        ...vehicle, 
        Selling_Price: Math.round(vehicle.Selling_Price * (1 + percentage/100))
    }));

// Sort function
const sortByPrice = (vehicles) => 
    [... vehicles].sort((a, b) => a.Selling_Price - b. Selling_Price);

// Reduce for counting by criteria
const countBy = (criteria) => (vehicles) => 
    vehicles.reduce((count, vehicle) => criteria(vehicle) ? count + 1 : count, 0);

// Reduce for statistics
const calculateStats = (vehicles) => vehicles.reduce((stats, vehicle) => ({
    total: stats.total + 1,
    totalValue: stats.totalValue + vehicle. Selling_Price,
    maxPrice: Math.max(stats.maxPrice, vehicle. Selling_Price),
    minPrice: Math.min(stats. minPrice, vehicle.Selling_Price)
}), {total: 0, totalValue: 0, maxPrice: 0, minPrice: Infinity});

// Function composition helper
const compose = (...functions) => (data) => 
    functions.reduceRight((result, fn) => fn(result), data);

// 🚗 MAIN ANALYSIS FUNCTION
const analyzeCarSales = (vehicleData) => {
    console.log("CAR SALES FUNCTIONAL PROGRAMMING ANALYSIS");
    console.log("==============================================");
    
    // 1. Display all vehicles
    console.log("\n ALL VEHICLES:");
    vehicleData.forEach(car => 
        console.log(`${car.Car_Name} (${car.Year}) - ₹${car.Selling_Price. toLocaleString()} - ${car.Fuel_Type}`));
    
    // 2. Search vehicles in price range (using curried function)
    console.log("\n VEHICLES UNDER RM300,000:");
    const affordableCars = filterBy(priceRange(0)(300000))(vehicleData);
    affordableCars.forEach(car => 
        console.log(`  • ${car.Car_Name} - ₹${car.Selling_Price.toLocaleString()}`));
    
    // 3. Count vehicles by fuel type (using curried functions)
    const petrolCount = countBy(fuelType("Petrol"))(vehicleData);
    const dieselCount = countBy(fuelType("Diesel"))(vehicleData);
    
    console.log("\n FUEL TYPE DISTRIBUTION:");
    console.log(`  Petrol: ${petrolCount} vehicles`);
    console.log(`  Diesel: ${dieselCount} vehicles`);
    
    // 4. Sort vehicles by price
    console.log("\n VEHICLES SORTED BY PRICE (LOWEST TO HIGHEST):");
    const sortedCars = sortByPrice(vehicleData);
    sortedCars.forEach(car => 
        console.log(`  • ${car.Car_Name} - ₹${car. Selling_Price.toLocaleString()}`));
    
    // 5. Apply 10% markup using map
    console.log("\n PRICES AFTER 10% MARKUP:");
    const markedUpCars = applyMarkup(10)(vehicleData);
    markedUpCars. slice(0, 5).forEach(car => 
        console.log(`  • ${car.Car_Name} - ₹${car.Selling_Price.toLocaleString()}`));
    
    // 6. Calculate statistics using reduce
    const stats = calculateStats(vehicleData);
    const averagePrice = stats.totalValue / stats.total;
    
    console.log("\n STATISTICAL ANALYSIS:");
    console.log(`  Total Vehicles: ${stats.total}`);
    console.log(`  Average Price: RM${Math.round(averagePrice). toLocaleString()}`);
    console.log(`  Highest Price: RM${stats. maxPrice.toLocaleString()}`);
    console.log(`  Lowest Price: RM${stats.minPrice.toLocaleString()}`);
    
    // 7. Function composition example
    console.log("\n🔄 FUNCTION COMPOSITION EXAMPLE:");
    console.log("(Filter Diesel + Sort by Price + Take First 3)");
    
    const composedAnalysis = compose(
        (cars) => cars.slice(0, 3),  // Take first 3
        sortByPrice,                 // Sort by price
        filterBy(fuelType("Diesel")) // Filter diesel cars
    );
    
    const result = composedAnalysis(vehicleData);
    result.forEach(car => 
        console.log(`  • ${car.Car_Name} - ₹${car.Selling_Price.toLocaleString()}`));
    
    console.log("\n FUNCTIONAL PROGRAMMING ANALYSIS COMPLETE!");
    console.log("\n Demonstrated Concepts:");
    console.log("• Higher-order functions (filterBy, countBy)");
    console.log("• Currying (priceRange, fuelType)");
    console.log("• Pure functions (no side effects)");
    console. log("• Immutability (spread operator, no mutations)");
    console.log("• Function composition (compose function)");
    console.log("• Map, Filter, Reduce operations");
};

// RUN THE ANALYSIS
analyzeCarSales(cars);

// Load from CSV
const loadFromCSV = () => {
    const results = [];
    fs.createReadStream('src/data/CAR_DETAILS_FROM_CAR_DEKHO.csv')
        .pipe(csv())
        . on('data', (data) => results.push({
            ... data,
            Year: parseInt(data.Year),
            Selling_Price: parseInt(data.Selling_Price),
            Present_Price: parseInt(data.Present_Price)
        }))
        .on('end', () => {
            console.log("\n CSV Data loaded..");
            console.log("================================================");
            analyzeCarSales(results);
        });
};

loadFromCSV();