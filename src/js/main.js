import fs from 'fs';
import csv from 'csv-parser';

// FUNCTIONAL PROGRAMMING FUNCTIONS

// Higher-order function for filtering
const filterBy = (criteria) => (cars) => cars.filter(criteria);

// Curried price range function  
const priceRange = (min) => (max) => (car) => 
    car.Selling_Price >= min && car.Selling_Price <= max;

// Map function for price markup
const addMarkup = (percentage) => (cars) => 
    cars.map(car => ({... car, Selling_Price: car.Selling_Price * (1 + percentage/100)}));

// Reduce for statistics
const getStats = (cars) => ({
    total: cars.length,
    avgPrice: cars.reduce((sum, car) => sum + car. Selling_Price, 0) / cars.length,
    maxPrice: Math.max(...cars.map(car => car.Selling_Price))
});

// Function composition
const analyze = (cars) => {
    console.log("Car Sales Functional Programming Analysis");
    console.log("==========================================");
    
    // Display all cars
    console.log("\n All Cars:");
    cars.forEach(car => console.log(`${car.Car_Name} - ₹${car.Selling_Price}`));
    
    // Filter cars under 100k (curried function)
    const cheapCars = filterBy(priceRange(0)(100000))(cars);
    console.log(`\n Cars under ₹100k: ${cheapCars.length}`);
    
    // Filter by fuel type
    const petrolCars = filterBy(car => car.Fuel_Type === "Petrol")(cars);
    console.log(`Petrol cars: ${petrolCars.length}`);
    
    // Add 10% markup using map
    const markedUpCars = addMarkup(10)(cars);
    console.log(`\nAfter 10% markup:`);
    markedUpCars.slice(0, 3).forEach(car => 
        console.log(`${car.Car_Name} - ₹${Math.round(car.Selling_Price)}`));
    
    // Statistics using reduce
    const stats = getStats(cars);
    console.log(`\n Statistics:`);
    console.log(`Total Cars: ${stats.total}`);
    console.log(`Average Price: ₹${Math.round(stats.avgPrice)}`);
    console.log(`Max Price: ₹${stats.maxPrice}`);
};

// Run the analysis
analyze(sampleCars);