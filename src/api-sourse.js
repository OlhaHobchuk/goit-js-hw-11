import axios from "axios";


class ImageApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
        this.perPage = 40;
    }

    // fetchImages() {
    //     console.log(this);
    //     return fetch(`https://pixabay.com/api/?key=33499449-ef034a74262b4ba1fb6bf3d8d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&${this.perPage}&${this.page}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.page += 1;
    //             console.log(data);
    //             return data.hits;
    //         }
    //             )
    // }

    async fetchImages() {
        try {
         const response = await axios.get(`https://pixabay.com/api/?key=33499449-ef034a74262b4ba1fb6bf3d8d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&${this.page}`);
            this.page += 1;
            // console.log(response.data);

             if (!response.data.totalHits) {
        throw new Error(response.status);
      }
            return response.data
        } catch (error) {
            console.log(error);
        }
        
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
}



export { ImageApiService };