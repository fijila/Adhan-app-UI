import propertiesList from "../properties.json";

// let galleryUrl = "/UserManagment/api/Gallery/FilterGalleries";

export class APIUrlConstants {
	static BASE_WEB_URL = propertiesList.apiWebServer;

	static API_URLS = {
		// Galleryurl
		// getGallery: galleryUrl,
	};
	static getApiUrl(key) {
		return this.BASE_WEB_URL + this.API_URLS[key];
	}
}
