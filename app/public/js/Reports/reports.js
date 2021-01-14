$(function () {
    $('#selectReports').on('change', '', function (e) {
        var select = $('#selectReports').val();
        if (select == 'day') {
            $('#table_id').append(`
                <thead style="background-color: #e9ecef">
                    <tr> 
                        <th>Vendido por</th>
                        <th>Produto</th>
                        <th>Preço</th>
                    </tr>
                </thead>
            `)
        }
    });

    $("#cash-save").on('click', function () {
        var type = $("#selectReports").val();
        var start = $("#date-input-start").val();
        var end = $("#date-input-end").val();


        if (type !== null && start !== '' && end !== '') {
            $.ajax({
                url: "/reports/" + type,
                method: "GET",
                data: { start: start, end: end }
            }).done(function (data) {
                $('#table_id').DataTable().destroy();
                if (type == 'day') {

                    $('#table_id').dataTable({
                        "dom": 'Bfrtip',
                        "buttons": [
                            'copy', 'csv', 'excel', 'pdf', 'print'
                        ],
                        data: data.data,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"
                        },
                        "columns": [
                            { "data": "pt_user_id" },
                            { "data": "product", className: "product-line" },
                            { "data": "price" },
                        ]
                    });
                }
            }).fail(function () {
                console.log('algo deu errado');
            });
        } else {
            swal({
                title: "Preencha os campos!",
                icon: "error",
                button: "Continuar",
            });
        }
    });
    // $.ajax({
    //     url: "/MyUser",
    //     method: "GET",
    // }).done(function(data) { 
    //     $('#token').text(`TOKEN: ${data.token}`)

    //     $("#user_id").val(data.data[0].id)
    //     $("#inputCrush").val(data.data[0].rk_girlfriend_id);
    //     $("#inputNome").val(data.data[0].name);
    //     $("#inputEmail").val(data.data[0].email);
    //     $("#inputLogin").val(data.data[0].login);
    // }).fail(function() {
    //     console.log('algo deu errado');
    // });   
    // $("#userUpdate").on('submit',function(event){
    //     event.preventDefault();

    //     const formData = {
    //         "id":$("#user_id").val(),
    //         "rk_girlfriend_id":$("#inputCrush").val(),
    //         "name":$("#inputNome").val(),
    //         "email":$("#inputEmail").val(),
    //         "login":$("#inputLogin").val(),
    //         "password":$("#inputPassword").val(),
    //     }


    //     $.ajax({
    //         url: "/user/"+$("#user_id").val(),
    //         method: "PUT",
    //         data: formData ,
    //         dataType: "json",
    //         beforeSend: function(data) {
    //             console.log(data)
    //             swal({
    //                 title: "Atualizado com Sucesso!",
    //                 text: "Uhull!",
    //                 icon: "success",
    //                 button: "Continuar",
    //             });
    //         }
    //     })
    // })
});
