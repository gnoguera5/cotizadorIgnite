/**
 * Created by manuel on 11/05/17.
 */
var urlContact = '/contacto';
var test = '/test';
var token = document.getElementById('_token').value;
Vue.http.headers.common['X-CSRF-TOKEN'] = token;
console.log(token);
new Vue({
    el: '#app-contacto',
    data: {
        msgErrors: {},
        errors: false
    },
    methods: {
        saveContact: function () {
            var self = this;
            self.msgErrors = {};
            var myForm = document.getElementById('contactoForm');
            var formData = new FormData(myForm);
            this.$http.post(urlContact, formData).then(function (response) {
                self.errors = false;
                $('#success-complete').show();
                $("#success-complete").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-complete").slideUp(500);
                });
                /*colocar el cursor al inicio para ver los mensajes*/
                $("html, body").animate({ scrollTop: 0 }, 1000);
            }, function (error) {
                /*mostrar la alerta de error*/
                $('#success-alert').show();
                self.msgErrors  = error.data;
                self.errors = true;
                /*llenar un objeto quitandole los caracteres [ ]*/
                Object.keys(self.msgErrors).forEach(function(key) {
                    self.msgErrors[key]=(""+self.msgErrors[key]).replace("^\\[|\\]$", "");
                });
                /*ocultar la alerta automaticamente*/
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-alert").slideUp(500);
                });
                /*colocar el cursor al inicio para ver los mensajes*/
                $("html, body").animate({ scrollTop: 0 }, 1000);

            });

        },
        testcontacto: function () {
            this.$http.get(test).then(function (response) {
                console.log(response.data);
            }, function (error) {
                /*mostrar la alerta de error*/
                console.log('error');
            });
        }

    }
});