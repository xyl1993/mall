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

  //收集formId
  if(e && e.detail.formId){
	  api.post("/tplConfig", { formId: e.detail.formId }).then(res => {
		  console.log("=======收集formId======");
		
	  });
  };
  
}