import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
// @ts-ignore
import Swal from '../../../public/js/sweetalert2.all.min.js';
import { ServiciosComponent } from '../servicios/servicios.component.js';
@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.css'
})
export class ExtraComponent implements OnInit {
  playList = false
  @ViewChildren('audio') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;

  canciones = [{
    nombre: "Nueva Vida",
    autor: "Peso Pluma",
    url: "assets/audios/peso-pluma.mp3",
    imagen: 'assets/Peso_Pluma_Genesis.png',
    bandera: true
  },
  {
    nombre: "FutureMask Off",
    autor: "Future",
    url: "assets/audios/mask-off-official-music-video.mp3",
    imagen: 'assets/future.jpg',
    bandera: true
  },
  {
    nombre: "Love Tonight",
    autor: "SHOUSE",
    url: "assets/audios/loveTonight.mp3",
    imagen: 'assets/Love_Tonight.png',
    bandera: true
  },
  {
    nombre: "Feel The Love",
    autor: "Rudimental",
    url: "assets/audios/Rudimental.mp3",
    imagen: 'https://upload.wikimedia.org/wikipedia/en/f/f9/FeeltheLove.jpg',
    bandera: true
  },
  {
    nombre: "Santal 33",
    autor: "Peso Pluma",
    url: "assets/audios/SANTAL33.mp3",
    imagen: 'https://i.scdn.co/image/ab67616d0000b2733caf996221d3be52c747b110',
    bandera: true
  }
    ,
  {
    nombre: "MEMORIAS",
    autor: "Mora, Jhay Cortez",
    url: "assets/audios/memorias.mp3",
    imagen: 'https://i.scdn.co/image/ab67616d0000b273851222dc5c5681bd4c3119d3',
    bandera: true
  },
  {
    nombre: "Mejores Jordans",
    autor: "Oscar Maydon",
    url: "assets/audios/Mejores.mp3",
    imagen: 'https://www.shazam.com/mkimage/image/thumb/Music211/v4/82/97/52/82975232-3357-d53f-e174-774941a3d28f/1963622400469_cover.jpg/375x375cc.webp',
    bandera: true
  },
  {
    nombre: "Murakami",
    autor: "Victor Mendivil",
    url: "assets/audios/MURAKAMI.mp3",
    imagen: 'https://images.genius.com/340fe945f2def0f984a9abdb7fdd3c77.1000x1000x1.png',
    bandera: true
  },
  {
    nombre: "Dias Nublados",
    autor: "Junior H",
    url: "assets/audios/DiasNublados.mp3",
    imagen: 'https://i.scdn.co/image/ab67616d0000b273a360516982fbcaa2db0bb938',
    bandera: true
  },
  {
    nombre: "Luna",
    autor: "Peso Pluma",
    url: "assets/audios/Luna.mp3",
    imagen: 'assets/Peso_Pluma_Genesis.png',
    bandera: true
  }]

  constructor(private servicio: ServiciosComponent) { }
  imagenDisco = 'assets/Peso_Pluma_Genesis.png';
  numeroVerbos: any = 0
  numeroVerbosInicio = 0
  contador = 0
  seleccion=0
  banderaContador = false
  verbos: { ingles: string; español: string[]; pista: string[]; input: string; satus: number; revelar: number; }[] = [];

  ngOnInit(): void {
    this.servicio.consultaJson().then((resp: any) => {
      this.verbos=resp

    }).catch((err => {
      console.log("error")
    }))
  }


  siguiente() {
    this.contador == 9 ? this.contador = 0 : this.contador++
    this.play(this.contador)
  }
  anterior() {

    this.contador == 0 ? this.contador = 9 : this.contador--
    this.play(this.contador)
  }

  valorAuxiliar: any = 0
  siguienteBoton() {
    if (this.numeroVerbos > 0) {
      this.banderaContador = true;
      this.valorAuxiliar = this.numeroVerbos
    }

  }

  siguientesVerbosBoton() {
    /*  this.numeroVerbosInicio=this.numeroVerbos */
    this.numeroVerbos = parseInt(this.numeroVerbos) + parseInt(this.valorAuxiliar)



  }


  playAlbum() {
    this.reiniciar(this.contador)
    this.play(this.contador)
  }


  play(index: number) {
    this.contador = index
    let bandera = false
    const xs: any = this.canciones.filter(elemento => !elemento.bandera)
    if (xs.length != 0) {
      const indiceXs = this.canciones.findIndex(item => item.nombre == xs[0].nombre)

      if (index != indiceXs) {
        this.audioPlayers.toArray()[indiceXs].nativeElement.pause()
        this.canciones[indiceXs].bandera = true
        bandera = true
      }
    }

    const audio = this.audioPlayers.toArray()[index].nativeElement,
      cancion = this.canciones[index]
    if (cancion.bandera) {
      audio.play()
      this.imagenDisco = cancion.imagen
    }
    else {
      audio.pause()
    }
    this.playList = !this.playList
    cancion.bandera = !cancion.bandera


    if (bandera) this.playList = !this.playList
  }

  reiniciar(index: number) {
    const audio = this.audioPlayers.toArray()[index].nativeElement,
      cancion = this.canciones[index]
    audio.currentTime = 0;
  }


  pausar(audio: any) {
    audio.pause()
  }




 


  pista(index: number) {
    let obj = this.verbos[index];
    let pistasHtml = obj.pista.map(p => `<li>${p}</li>`).join('');

    Swal.fire({
      title: "¡Pista!",
      html: `<ul>${pistasHtml}</ul>`,
      icon: "question"
    });
  }


  check(index: number) {
    let obj = this.verbos[index]
    if (obj.input != "") {
      obj.input = obj.input.toUpperCase()
      if (obj.español.includes(obj.input)) {
        obj.satus = 2
      }
      else {
        obj.satus = 3
        obj.revelar < 3 ? obj.revelar++ : obj.revelar = 3
      }
    }
  }


  solucionar(indexx: number) {
    this.verbos[indexx].input = this.verbos[indexx].español[0]
    this.check(indexx)
  }


}
