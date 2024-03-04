import { Visibility, Weather } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }

    return comment
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date)
    }

    return date
}

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather)
    }

    return weather
}

const isWeather = (param: string): param is Weather => {
    // return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str)
    return Object.values(Weather).map(v => v.toString()).includes(param)
}

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param)
}

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility)

    }
    return visibility
}