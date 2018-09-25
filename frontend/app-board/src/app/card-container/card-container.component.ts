import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import { Button } from 'protractor';

export interface cardContent {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  avatar: string;
  buttons:Array<{}>;
};

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnDestroy {
  cols:number=4;
  rows:number=500;
  selected="default";
  mobileQuery: MediaQueryList[]=[];
  private _mobileQueryListener: () => void;
  cards: cardContent[] = [
    {
      title: "Casa",
      subtitle: "sistema de control",
      content: "Toma el control absoluto de tu casa, visualiza que esta funcionando y que no",
      image: "../../assets/home.gif",
      avatar: "home",
      buttons:[{view:"Porton",id:"porton"},{view:"Bomba de agua",id:"bomba"}]
    },
    {
      title: "Internet de las cosas",
      subtitle: "sistema de control",
      content: " Conecta tus widgets al sistema para recibir informacion en cualquier lugar",
      image: "../../assets/iot.gif",
      avatar: "wifi",
      buttons:[{view:"Camara",id:"camara"},{view:"Bocina",id:"bocina"}]
    },
    {
      title: "Monitoreo",
      subtitle: "sistema de monitoreo",
      content: "Puedes ver el consumo de energia en tu hogar, con ayuda de graficos",
      image: "../../assets/graph.gif",
      avatar: "graphic_eq",
      buttons:[{view:"Luz",id:"luz"},{view:"Agua",id:"agua"}]
    },
    {
      title: "Iluminacion",
      subtitle: "sistema de iluminacion",
      content: "Toma el control de las luces, todo en un solo lugar",
      image: "../../assets/ligth.gif",
      avatar: "highlight",
      buttons:[{view:"Sala",id:"sala"},{view:"Patio",id:"patio"},{view:"Cocina",id:"cocina"},{view:"Recamara",id:"recamara"},{view:"Despacho",id:"despacho"},{view:"Cochera",id:"cochera"}]
    }
  ];

  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private httpclient:HttpClient) {
    this.mobileQuery[0] = media.matchMedia('(max-width: 1200px)');
    this.mobileQuery[1] = media.matchMedia('(max-width:600px)');

    this._mobileQueryListener = () => {
      if(this.mobileQuery[0].matches && this.mobileQuery[1].matches)
      {
        this.cols=1;
        this.rows=500;

      }
      if( this.mobileQuery[0].matches && !(this.mobileQuery[1].matches))
      {
        this.cols=2;
      }
      if( !(this.mobileQuery[0].matches) && !(this.mobileQuery[1].matches))
      {
        this.cols=4;
      }
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery[1].addListener(this._mobileQueryListener);
    this.mobileQuery[0].addListener(this._mobileQueryListener);
  }

  ngOnDestroy(){
    this.mobileQuery[1].removeListener(this._mobileQueryListener);
    this.mobileQuery[0].removeListener(this._mobileQueryListener);
  }
  toggle()
  {
    
  }
  avalible():boolean
  {
    if(this.selected=="default")
    {
      return true;
    }
    return false;
  
  }
  data:any;
  send($event)
  {
    if($event.srcElement.value==undefined)
      this.data={"main":$event.toElement.parentNode.value,"component":this.selected};
    else
      this.data={"main":$event.srcElement.value,"component":this.selected};
    this.httpclient.get('http://localhost:5000/'+this.data.main+"/"+this.data.component)
    .subscribe((data)=>{
      console.log(data);
    });
  }

}
