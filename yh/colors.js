  var Links = {
    setColor:function (color) {
      var alist = document.querySelectorAll('a');
      var i = 0;
        while(i < alist.length) {
          alist[i].style.color = color;
          i+=1;
        }
    }
  }
  var Body = {
    setColor:function (color){
      document.querySelector('body').style.color = color;
    },
    setbackgroundColor:function (color) {
      document.querySelector('body').style.backgroundColor = color;
    }
  }
  function change(self) {
    var target = document.querySelector('body');
    if(self.value === 'day'){
      Body.setbackgroundColor('white');
      Body.setColor('black');
      self.value = 'night';
      Links.setColor('blue');
    }
    else {
      Body.setbackgroundColor('black');
      Body.setColor('white');
      self.value = 'day';
      Links.setColor('powderblue');

    }
  }
