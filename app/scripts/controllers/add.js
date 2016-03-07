'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('AddCtrl', function ($clients, $scope, FoundationApi, ModalFactory, $timeout) {
    var vm = this;

    vm.clients = $clients('list');
    vm.client = {
      banca: [{ nume: '', cont: ''}]
    };

    vm.f = {
      series: "",
      number: "",
      date: "",
      currency: "",
      seller: {
        name: "SANDD SOFT WORKS SRL",
        cif: "33535396",
        orc: "J/25/235/2014",
        address: "Smardan 26, bl. S4E, ap. 4",
        city: "Dr. Tr. Severin",
        region: "Mehedinti",
        country: "Romania",
        bank: "ING Bank",
        bankAccount: "RO71INGB0000999901641743"
      },
      products: [
        { amount: 10, title: "Dezvoltare software la comanda", desc: "Conform contractului 01.01.2016" },
        { amount: 25, title: "Dezvoltare software la comanda", desc: "Conform contractului 01.01.2016" }
      ]
    };
    if (vm.f.date == "") {
      vm.f.date = new Date();
    }

    vm.total = calculateTotal(vm.f.products);

    function calculateTotal(products) {
      if (products === undefined) return 0;
      var s = 0;
      for (var i=0; i < products.length; i++) {
        s += products[i].amount;
      }
      return s;
    }

    vm.addProduct = function () {
      vm.f.products.push({amount: "", title: "", desc: ""});
    };

    vm.openClientModal = function (client) {
        if(!client) client = vm.client;
        var modal = new ModalFactory({
          class: 'small',
          overlay: true,
          overlayClose: false,
          templateUrl: 'views/_/add-client-modal.html',
          contentScope: {
            addAccount: function (){
              if (client.banca.length > 2) {
                return;
              }
              client.banca.push({});
            },
            removeAccount: function (index){
              client.banca.splice(index, 1);
            },
            int8n: vm.int8n,
            client: client,
            close: function() {closeClientModal(modal)},
            pushClient: function() {
              $clients(((client._id) ? 'update' : 'push'), client).then(function(data) {
                closeClientModal(modal);
                vm.clients.push(client);
                vm.openSearchClientModal();
              });
            }
          }
        });
        modal.activate();
      };

    vm.openSearchClientModal = function () {
        var modal = new ModalFactory({
          class: 'small',
          overlay: true,
          overlayClose: false,
          templateUrl: 'views/_/client-modal.html',
          contentScope: {
            close: function() {
              closeClientModal(modal);
            },
            set: function(client) {
              vm.client = client;
            },
            add: function() {
              closeClientModal(modal);
              vm.openClientModal({banca: [{}]})
            },
            clients: vm.clients
          }
        });
        modal.activate();
      };

    function closeClientModal(modal) {
      modal.deactivate();
      $timeout(function() {
        modal.destroy();
      }, 1000);
    }

    $scope.$watch('vm.client', function(client) {
      if (client.nume === undefined && client.banca[0].nume === '') {
        return;
      }
      vm.f.buyer = client._id;
    });

    vm.language = 'ro';
    vm.int8n = {
      ro: {
        date: "Data",
        invoice: "Factura Fiscala",
        series: "Serie",
        number: "Numar",
        seller: "Furnizor",
        buyer: "Cumparator",
        name: "Denumirea firmei",
        cif: "Codul unic de identificare",
        orc: "Numar ordin ORC",
        address: "Sediul",
        city: "Oras",
        region: "Judet",
        country: "Tara",
        bank: "Banca",
        bankAccount: "IBAN",
        total: "TOTAL",
        addProduct: "ADAUGA PRODUS",
        description: "Descriere",
        product: "Produs",
        value: "Valoare",
        amount: "Suma",
        productName: "Nume Produs"
      }
    }
  });
