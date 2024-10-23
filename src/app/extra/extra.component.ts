import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
// @ts-ignore
import Swal from '../../../public/js/sweetalert2.all.min.js';
import { ServiciosComponent } from '../servicios/servicios.component.js';
import { ModalComponent } from '../modal/modal.component.js';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private servicio: ServiciosComponent, private sanitizer: DomSanitizer) { }
  imagenDisco = 'assets/Peso_Pluma_Genesis.png';
  numeroVerbos: any = 0
  numeroVerbosInicio = 0
  contador = 0
  seleccion = 0
  banderaContador = false
  verbos: { ingles: string; español: string[]; pista: string[]; input: string; satus: number; revelar: number; }[] = [];

  ngOnInit(): void {
    this.servicio.consultaJson().then((resp: any) => {
      this.verbos = resp

    }).catch((err => {
      console.log("error")
    }))

    this.practica(6);
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

  practica(day: number) {
    switch (day) {

      case 1:
        /* Invertir una cadena Escribe una función que tome una cadena de texto y devuelva la misma cadena, pero invertida. */
        let cadena: any = "Hola Como Estas";
        cadena = cadena.split('').reverse().join("");
        console.log(cadena);
        break;

      case 2:
        /* Contar las vocales Escribe una función que cuente el número de vocales en una cadena. */
        let cadena2: string = "Hola Como Estas",
          contador = 0,
          vocales = ['A', 'E', 'I', 'O', 'U']
        cadena2.split('').forEach((element: string) => {
          if (vocales.includes(element.toUpperCase())) contador++
        });
        break;

      case 3:
        /* Números primos Escribe una función que determine si un número dado es primo. */

        let numero = 12,
          salida = true;

        if (numero <= 1) salida = false;
        else if (numero == 2) salida = true;
        else {
          let raiz = Math.sqrt(numero)
          if (numero % 2 == 0) salida = false;
          else {
            for (let i = 3; i <= raiz; i += 2) {
              if (numero % i == 0) {
                salida = false
                return;
              }
            }
          }
        }
        console.log(salida)
        break;

      case 4:
        /* Sumar todos los números en un array Escribe una función que sume todos los números de un array. */
        let arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9], sumea = 0;

        arreglo.forEach(element => {
          sumea += element
        });
        console.log(sumea)
        console.log(arreglo.reduce((acc, valor) => acc += valor))


        break;

      case 5:
        /* Encontrar el número más grande en un array Dado un array de números, escribe una función que devuelva el número más grande. */
        let array = [8, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        console.log(Math.max(...array));
        break;

      case 6:
        /* Factorial de un número Escribe una función que calcule el factorial de un número. */
        let factorial = 5, total = 1;
        for (let x = factorial; x > 0; x--) {
          total *= x
        }
        console.log(total)
        break;

      case 7:
        /* Palíndromo Escribe una función que determine si una palabra es un palíndromo. */
        break;

      case 8:
        /* FizzBuzz Escribe una función que imprima los números del 1 al 100. Para múltiplos de 3, imprime "Fizz", 
        para múltiplos de 5, imprime "Buzz" y para múltiplos de ambos, imprime "FizzBuzz". */
        break;

      case 9:
        /*  Eliminar duplicados en un array Escribe una función que elimine los elementos duplicados de un array.*/
        break;

      case 10:
        /* Fibonacci Escribe una función que devuelva los primeros n números de la secuencia de Fibonacci. */
        break;

      case 11:
        /* Encontrar el segundo número más grande en un array Dado un array de números, escribe una función que devuelva el segundo número más grande. */
        break;

      case 12:
        /* Verificar si un número es par o impar Escribe una función que determine si un número es par o impar. */
        break;

      case 13:
        /* Sumar dígitos de un número Escribe una función que sume los dígitos de un número entero dado. */
        break;

      case 14:
        /* Intersección de dos arrays Escribe una función que devuelva un array con los elementos comunes entre dos arrays dados. */
        break;

      case 15:
        /* Anagramas Escribe una función que determine si dos palabras son anagramas entre sí. */
        break;

      case 16:
        /* Capicúa (palíndromo numérico) Escribe una función que determine si un número es un capicúa (palíndromo numérico). */
        break;

      case 17:
        /*  Mayor diferencia en un array Escribe una función que encuentre la mayor diferencia entre dos elementos de un array (en cualquier orden).*/
        break;

      case 18:
        /* Rellenar un array con un valor Escribe una función que reciba dos parámetros: un valor y un número n, y retorne un array con el valor repetido n veces. */
        break;

      case 19:
        /*  Ordenar palabras por longitud Escribe una función que reciba una lista de palabras y las ordene por su longitud, de menor a mayor.*/
        break;

      case 20:
        /* Contar palabras en una cadena Escribe una función que cuente cuántas palabras hay en una cadena de texto. */
        break;
    }
  }


  @ViewChild('peli') private peli!: ModalComponent;
  tituloPelicula = ""
  sipnosisTexto = ""
  sipnosis = ['Doug MacRay es un impenitente criminal, líder de un grupo de despiadados ladrones de bancos que se enorgullecen en robar lo que quieren y salir limpios. Sin accesorios reales, Doug nunca teme perder a nadie cercano a él. Pero todo cambia en el último trabajo de la banda, cuando toman brevemente como rehén al gerente del banco, Claire Keesey. A pesar de haberla dejado ir ilesa, Claire está nerviosa, consciente de que los ladrones saben su nombre y donde vive. Pero ella se permite bajar la guardia cuando conoce a un hombre modesto y encantador llamado Doug, dándose cuenta de que él es el mismo hombre que sólo días antes la había aterrorizado.',
    'David Raskin, un joven prodigio en ciencias, descubre junto a su grupo de amigos los planos para construir una máquina del tiempo, escondidos en los documentos de su difunto padre. Deciden llevar a cabo la construcción de este dispositivo, que les permite viajar al pasado. Al principio, utilizan la máquina para corregir pequeños errores y mejorar su vida cotidiana, como aprobar exámenes y ganar la lotería. Sin embargo, a medida que continúan jugando con el tiempo, comienzan a notar que sus acciones tienen graves repercusiones en el presente.',
    'Christian Wolff (Ben Affleck), un contable genio con autismo que trabaja para organizaciones criminales para ajustar sus finanzas. Mientras es investigado por el Departamento del Tesoro, Christian acepta un trabajo legal en una compañía de robótica, donde descubre un fraude multimillonario. A medida que profundiza en el caso, se encuentra atrapado en una peligrosa conspiración, enfrentando tanto a criminales como a las autoridades mientras su oscuro pasado sale a la luz.',
    'La película narra la vida de Jordan Belfort (Leonardo DiCaprio), un ambicioso corredor de bolsa que construye un imperio financiero a través de fraudes y prácticas corruptas en Wall Street. Con su empresa, Stratton Oakmont, Belfort se sumerge en un estilo de vida de excesos, lujos, drogas y fiestas desenfrenadas, mientras manipula el mercado de valores y engaña a inversionistas. Sin embargo, su ascenso meteórico lo pone en la mira del FBI, lo que desencadena una lucha entre su ambición descontrolada y las consecuencias legales de sus crímenes.',
    'Un adolescente que accidentalmente viaja 30 años al pasado en una máquina del tiempo construida por el excéntrico científico Doc Brown. En el pasado, Marty debe asegurarse de que sus padres se enamoren para no alterar su propia existencia, mientras busca la manera de regresar al presente antes de quedar atrapado en el tiempo.',
    'Marty McFly y Doc Brown mientras viajan al año 2015 para evitar que el hijo de Marty cometa un grave error. Sin embargo, las acciones de Marty alteran el curso de la historia, lo que provoca que Biff Tannen obtenga una fortuna y controle el futuro. Para restaurar el orden, Marty y Doc deben regresar a 1955 y corregir las líneas temporales sin interferir con los eventos del primer viaje en el tiempo.']
  trillerUrl: any = ""
  triller = ['https://www.youtube.com/embed/0pWsKuPRf0Q?si=algxiLkT3KcZcrGi&amp;autoplay=1', 'https://www.youtube.com/embed/X3gZYaejSzc?si=kGabRRAEw4qvNRD7&amp;autoplay=1', 'https://www.youtube.com/embed/8lGVxHhJ5pw?si=FulktNYcWMMPAr0S&amp;autoplay=1', 'https://www.youtube.com/embed/DEMZSa0esCU?si=YxtnHTpFf6kZJWJA&amp;autoplay=1', 'https://www.youtube.com/embed/NDS1myoYUzs?si=S0995zvevrcDXXOl&amp;autoplay=1', 'https://www.youtube.com/embed/nYWDxUIuRvA?si=FzJY8GwU7IYL5GTM&amp;autoplay=1']
  html: any = '<a target="_blank" [href]="trillerUrl">Ver video</a>';

  /* @HostListener('window:resize')
  onResize() {
    console.log("hola")
  } */
  resumen(id: number, titulo: string) {
    this.tituloPelicula = titulo.toUpperCase();
    this.trillerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.triller[id - 1]); // Usar sanitizer
    this.sipnosisTexto = this.sipnosis[id - 1]
    if (window.innerWidth >= 768) {
      this.html = this.sanitizer.bypassSecurityTrustHtml(` <iframe width="100%" height="432px" src="${this.triller[id-1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>  </iframe>`);
    }
    this.peli.openlg({ size: 'lg', animation: true })
  }

}