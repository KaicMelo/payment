$(function () {
    // var money;
    var dataProducts;
    var table;

    $.ajax({
        url: "/products",
        method: "GET",
    }).done(function (data) {
        dataProducts = data.data;

        table = $('#table_id').dataTable({
            "dom": 'Bfrtip',
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            data: dataProducts,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"
            },
            "columns": [ 
                { "data": "name", className: "text-center" },
                { "data": "price" ,className: "text-center"},
                { 
                    "data": 'id',
                    className: "text-center",
                    render: data => 
                    // <button type="button" value="'+data+'" class="btn" data-toggle="modal" data-target="#exampleModal">
                    //     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
                    //         <g transform="scale(2)">
                    //             <circle style="fill:#4caf50" cx="8" cy="8" r="7"/>
                    //             <path style="fill:#ffffff" d="M 11.535,4.4 7.2928,8.6 4.4647,5.8 3.0506,7.2 5.8787,10.1 7.2928,11.5 12.949,5.8 Z"/>
                    //         </g>
                    //     </svg>
                    // </button>
                    `
                    <button type="button" onclick=deleteProduct(${data}) class="btn ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
                            <g transform="scale(2)">
                                <circle style="fill:#f44336" cx="8" cy="8" r="7"/>
                                <rect style="fill:#ffffff" width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                                <rect style="fill:#ffffff" width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
                            </g>
                        </svg>
                    </button>
                    `
                },
            ]
        }); 

    }).fail(function () {
        console.log('algo deu errado');
    });

});
function deleteProduct(data){
    swal({
        title: "Tem certeza ?",
        text: "Cuidado, seu produto será deletada",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {

            $.ajax({
                url: "/products/delete",
                method: "DELETE",
                data: { id: data },
                dataType: "text"
            }).done(function (data) {
                // $('#table_id').ajax.reload( null, false );
                swal({
                    title: "Produto apagado!",
                    icon: "success",
                    button: "Continuar",
                });

            }).fail(function () {
                swal({
                    title: "Houve um erro!",
                    icon: "error",
                    text: "Por favor, tente novamente",
                    button: "Continuar",
                });
            });
            
        } else {
            swal("Ufaa! Seu produto continua na lista");
        }
    });
}