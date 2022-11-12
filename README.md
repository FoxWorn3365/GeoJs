# GeoJS
**GeoJS** è uno script in Js che ti permette di gestire un piano cartesiano xy con Js.

## ⚠️ Disclaimer
Questo è un progetto **personale**, pertanto non è stato progettato per l'uso "industriale", ma è sviluppato solo come progetto personale.<br>
Quindi è adatto solo per sperimentazioni.

## Utilizzo dei Valori
### Inizializzare il piano cartesiano
Per avviare il piano cartesiano basterà usare una parte dell'oggetto `f`:
```js
f.canvas.init()
```
Questo genera il piano e posiziona le lettere (**x**, **y**, e **O**) 
### Definire il nome del piano
Basta usare la funzione `f.plan(<NOME>)`:
```js
f.plan('peppo');
```
### Definire un punto
```js
var a = f.point(25, 25);  // f.point(x, y)
```
In questo caso verrà definito un punto e salvato nella variabile `a` che sarà un oggetto:
```js
{
    x: 25,
    y: 25,
    plainCoords: '25-25',
    type: 'point',
    name: undefined,
    plan: 'peppo',
    draw: drawPointFunct(), // Funzione f.canvas.drawPointFunct() utilizzabile solo dall'oggetto.
    clear: clearPointFunct(), // Funzione f.canvas.drawPointFunct() utilizzabile solo dall'oggetto.
    distance: distance(end), // Funzione f.functions.distance(end) | Distanza tra questo punto ed il punto in end
    line: generateLine() // Funzione f.functions.generateLine | Disegna una retta passante per l'origine e questo punto
}
```
Ricordo che in questa documentazione con `element.point` viene indicato questo tipo di Object.
### Definire una retta
```js
var retta = f.line(f.O, a); // f.line(INIZIO, FINE)
```
Viene creata una retta passante per i punti `f.O` ed `a`. Oggetto `retta`:
```js
{
    points: [
        element.point,    // Punto iniziale
        element.point     // Punto finale
    ],
    angle: 45.0000000, // Angolo di inclinazione rispetto all'asse X (coseno)
    fromCateto: element.cateto, // Elemento speciale che viene usato solo per questo scopo. Non risulta utile da definire
    type: 'line',
    draw: drawLineFunct(), // Funzione f.canvas.drawFunct() utilizzabile solo dall'oggetto.
    clear: reset() // Funzione f.canvas.reset() utilizzabile solo dall'oggetto.
}
```
Questo sarà indicato nella documentazione con `element.line`
### Definire un segmento
```js
var seg = f.segment(a, b); // f.segment(PUNTO 1, PUNTO 2)
```
In questo caso verrà creato un segmento tra i due punti indicati. **Sarà sempre positivo**.<br>
Variabile `seg`:
```js
{
    start: element.point, // Punto di partenza (PUNTO 1)
    end: element.point, // Punto di arrivo (PUNTO 2)
    angle: 45.000000, // Angolo di inclinazione rispetto all'asse X (coseno)
    line: element.line,
    type: 'segment',
    draw: drawSegmentFunct(), // Funzione f.canvas.drawSegmentFunct() utilizzabile solo dall'oggetto.
    clear: clearSegmentFunct(), // Funzione f.canvas.drawSegmentFunct() utilizzabile solo dall'oggetto.
    specialTriangle: buildSpecialTriangle() // Funzione f.functions.buildSpecialTriangle(), crea un triangolo rettangolo partendo dall'ipotenusa
}
```
Questo oggetto sarà indicato nella documentazione come `element.segment`