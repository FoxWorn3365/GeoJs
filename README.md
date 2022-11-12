# GeoJS
**GeoJS** è uno script in Js che ti permette di gestire un piano cartesiano xy con Js.

## ⚠️ Disclaimer
Questo è un progetto **personale**, pertanto non è stato progettato per l'uso "industriale", ma è sviluppato solo come progetto personale.<br>
Quindi è adatto solo per sperimentazioni.

## Utilizzo dei Valori
### Inizializzare il piano cartesiano
Per avviare il piano cartesiano basterà usare una parte dell'oggetto `f`:
```php
f.canvas.init()
```
Questo genera il piano e posiziona le lettere (**x**, **y**, e **O**) 
### Definire il nome del piano
Basta usare la funzione `f.plan(<NOME>)`:
```php
f.plan('peppo');
```
### Definire un punto
```php
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