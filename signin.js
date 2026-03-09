document.getElementById('signIn_btn').addEventListener('click', function(){
    let inputText = document.getElementById('input_text').value;
    let inputPin = document.getElementById('input_pin').value;

    if(inputText === 'admin' && inputPin === 'admin123'){
        window.location.href = 'tracker.html';
    }
    else{
        alert('Number and Pin not correct');
    }
})



