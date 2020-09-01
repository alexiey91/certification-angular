export interface IWeatherResponse{
    weather: IWeather[],
}

export interface IWeather {
    id: string,
    main: string,
    description: string,
    icon: string
}