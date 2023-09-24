const URL_BASE = "http://localhost:5000/amigos";
const imgLoading = $('img');

imgLoading.hide();

const guetting = (data) => {
    let lista = $('#lista');
    lista.empty();
    data.map((item) => {
        lista.append(`<li>${item.name}</li>`)
    })
    imgLoading.hide();
};

const inputCleaner = () => {
    $('#input').val('');
    $('#inputDelete').val('');
}

$('#boton').click(() => {
    imgLoading.show();
    $.get(URL_BASE, guetting)
})

$('#search').click(() => {
    let id = $('#input').val();
    $.get(`${URL_BASE}/${id}`, (data) => {
        $('#amigo').text(data.name);
    })
    inputCleaner();
})

$('#delete').click(() => {
    let id = $('#inputDelete').val();
    $.ajax({
        url: `${URL_BASE}/${id}`,
        type: 'DELETE',
        success: () => {
            $('#success').text(`You're friend with ${id} ID was remove.`);
            inputCleaner();
            imgLoading.show();
            $.get(URL_BASE, guetting)
        },
    });
})