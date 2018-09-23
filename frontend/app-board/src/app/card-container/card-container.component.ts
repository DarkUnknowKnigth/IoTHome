import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';

export interface cardContent {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  avatar: string;
};
@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnDestroy {
  cols:number=4;
  mobileQuery: MediaQueryList[]=[];
  private _mobileQueryListener: () => void;
  cards: cardContent[] = [
    {
      title: "Casa",
      subtitle: "sistema de control",
      content: "Toma el control absoluto de tu casa, visualiza que esta funcionando y que no",
      image: "../../assets/home.gif",
      avatar: "home"
    },
    {
      title: "Internet de las cosas",
      subtitle: "sistema de control",
      content: " Conecta tus widgets al sistema para recibir informacion en cualquier lugar",
      image: "../../assets/iot.gif",
      avatar: "wifi"
    },
    {
      title: "Monitoreo",
      subtitle: "sistema de monitoreo",
      content: "Puedes ver el consumo de energia en tu hogar, con ayuda de graficos",
      image: "../../assets/graph.gif",
      avatar: "graphic_eq"
    },
    {
      title: "Iluminacion",
      subtitle: "sistema de iluminacion",
      content: "Toma el control de las luces, todo en un solo lugar",
      image: "../../assets/ligth.gif",
      avatar: "highlight"
    }
  ];
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery[0] = media.matchMedia('(max-width: 1200px)');
    this.mobileQuery[1] = media.matchMedia('(max-width:600px)');

    this._mobileQueryListener = () => {
      if(this.mobileQuery[0].matches && this.mobileQuery[1].matches)
      {
        this.cols=1;
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
      console.log(this.mobileQuery);
    };
    this.mobileQuery[1].addListener(this._mobileQueryListener);
    this.mobileQuery[0].addListener(this._mobileQueryListener);
  }
  ngOnDestroy(){    
    this.mobileQuery[1].removeListener(this._mobileQueryListener);
    this.mobileQuery[0].removeListener(this._mobileQueryListener);
  }

}
