function checkInput(){
    let choice = document.querySelector( 'input[name="choice"]:checked');   
    let min = document.getElementById('minutes').value;

    if(choice.value == "rb"){
        let rbWindow = window.open("windows/rb.html");
        setTimeout(()=>{
            rbWindow.close();
          },  min* 60000);
    }

    else if(choice.value == "pop"){
        let popWindow = window.open("windows/pop.html");
        setTimeout(()=>{
            popWindow.close();
          },  min* 60000);
    }
    else{
        let hhWindow = window.open("windows/hiphop.html");
        setTimeout(()=>{
            hhWindow.close();
          },  min* 60000);    }
}



