$(function () {
    // var money;
    var dataProducts;
    $.ajax({
        url: "/products",
        method: "GET",
    }).done(function (data) {
        dataProducts = data.data;

        // $('#table_id').dataTable({
        //     "dom": 'Bfrtip',
        //     "buttons": [
        //         'copy', 'csv', 'excel', 'pdf', 'print'
        //     ],
        //     data: data.data,
        //     "language": {
        //         "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"
        //     },
        //     "columns": [ 
        //         { "data": "name", className: "product-line" },
        //         { "data": "price" },
        //         { "data": "id" },
        //     ]
        // });

    }).fail(function () {
        console.log('algo deu errado');
    });

    $("#quantity").keyup(function () {
        $("#form-data").empty();
        // money = '';
        var quantity = $("#quantity").val();

        for (var i = 0; i < quantity; i++) {
            $("#form-data").append(`
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">${i + 1}</div>
                    </div>
                    <input type="text" class="form-control product-info" name="product_${i + 1}" id="product_${i + 1}" placeholder="produto" required>
                    <input type="text" class="form-control money" name="price_${i + 1}" id="price_${i + 1}" placeholder="Preço" required>
                </div>
            `);
            $('.money').mask("#.##0,00", { reverse: true });
        }
        if (quantity > 0) {
            $("#form-data").append(`
            <hr />
    
            <button class="btn btn-lg btn-primary" id="cash-save">Salvar</button>
            `);
        }
    });

    $('#money_client').mask("#.##0,00", { reverse: true });

    $("#form-data").on('submit', function (event) {
        event.preventDefault();

        var formData = $("#form-data").serializeArray();

        $.ajax({
            url: "/products/create",
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

    $("#consult").on('click',function(){
        // alert('ok')
        $('#exampleModal').modal('show');
    })
});