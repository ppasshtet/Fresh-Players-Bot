//получение текущего курса Юаня ЦБ РФ

export async function getCurrentCnyRubCourse() {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const data = await res.json()

    return data.Valute.CNY.Value
}