window.Fuse = Fuse;
function normalizeResult (data) {
    return data
    .filter(({ params = "{}" }) => {
        const { isPre } = JSON.parse(params)
        return !isPre
    })
    .map(x => Object.assign(
        {},
        x,
        {precio_unitario: parseFloat(x.precio_unitario).toFixed(2)}
    ))
}

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

new Vue({
    el: '#app',
    data: {
        fuse: null,
        search: '',
        list: [],
        result: [],
        categorias:''
    },
    mounted() {
        var vista = $('#vista').val();
        var keySearch = [];
        switch (vista) {
            case 'getUsuarios':
                this.keySearch = ["name", "email"]
                break;
            case 'getClientes':
                this.keySearch = ["nombre", "apellidopaterno", "apellidomaterno", "correo", "telefono"]
                break;
            case 'getCotizacion':
                this.keySearch = ["folio", "params"]
                break;
            case 'getCategories':
                this.keySearch = ["categoria"]
                break;
            case 'getService':
                this.keySearch = ["name","folio","status"]
            break;
            default:
                this.keySearch = ["tipo_producto", "descripcion","categoria"]
                break;
        }
        console.log(vista);
        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: this.keySearch
        };
        this.$http.get('/' + vista).then(function(response) {
            this.list = normalizeResult(response.data);
            this.fuse = new window.Fuse(this.list, options);
            this.result = this.list
        }, function(error) {
            console.log(error);
        });

    },
    methods: {
        onCopy: function (e) {
            alert('Enlace copiado: ' + e.text)
        },
        onError: function (e) {
            alert('Failed to copy texts')
        },
        edit: function(id, vista) {
            $('#frm-edit').attr('action', vista + '/' + id + '/edit');
            $("#frm-edit").submit();
        },
        drop: function(id, vista) {
            $('#frm-delete').attr('action', vista + '/' + id + '');
            $("#frm-delete").submit();
        },
        copyToClipboard: function(valor){
            alert('Enlace copiado');
            console.log(valor);
            var ruta = $('#base_url_pdf').val();
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(ruta+'/'+valor).select();
            document.execCommand("copy");
            $temp.remove();
        },
        sendMail:function (id) {
            const mail = prompt("Ingrese el correo")
            $.ajax({
                type: "GET",
                url: "/sendMailWithId/"+id,
                data: {mail},
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    alert('Correo enviado');
                    // window.location.href = "/precotizaciones";
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log({ XMLHttpRequest, textStatus, errorThrown });
                }
            });
        },
        printTicket: function(id){
            window.open('/getTicket/'+id, '_blank');
        },
        printTicketService: function(id){
            window.open('/getTicketService/'+id, '_blank');
        }

    },
    watch: {
        search() {
            if (this.search.trim() === '')
                this.result = this.list
            else
                this.result = this.fuse.search(this.search.trim())
        },
        categorias() {
            if (this.categorias.trim() === '')
                this.result = this.list
            else
                this.result = this.fuse.search(this.categorias.trim())
        }
    }
});