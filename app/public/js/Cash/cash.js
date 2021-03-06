$(function () {
    // var money;
    var dataProducts;
    $.ajax({
        url: "/products",
        method: "GET",
    }).done(function(data) {
        dataProducts = data.data;
    }).fail(function() {
        console.log('algo deu errado');
    });
    
    $("#quantity").keyup(function () {
        $("#form-data").empty();
        // money = '';
        var quantity = $("#quantity").val();

        $("#form-data").append(`
            <input type="hidden" id="quantity_products" value="${quantity}">
        `)

        var dataOption;
        dataOption = `<option selected="" disabled="">Selecione</option>`

        for(var i = 0; i < dataProducts.length; i++) {

            dataOption += `<option value="${dataProducts[i].id}">${dataProducts[i].name}</option>`

        }

        for (var i = 0; i < quantity; i++) {
            $("#form-data").append(`
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">${i + 1}</div>
                    </div>
                    <select class="form-control product-info" name="product_${i + 1}" id="select-products">
                        ${dataOption}
                    </select>
                    <input type="text" class="form-control money" name="price_${i + 1}" id="price_${i + 1}" placeholder="Preço" required>
                </div>
            `);
            $('.money').mask("#.##0,00", { reverse: true }); 

            // $( ".money" ).on('change',function () {
            //     money +=this.value;
            //     $('.money').each(function () { 
            //         if(this.value == ''){
            //             money +=this.value;
            //         }
            //     });
            //     $("#total_cash").val(money);
            // });
            // $("#select-products").append(dataOption);
        }
        //  <div class="input-group mb-2">
        //     <div class="input-group-prepend">
        //         <div class="input-group-text">Total:</div>
        //     </div>
        //     <input type="text" class="form-control" id='total_cash' disabled="">
        //     <input type="text" class="form-control money" id='money_client' placeholder="Dinheiro">
        //     <input type="text" class="form-control money" placeholder="Troco" disabled="" >
        // </div>
        $("#form-data").append(`
        <hr />

        <button class="btn btn-lg btn-primary" id="cash-save">Salvar</button>
        `);

    });

    $('#money_client').mask("#.##0,00", { reverse: true });

    $("#form-data").on('submit', function (event) {
        event.preventDefault();

        var formData = $("#form-data").serializeArray();

        $.ajax({
            url: "/cash/create",
            method: "POST",
            data: { data: formData, quantity: $("#quantity_products").val() },
        }).done(function (data) {
            $("#form-data").empty();
            $("#quantity").val('');

            swal({
                title: "Produto(s) Cadastrado(s)!",
                text: "Uhull!",
                icon: "success",
                button: "Continuar",
            });

        }).fail(function () {
            console.log('algo deu errado');
        });
    });

});