export default class SwapiService{

    _apiBase = 'https://swapi.dev/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';

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

    getPlanetPicture = async (id) => {
        await fetch(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            .then((res)=>{
                if(res.ok){
                    this.planetPicture = {
                        src:res.url,
                    }
                }
            })
    }
    getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`
    }

    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`
    }

    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`
    }

    getPlanet = async (id) => {
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

    getAllPeople = async() => {
        const res = await this.getResource(`/people/`)
        return res.results.map(this._transformPerson);
    }

    getAllPlanets = async() => {
        const res = await this.getResource(`/planets/`)
        return res.results.map(this._transformPlanet);
    }

    getAllStarShips = async() => {
        const res = await this.getResource(`/starships/`)
        return res.results.map(this._transformStarship);
    }

    getPerson = async(id) => {
        const person =  await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    }


    getStarShip = async (id) => {
        const starship =  await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    _extractId(item){
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }


    _transformPerson = (person) =>{
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
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
        }
    }
}