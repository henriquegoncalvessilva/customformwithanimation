const input = document.querySelector("#input");
const inputPassword = document.querySelector("#inputPassword");
const body = document.querySelector("body");
const btnShow = document.querySelector("button");
const btnSubmit = document.querySelector("#submit");
let failOnce = false;
let oldValue = "";

const r = new rive.Rive({
  src: "rive.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  animations:'',
  stateMachines: "State Machine 1",
  onLoad: () => {

    const inputs = r.stateMachineInputs("State Machine 1");
    const show = inputs.find((i) => i.name === 'hands_up')
    const check = inputs.find((i) => i.name === "Check");
    const look = inputs.find((i) => i.name === "Look");
    const success = inputs.find((i) => i.name === "success");
    const fail = inputs.find((i) => i.name === "fail");

    btnSubmit.onclick = () =>{
        show.value = false;
        btnSubmit.textContent = 'Checking...'
        if(inputPassword.value.length === 0 || input.value.length === 0){
            body.insertAdjacentHTML('beforebegin','<div id="modalError"></div>');
            fail.fire();
            setTimeout(() => {
                const modal = document.querySelector('#modalError');
                modal.remove();
                btnSubmit.textContent = 'Send'
            }, 2400);
        }
        else{
            r.animations = 'success';
            success.fire();
            body.insertAdjacentHTML('beforebegin','<div id="modalSuccess"></div>');
            
            setTimeout(() => {
                const modal = document.querySelector('#modalSuccess');
                modal.remove();
                btnSubmit.textContent = 'Send'
            }, 4000);
        }
        
    }
    inputPassword.onclick = () =>{
        show.value = true;
    }

    inputPassword.onfocus = () =>{
        show.value = true;
    }
    
    input.onfocus = () =>{
        show.value = false;
    }
    btnSubmit.onfocus = () =>{
        show.value = false;
    }

    
    input.onclick = () =>{
        show.value = false;
        check.value = true;
    }
    
    document.onclick = (e) => {
      e.target != inputPassword ? show.value = false : '';
      e.target != input ? check.value = false : '';
    }
      

    input.addEventListener("beforeinput", (e) => {oldValue = e.target.value;});

    input.oninput = (e) => {
        if(e.target.value.length === 0){
            look.value = 0;
        }
        else if(e.target.value.length < oldValue.length){
            look.value--;
        }
        else{
            look.value++;
        }
    };
  },
});
