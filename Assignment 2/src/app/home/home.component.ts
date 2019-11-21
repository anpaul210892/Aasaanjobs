import { Component, OnInit } from '@angular/core';
import { JobListService } from '../job-list.service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  continentsList:Array<any>;
  countryList:Array<any>;
  subscription: Subscription;
  constructor(private jobservice:JobListService) { }

  ngOnInit() {
    (function(){
      // Slide In Panel - by CodyHouse.co
    var panelTriggers = document.getElementsByClassName('js-cd-panel-trigger');
    if( panelTriggers.length > 0 ) {
      for(var i = 0; i < panelTriggers.length; i++) {
        (function(i){
          var panelClass = 'js-cd-panel-'+panelTriggers[i].getAttribute('data-panel'),
            panel = document.getElementsByClassName(panelClass)[0];
          // open panel when clicking on trigger btn
          panelTriggers[i].addEventListener('click', function(event){
            event.preventDefault();
            addClass(panel, 'cd-panel--is-visible');
          });
          //close panel when clicking on 'x' or outside the panel
          panel.addEventListener('click', function(event){
            if( hasClass(event.target, 'js-cd-close') || hasClass(event.target, panelClass)) {
              event.preventDefault();
              removeClass(panel, 'cd-panel--is-visible');
            }
          });
        })(i);
      }
    }
    
    //class manipulations - needed if classList is not supported
    //https://jaketrent.com/post/addremove-classes-raw-javascript/
    function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);
        else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    function addClass(el, className) {
       if (el.classList) el.classList.add(className);
       else if (!hasClass(el, className)) el.className += " " + className;
    }
    function removeClass(el, className) {
        if (el.classList) el.classList.remove(className);
        else if (hasClass(el, className)) {
          var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
          el.className=el.className.replace(reg, ' ');
        }
    }
  })();
  
    this.loadContinentsData();
  }

  loadContinentsData() {
    this.jobservice.getContinents().subscribe((resp: Response) => {      
      this.continentsList = resp['continents'];
      (error)=>console.log(error)      
    });
}

getIndex() {
  var _self = this;
  var g = document.getElementsByClassName('button');
  for (var i = 0, len = g.length; i < len; i++)
  {
    let h = g[i] as HTMLElement;
    (function(index){
        h.onclick = function() {
          var country = document.getElementsByClassName("fa fa-map-marker")[index].nextSibling['data'].split(',')[2].trim();
          _self.getCountryDetails(country);
        }    
    })(i);
  }
}

getCountryDetails(country:string) {
  if(this.subscription) {
    this.subscription.unsubscribe();
  }
  this.subscription = this.jobservice.getCountryDetails(country).subscribe((resp: Response) => {      
    this.countryList = resp['country'];
    (error)=>console.log(error)      
  });
}

filterJobs(continent:string) {
 document.getElementsByClassName('drop')[0]['innerHTML'] = continent ? continent['name']: 'Job Location';
 var countries = document.getElementsByClassName("fa fa-map-marker");
 for(var i=0; i<countries.length; i++) {
  if(continent) {
    var country = countries[i].nextSibling['data'].split(',')[2].trim();
    document.getElementsByClassName('job-ad-item')[i]['hidden'] = true;
    for (var j=0; j<continent['countries'].length; j++) {
      if(country === continent['countries'][j]['code']){
        document.getElementsByClassName('job-ad-item')[i]['hidden'] = false;
        break;
      }
    }
  } else {
    document.getElementsByClassName('job-ad-item')[i]['hidden'] = false;
  }
 }
}
}
