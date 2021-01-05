export default class SwapiService{

    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, recived ${res.status}`)
        }

        const body = await res.json();
        return body;
    }

    async getAllPeople(){
        const res = await this.getResource(`/people/`)
        return res.results.map(this._transformPerson);
    }

    async getAllPlanets(){
        const res = await this.getResource(`/planets/`)
        return res.results.map(this._transformPlanet);
    }

    async getAllStarShips(){
        const res = await this.getResource(`/starships/`)
        return res.results.map(this._transformStarship);
    }

    async getPerson(id){
        const person =  await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    }

    async getPlanet(id){
        const planet =  await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    }


    async getStarShip(id){
        const starship =  await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    _extractId(item){
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet(planet){
        return {
            id:this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod:planet.rotation_period,
            diameter:planet.diameter,
        }
    }

    _transformPerson(person){
        return {
            id:this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthDate: person.birthDate,
            eyeColor: person.eyeColor,
        }
    }

    _transformStarship(starship){
        return {
            id:this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
        }
    }
}