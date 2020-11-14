import {RESTDataSource} from "apollo-datasource-rest"

export default class MockApi extends RESTDataSource {
	 constructor() {
		  super();
		  this.baseURL = 'http://localhost:3333/';
	 }
	 
	 async fetchPerson(input) {
		  return this.get(`person/${input}`);
	 }
	 
	 async fetchFacility(val1) {
		  return this.get(`facility/${val1}`);
	 }
	 
	 async fetchExposure(val2) {
		  return this.get(`exposure/${val2}`);
	 }
}