const f = {
    // Defininizioni di costanti
    O: {x:0, y:0, origin:true},
  
    plan: function(name) {
      f.piano = name;
    },
  
    point: function(xz, yz, n) {
      // f.canvas.drawPoint(xz, yz, n);
      return {x:xz, y:yz, type:'point', 'plainCoords':xz + '-' + yz, plan:f.piano, name:n, distance:f.functions.distance, draw:f.canvas.drawPointFunct, clear:f.canvas.clearPointFunct, line:f.functions.generateLine};
    },
  
    line: function(start, end) {
      var cat = f.cateto(start, end)
      return {points:[start, end], angle:cat.angle, fromCateto:cat, type:'line', draw:f.canvas.drawLine, clear:f.canvas.reset};
    },
  
    cateto: function(start, end) {
      var x = Math.abs(start.x - end.x);
      var y = Math.abs(start.y - end.y);
      var hypo = start.distance(end);
      var notasin = (y / hypo);
      var angle = (Math.asin(notasin) * 57.2958);
      return {'hypo':hypo, height:y, width:x, 'start':start, 'angle':angle, 'end':end, 'type':'cateto'}
    },
  
    segment: function(start, end) {
      var retta = f.line(start, end);
      var lenght = start.distance(end);
      return {'start':start, 'end':end, 'line':retta, 'angle':retta.angle, 'type':'segment', 'lenght':lenght, draw:f.canvas.drawSegmentFunct, clear:f.canvas.clearSegmentFunct, specialTriangle:f.functions.buildSpecialTriangle};
    },
  
    specialTriangle: function(s1, s2) {
      if (((s1.start.x == s1.end.x) || (s1.start.y == s1.end.y)) || ((s2.start.x == s2.end.x) || (s2.start.y == s2.end.y))) {
        var opp = f.functions.getOpposite(s1, s2);
        var rad = f.functions.radice(s1.lenght, s2.lenght);
        var newSeg = f.segment(opp[0], opp[1]);
        return f.functions.buildDefaultSpecialTriangle(s1, s2, newSeg);
      } 
    },
  
    triangle: function(s1, s2) {
      if (((s1.start.x == s1.end.x) || (s1.start.y == s1.end.y)) || ((s2.start.x == s2.end.x) || (s2.start.y == s2.end.y))) {
        return null;
      }
      var opp = f.functions.getOpposite(s1, s2);
      var newSeg = f.segment(opp[0], opp[1]);
      return f.functions.buildDefaultTriangle(s1, s2, newSeg);
    },
  
    functions: {
      distance: function(end) {
        var start = this.valueOf();
        var calc = (Math.pow(Math.abs(start.x - end.x), 2)) + (Math.pow(Math.abs(start.y - end.y), 2));
        return Math.sqrt(calc);
      },
  
      radice: function(a, b) {
        var calc = (Math.pow(Math.abs(a), 2) + Math.pow(Math.abs(b), 2));
        return Math.sqrt(calc);
      },
  
      buildDefaultTriangle: function(a, b, c) {
        var ea = f.functions.getOpposite(a, b);
        var co = f.functions.getCoincidentPoint(a, b);
        ea.push(co);
        var ee = (a.lenght + b.lenght + c.lenght);
        return {segments:{'0':a, '1':b, '2':c}, iterableSegments:[a, b, c], perimeter:ee, draw:f.functions.drawTriangleFunct, clear:f.functions.clearTriangleFunct, points:{list:ea, draw:f.canvas.drawTrianglePoints, clear:f.canvas.clearTrianglePoints}}
      },
  
      getCoincidentPoint: function(a, b) {
        if (a.start.plainCoords == b.start.plainCoords) {
          return a.start;
        } else if (a.start.plainCoords == b.end.plainCoords) {
          return a.start;
        } else if (a.end.plainCoords == b.end.plainCoords) {
          return a.end;
        } else if (a.end.plainCoords == b.start.plainCoords) {
          return a.end;
        }
      },
  
      getOpposite: function(a, b) {
        var cp = f.functions.getCoincidentPoint(a, b);
        var vertices = [a.start, a.end, b.start, b.end];
        var returnA = [];
        var m = cp.plainCoords;
        var count = 0;
        for (v of vertices) {
          if (v.plainCoords == m) {
            delete vertices[count];
          } 
          count++;
        }
        for (e of vertices) {
          if (e != undefined) {
            returnA.push(e);
          }
        }
        return returnA;
      },
  
      buildDefaultSpecialTriangle: function(x, y, hyp) {
        var a = f.functions.getOpposite(x, y);
        var co = f.functions.getCoincidentPoint(x, y);
        a.push(co);
        var com = f.functions.getComponentsFromSegments(x, y);
        var per = (com.x.lenght + com.y.lenght, + hyp.lenght);
        return {segments:{'0':x, '1':y, '2':hyp}, iterableElements:[x, y, hyp], notHypo:[x, y], 'width':com.x.lenght, 'height':com.y.lenght, 'perimeter':per, type:'specialTriangle', hypo:hyp, angle:hyp.angle, draw:f.canvas.drawTriangleFunct, clear:f.canvas.clearTriangleFunct, 'points':{'list':a, 'opposite':co, draw:f.canvas.drawTrianglePoints, clear:f.canvas.clearTrianglePoints}, 'area':f.functions.specialTriangleArea, 'components':com, 'getComponents':f.functions.getComponents}
      },
  
      buildSpecialTriangle: function() {
        var el = this.valueOf();
        if (el.type != 'segment') {
          return;
        }
        if (el.angle == undefined ||  el.angle >= 90 || el.angle < 1) { 
          return;
        }
        var pointInc = f.point(Math.abs(el.start.x), Math.abs(el.end.y));
        var seg1 = f.segment(el.start, pointInc);
        var seg2 = f.segment(pointInc, el.end);
        return f.functions.buildDefaultSpecialTriangle(seg1, seg2, el);
      },
  
      specialTriangleArea: function() {
        var el = this.valueOf();
        var calc = (el.components.x.lenght * el.components.y.lenght) / 2;
        return calc;
      },
  
      getComponentsFromSegments: function(a, b) {
        if (a.start.x == a.end.y) {
          return {'x':a, 'y':b}
        } else {
          return {'x':b, 'y':a}
        }
      },
  
      getComponents: function() {
        var el = this.valueOf();
        if (el.type != 'specialTriangle') {
          return;
        }
        if (el.segments[0].start.x == el.segments[0].end.x) {
          return {'x':el.segments[0], 'y':el.segments[1]}
        } else {
          return {'x':el.segments[1], 'y':el.segments[0]}
        }
      },
  
      generateLine: function(el) {
        return f.line(this.valueOf(), el);
      },
  
      segmentToVector: function() {
        el = this.valueOf();
        return {value:el.lenght, direction:el}
      }
    },
       
    canvas: {
      draw: null,
      init: function() {
        f.canvas.draw = document.getElementById('c').getContext('2d');
        f.canvas.element = document.getElementById('c');
        const ctx = f.canvas.draw;
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = (window.innerHeight - 100); 
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, (f.canvas.element.height - 5));
        ctx.lineTo(f.canvas.element.width, (f.canvas.element.height - 5));
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(5, 0);
        ctx.lineTo(5, f.canvas.element.height);
        ctx.stroke();
        f.canvas.setAxis(ctx);
      },
  
      setAxis: function(ctx) {
        ctx.font = "17px Arial";
        ctx.fillText('x', (ctx.canvas.width - 25), (ctx.canvas.height - 6));
        ctx.fillText('y', 5, 10);
        ctx.fillText('O', 2, (ctx.canvas.height - 2));
      },
  
      drawPoint: function(el, color) {
        color = color ?? 'black';
        el.name = el.name ?? undefined;
        var pos = f.canvas.positionInCanvas(el.x, el.y);
        f.canvas.draw.fillStyle = color; 
        f.canvas.draw.fillRect(pos.x, pos.y, 3, 3);
        if (el.name != undefined) {
          f.canvas.draw.fillText(el.name, pos.x, pos.y + 10);
        }
      },
  
      drawSegmentFunct: function() {
        f.canvas.drawSegment(this.valueOf(), 'black');
      },
  
      clearSegmentFunct: function() {
        f.canvas.drawSegment(this.valueOf(), 'white');
        f.canvas.drawSegment(this.valueOf(), 'white');
        f.canvas.drawSegment(this.valueOf(), 'white');
        f.canvas.drawSegment(this.valueOf(), 'white');
        f.canvas.drawSegment(this.valueOf(), 'white');
      },
  
      drawPointFunct: function() {
        el = this.valueOf();
        f.canvas.drawPoint(el, 'black');
      },
  
      clearPointFunct: function() {
        f.canvas.drawPoint(this.valueOf(), 'white');
        f.canvas.drawPoint(this.valueOf(), 'white');
        f.canvas.drawPoint(this.valueOf(), 'white');
        f.canvas.drawPoint(this.valueOf(), 'white');
        f.canvas.drawPoint(this.valueOf(), 'white');
      },
  
      drawTriangleFunct: function() {
        f.canvas.drawSpecialTriangle(this.valueOf());
      },
  
      clearTriangleFunct: function() {
        f.canvas.drawSpecialTriangle(this.valueOf(), 'white');
        f.canvas.drawSpecialTriangle(this.valueOf(), 'white');
        f.canvas.drawSpecialTriangle(this.valueOf(), 'white');
        f.canvas.drawSpecialTriangle(this.valueOf(), 'white');
        f.canvas.drawSpecialTriangle(this.valueOf(), 'white');
      },
  
      drawTrianglePoints: function() {
        var el = this.valueOf();
        for (seg of el.list) {
          f.canvas.drawPoint(seg);
        }
      },
  
      clearTrianglePoints: function() {
        var el = this.valueOf();
        for (seg of el.list) {
          f.canvas.drawPoint(seg, 'white');
        }
      },
  
      drawLine: function() {
        el = this.valueOf();
        alert('n');
      },
  
      drawSpecialTriangle: function(el, color) {
        color = color ?? 'black';
        for (element of el.iterableElements) {
          var s = f.canvas.positionInCanvas(element.start.x, element.start.y);
          var e = f.canvas.positionInCanvas(element.end.x, element.end.y);
          const ctx = f.canvas.draw;
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(e.x, e.y);
          ctx.stroke();
        }
      },
  
      drawSegment: function(el, color) {
        color = color ?? 'black';
        var s = f.canvas.positionInCanvas(el.start.x, el.start.y);
        var e = f.canvas.positionInCanvas(el.end.x, el.end.y);
        const ctx = f.canvas.draw;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(e.x, e.y);
        ctx.stroke();
      },
  
      positionInCanvas: function(x, y) {
        c = f.canvas.draw;
        x = Math.abs(x);
        y = Math.abs(y - c.canvas.height);
        return {'x':x, 'y':y}
      },
  
      reset: function() {
        f.canvas.draw.clearRect(0, 0, f.canvas.draw.canvas.width, f.canvas.draw.canvas.height);
        f.canvas.init();
      }
    }
  }
  
var a;
var b;
var c;
var s1;
var s2;
  
function a() {
  f.canvas.init();
  a = f.point(150, 150);
  b = f.point(150, 250);
  s1 = f.segment(a, b);
  c = f.point(250, 150);
  s2 = f.segment(a, c);
}
  
Object.prototype.set=function(imp, value) {
  var main = this.valueOf();
  main[imp] = value;
  return main;
}