let cityes = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент
49.46,30.17,Київ,2868702,
49.46,30.17,Дніпро,1001094,
49.46,30.17,Одеса,1017022,
49.46,30.17,Львів,729038,

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
49.46,30.17,Запоріжжя,766268,
49.46,30.17,Суми, 268874,
49.46,30.17,Бахмут,77474,
49.46,30.17,Умань,86621,

# в этом файле три строки-коммента :)`;

function topTenCityes(cityes) {
    let city = cityes
        .split("\n")
        .filter(city => /^\d+/.test(city))
        .map(str => {
            let data = str.split(',');
            return new Map([['x', data[0]],['y', data[1]],['name', data[2]],['population', data[3]]]);
        })
        .sort((a, b) => b.get('population') - a.get('population'))
        .slice(0,10)
        .reduce((accum, item, index) => {
            return {...accum, [item.get('name')] : {population: item.get('population'), rating: index + 1}}
        },{})

    return function() {
        return Object.entries(city)
        .reduce((accum, [key, value]) => {
            return accum += `${key} (${value.rating} место в ТОП-10 самых крупных городов Украины, население ${value.population} человек) \n`
        }, '')

    };
 
}

let topCityes = topTenCityes(cityes);

console.log(topCityes());


