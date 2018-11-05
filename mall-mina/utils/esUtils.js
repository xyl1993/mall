import api from 'api.js';

export function ButtonClicked(self,e) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 1000)

  
}