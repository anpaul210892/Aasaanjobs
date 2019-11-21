import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import {environment} from '../environments/environment';

@Injectable()
export class JobListService { 
  subscription: Observable<any>
  constructor(private http:Http) { }
  getValues(): Observable<Response> {
    let url=environment._userApiurl+'getjobsearchdetails';
    return this.http.get(url).map((response:Response)=>{return response.json();}).catch(this.handleerror);
}
getList(): Observable<Response> {
  let url=environment._userApiurl+'getJobposteddetails';  
  return this.http.get(url).map((response:Response)=>{return response.json();}).catch(this.handleerror);
}

getSearchData(searchdata): Observable<Response> {
  let url=environment._userApiurl+'getJobsearchbuttondetails';  
  let header = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: header });  
  return this.http.post(url,searchdata,options).map((response:Response)=>{return response.json();}).catch(this.handleerror);
}
getSearchDatas(parameters):Observable<Response> {
  let url=environment._userApiurl+'getJobsearchbuttondetails'; 
  let headers = new Headers();
  let options = new RequestOptions({ headers: headers });
  let srchParams: URLSearchParams = new URLSearchParams();
  for (var key in parameters) {
      if (parameters.hasOwnProperty(key)) {
          let val = parameters[key];

          if(Array.isArray(val))
          {
            for (var innerVal in val){
              srchParams.append(key, val[innerVal]);
            }
          }
          else
          {
            srchParams.set(key, val);
          }         
      }
  }
  options.params = srchParams;  
  return this.http.get(url,options).map((response:Response)=>{return response.json();}).catch(this.handleerror);
}

handleerror(error:Response) {
  return Observable.throw(error);
}

getContinents() : Observable<Response>{
  let url= 'https://countries.trevorblades.com/';
  let headers = new Headers();
  let options = new RequestOptions({ headers: headers });
  let requestParams = {"operationName":null,"variables":{},"query":"{continents {code name countries {name code}}}"};
  return this.http.post(url, requestParams, options).map((response:Response)=>{return response.json().data;}).catch(this.handleerror);
}

getCountryDetails(country:string) : Observable<Response> {
  let url= 'https://countries.trevorblades.com/';
  let headers = new Headers();
  let options = new RequestOptions({ headers: headers });
  let requestParams = {"operationName":null,"variables":{},"query":"{country(code: \""+country+"\") {name native emoji currency languages {code name}}}"};
  return this.http.post(url, requestParams, options).map((response:Response)=>{return response.json().data;}).catch(this.handleerror);
}
}
