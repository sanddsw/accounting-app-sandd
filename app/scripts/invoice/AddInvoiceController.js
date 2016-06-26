'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
    .controller('AddInvoiceController', function ($invoicesService, $clients, $scope, FoundationApi, ModalFactory, $timeout, $state, invoices) {
      var vm = this;

      vm.nextInvoiceNumber = function () {
        var max = 1;
        var maxString = "";
        for (var i=0; i<invoices.length; i++) {
          if(parseInt(invoices[i].number) > max) {
            max = parseInt(invoices[i].number);
            maxString = "0" + (max + 1);
          }
        }
        return maxString;
      };

      function sumOfProducts(products) {
        if (products === undefined) {
          return 0;
        }
        var s = 0;
        for (var i=0; i < products.length; i++) {
          s += products[i].amount;
        }
        return s;
      };

      vm.f = {
        series: "",
        number: "",
        buyer: "",
        date: "",
        currency: "USD",
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
        ],
        total: sumOfProducts(this.products)
      };

      $scope.$watch('vm.f.products', function() {
        vm.f.total = sumOfProducts(vm.f.products);
      }, true);

      // Init invoice date with current date if it's a new invoice
      if (vm.f.date === "") {
        vm.f.date = new Date();
      }

      vm.addProduct = function () {
        vm.f.products.push({amount: "", title: "", desc: ""});
      };

      vm.removeProduct = function(idx) {
        if(vm.f.products !== undefined) {
          vm.f.products.splice(idx, 1);
        }
      };

      vm.saveFactura = function () {
        $invoicesService.save(vm.f).then(function() {
          $state.go('main.invoices');
        });
      };

      vm.invoiceValid = function() {
        var sameInvoiceFound = false;
        for (var i=0; i < invoices.length; i++) {
          var trimmedNumber = parseInt(invoices[i].number);
          if(invoices[i].series === vm.f.series && trimmedNumber === parseInt(vm.f.number)) {

            sameInvoiceFound = true;
          }
        }
        return vm.f.buyer._id != undefined &&
            vm.f.products.length > 0 &&
            !sameInvoiceFound
      };

      vm.openClientModal = function (client) {
        if(!client) {
          client = vm.f.buyer;
        }
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
            client: client,
            close: function() {
              closeClientModal(modal);
            },
            pushClient: function() {
              if (client._id) {
                $clients.update(client).then(function() {
                  closeClientModal(modal);
                  vm.openSearchClientModal();
                });
              } else {
                $clients.push(client).then(function() {
                  closeClientModal(modal);
                  vm.openSearchClientModal();
                });
              }
            }
          }
        });
        modal.activate();
      };

      vm.openSearchClientModal = function () {
        $clients.list().then(function (result) {
          var clients = result.data;
          var modal = new ModalFactory({
            class: 'small',
            overlay: true,
            overlayClose: false,
            templateUrl: 'views/_/client-modal.html',
            contentScope: {
              close: function () {
                closeClientModal(modal);
              },
              set: function (client) {
                vm.f.buyer = client;
              },
              add: function () {
                closeClientModal(modal);
                vm.openClientModal({banks: [{}]});
              },
              clients: clients
            }
          });
          modal.activate();
        });
      };

      function closeClientModal(modal) {
        modal.deactivate();
        $timeout(function() {
          modal.destroy();
        }, 1000);
      }
    });
