export default class SwapiService{

    _apiBase = 'https://swapi.dev/api';

    planetPicture = {
        src: "https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png"
    };

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, recived ${res.status}`)
        }

        const body = await res.json();
        return body;
    }

    async getPlanetPicture(id) {
        await fetch(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            .then((res)=>{
                if(res.ok){
                    this.planetPicture = {
                        src:res.url,
                    }
                }
            })
    }

    async getPlanet(id){
        const planet =  await this.getResource(`/planets/${id}`);
        await this.getPlanetPicture(id);

        return this._transformPlanet(planet , this.planetPicture.src);
    }

    _transformPlanet = (planet, picture)=>{
        return {
            id:this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod:planet.rotation_period,
            diameter:planet.diameter,
            src: picture
        }
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


    async getStarShip(id){
        const starship =  await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    _extractId(item){
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }


    _transformPerson = (person) =>{
        console.log(person);
        return {
            id:this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthDate: person.birth_year,
            eyeColor: person.eye_color,
        }
    }

    _transformStarship = (starship) =>{
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