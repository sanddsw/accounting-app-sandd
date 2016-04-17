'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('invoiceAddController', function ($facturi, $clients, $scope, FoundationApi, ModalFactory, $timeout, $location) {
    var vm = this;

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
        productName: "Nume Produs",
        saveInvoice: "SALVEAZA FACTURA"
      }
    };

    vm.clients = $clients('list');
    vm.client = {
      name: '',
      cif: '',
      orc: '',
      address: '',
      city: '',
      region: '',
      country: '',
      banks: [{
        name: '',
        account: ''}]
    };

    vm.f = {
      series: "",
      number: "",
      buyer: "",
      date: "",
      currency: "RON",
      seller: {
        name: "SANDD SOFT WORKS SRL",
        cif: "33535396",
        orc: "J25/235/2014",
        address: "Smardan 26, bl. S4E, ap. 4",
        city: "Dr. Tr. Severin",
        region: "Mehedinti",
        country: "Romania",
        bank: "ING Bank N.V. Amsterdam - Bucharest",
        bankAccount: "RO95INGB0000999904642494"
      },
      products: [
      ]
    };

    if (vm.f.date == "") {
      vm.f.date = new Date();
    }

    vm.total = calculateTotal(vm.f.products);

    vm.addProduct = function () {
      vm.f.products.push({amount: "", title: "", desc: ""});
    };

    vm.removeProduct = function(idx) {
      if(vm.f.products != undefined) {
        vm.f.products.splice(idx, 1);
      }
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
              if (client.banks.length > 2) {
                return;
              }
              client.banks.push({});
            },
            removeAccount: function (index){
              if (index > 0) {
                client.banks.splice(index, 1);
              }
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
              vm.openClientModal({banks: [{}]})
            },
            clients: vm.clients
          }
        });
        modal.activate();
      };

    vm.recalculateTotal = function() {
      vm.total = calculateTotal(vm.f.products);
      vm.f.total = vm.total;
    };

    // TODO: add some form validation to ensure we have minimum data required
    vm.saveFactura = function () {
      if (vm.f._id !== undefined) {
        $facturi.update(vm.f);
      } else {
        $facturi.push(vm.f, function(data) {
          $location.path('/Facturi');
        });
      }
    };

    function closeClientModal(modal) {
      modal.deactivate();
      $timeout(function() {
        modal.destroy();
      }, 1000);
    }

    function calculateTotal(products) {
      if (products === undefined) return 0;
      var s = 0;
      for (var i=0; i < products.length; i++) {
        s += products[i].amount;
      }
      return s;
    }

    $scope.$watch('vm.client', function(client) {
      if (client.name === undefined && client.banks[0].nume === '') {
        return;
      }
      vm.f.buyer = client._id;
    });
  });
