// USE MASK(this,this.value,'-$##,###,##0.00',1);

function MASK(form, n, mask, format) {
    if (format == "undefined") format = false;
    if (format || NUM(n)) {
      dec = 0, point = 0;
      x = mask.indexOf(".")+1;
      if (x) { dec = mask.length - x; }
  
      if (dec) {
        n = NUM(n, dec)+"";
        x = n.indexOf(".")+1;
        if (x) { point = n.length - x; } else { n += "."; }
      } else {
        n = NUM(n, 0)+"";
      } 
      for (var x = point; x < dec ; x++) {
        n += "0";
      }
      x = n.length, y = mask.length, XMASK = "";
      while ( x || y ) {
        if ( x ) {
          while ( y && "#0.".indexOf(mask.charAt(y-1)) == -1 ) {
            if ( n.charAt(x-1) != "-")
              XMASK = mask.charAt(y-1) + XMASK;
            y--;
          }
          XMASK = n.charAt(x-1) + XMASK, x--;
        } else if ( y && "$0".indexOf(mask.charAt(y-1))+1 ) {
          XMASK = mask.charAt(y-1) + XMASK;
        }
        if ( y ) { y-- }
      }
    } else {
       XMASK="";
    }
    if (form) { 
      form.value = XMASK;
      if (NUM(n)<0) {
        form.style.color="#FF0000";
      } else {
        form.style.color="#000000";
      }
    }
    return XMASK;
  }
  
  // Convierte una cadena alfanumérica a numérica (incluyendo formulas aritméticas)
  //
  // s   = cadena a ser convertida a numérica
  // dec = numero de decimales a redondear
  //
  // La función devuelve el numero redondeado
  
  function NUM(s, dec) {
    for (var s = s+"", num = "", x = 0 ; x < s.length ; x++) {
      c = s.charAt(x);
      if (".-+/*".indexOf(c)+1 || c != " " && !isNaN(c)) { num+=c; }
    }
    if (isNaN(num)) { num = eval(num); }
    if (num == "")  { num=0; } else { num = parseFloat(num); }
    if (dec != undefined) {
      r=.5; if (num<0) r=-r;
      e=Math.pow(10, (dec>0) ? dec : 0 );
      return parseInt(num*e+r) / e;
    } else {
      return num;
    }
  }