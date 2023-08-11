import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
    const headers = {
        'X-RapidAPI-Key': '10e9835ecdmshefa2b3b5a14f247p172a31jsn816045e2d390',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    let response;
    if (!manufacturer)
        response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars`, {
            headers: headers
        })
    else
        response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
            headers: headers
        })

    const result = await response.json()
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 1000;
    const milageFactor = 0.1;
    const ageFactor = 0.5;
    const mileageRate = city_mpg * milageFactor
    const ageRate = (new Date().getFullYear() - year) * ageFactor

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

    return rentalRatePerDay.toFixed(0)
}



export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    //key   hrjavascript-mastery
    const url = new URL('https://cdn.imagin.studio/getimage');
    const { make, year, model } = car;
    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelfamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);


    return `${url}`

}


export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);

    const newPathName = `${window.location.pathname
        }?${searchParams.toString()}`;

    return newPathName
}