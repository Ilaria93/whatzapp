$(document).ready(function(){
    //intercetto il focus dell'input del messaggio
    $('.new-message').focus(function(){
        //tolgo le classi fa-microphone dall'icona di destra
        // aggiungo le classi fa-paper-plane
        $('.icon-right i').removeClass('fa-microphone').addClass('fa-paper-plane');
    });
    $('.new-message').blur(function(){
        //tolgo le classi fa-paper-plane dall'icona di destra
        // aggiungo le classi fa-microphone
        $('.icon-right i').removeClass('fa-paper-plane').addClass('fa-microphone');
    });
//devo collegare cio che scrivo nell'input alla Chat
//seleziono l'icona di invio messaggio
    $('.send-sms').click(sendMessage);


    //devo intercettare il tasto enter nel campo di input del messaggio
    $('.new-message').keypress(function(){
        //verifico se l'utente ha digitato ENTER
         if(event.which == 13){
            sendMessage();
        };
    });

    //devo attiavre la ricerca sulla sinistra
    $('.search-box').keyup(function(){
        var searchName = $('.search-box').val().trim().toLowerCase();
        if(searchName != ''){
            $('.message').each(function(){
                var textMessage = $(this).find('.name').text().toLowerCase();
                console.log(textMessage + " == " + searchName);
                if(textMessage.includes(searchName)){
                    console.log('testo uguale');
                    $(this).show();
                }else{
                    console.log('testo diverso');
                    $(this).hide();
                }
            });
        }else {
            $('.message').show();
        }
    });
    //intercetto il click su un contatto
    $('.message').click(function(){
        //recupero il valore del''attributo data-chat del contatto su cui ho cliccato
        var chatMsg = $(this).attr('data-chat');
        console.log(chatMsg);
        //tologo la classe active1 a tutti i div center-chat per nascondere tutti i pannelli delle chat
        $('.center-chat').removeClass('active2');
        //recupero il div center-chat che lo stesso attributo  data-chat del contatto su cui ho cliccato e ci asssegno la classd active
        $('.center-chat[data-chat="' + chatMsg + '"]').addClass('active2');
        //recupero il nome del contatto su cui ho cliccato
        var nameChat= $(this).find('.name').text();
        console.log(nameChat);
        //inserisco il nome nella parte di intestazione di destra
        $('.top-right-name').text(nameChat);
        //recuperom il percorso del file dell'immagine del contatto su cui ho cliccato
        var srcContact = $(this).find('.msg-left img').attr('src')
        console.log(srcContact);
        //imposto il percorso del file dell'immagine nella partebdi intestazione di destra
        $('.top-rgh-left img').attr('src', srcContact);

    });


    $(document).on('click','.message3.message1', function(){
        $(this).find('.message-option').toggleClass('active');
        var msg = $(this);
        $(this).find('.message-delete').click(function(){
            msg.remove();
        });
    });


    function sendMessage(){
        //recupero il testo inserito dall'utente nell'input
        var chatText = $('.new-message').val();
        console.log(chatText);
        if(chatText.trim() != '' ) {
            var time = hourSms();
            //copio l'elemento template per creare un nuovo messaggio
            var newMessage = $('.template .message3').clone();
            newMessage.find(".chat-time").text(time);
            //aggiungo la classe message1 al messaggio
            newMessage.addClass('message1');
            //inserisco il testo letto dall'input
            newMessage.children('.chat-sms').text(chatText);
            //aggiungo il nuovo messaggio
            $('.center-chat.active2').append(newMessage);
            //dopo aver inserito il messaggio resetto l'input
            $('.new-message').val('');
            //mando la risposta del pc
            setTimeout(reciveSms, 1500);
        };
    };
    //devo far si che quando clicco sull'invio del massaggio il computer mi generi una risposta di rimando
    function reciveSms(){
        var time = hourSms();
        //creo una variabile con la risposta
        var answer = "Sei pronto per l'avventura?"
        //copio l'elemento template per creare un nuovo messaggio
        var nowMessage = $('.template .message4').clone();
        nowMessage.find(".chat-time").text(time);
        //aggiungo la classe message2 al messaggio
        nowMessage.addClass('message2');
        //inserisco il testo letto dall'input
        nowMessage.children('.chat-sms').text(answer);
        //aggiungo il nuovo messaggio
        $('.center-chat.active2').append(nowMessage);
    };
    function hourSms() {
        var sms = new Date();
        var hour = sms.getHours();
        var minutes = sms.getMinutes();
        var time = hour + ':' + minutes;
        return time;
    }
});
