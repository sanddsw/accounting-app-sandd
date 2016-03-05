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
    vm.int8n = {
      comData: 'Firma Clientului',
      address: 'Adresa',
      bank: 'Conturi bancare',
      clients: 'Clienti',
      addClient: 'Adauga Client',
      noClient: 'Niciun Client Selectat'
    };
    angular.extend(vm, {
      cli: {
        setText: function(on) {
          vm.cli.text = (on) ? vm.int8n.addClient : vm.int8n.noClient;
        },
        text: vm.int8n.noClient,
        selected: false
      },
      clients: $clients('list'),
      client: {
        banca: [{ nume: '', cont: ''}]
      },
      openClientModal: function (client) {
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
      },
      openSearchClientModal: function () {
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
      }
    });

    $scope.f = {
      int8n: {
        data: "Data",
        f_title: "Factura Fiscala",
        serie: "Serie",
        numar: "Numar",
        furnizor: "Furnizor",
        cumparator: "Cumparator",
        name: "Denumirea firmei",
        cif: "Codul unic de identificare",
        orc: "Numar ordin ORC",
        sediu: "Sediul",
        oras: "Oras",
        judet: "Judet",
        tara: "Tara",
        banca: "Banca",
        cont: "IBAN",
        total: "TOTAL"
      },
      en: {
        data: "Date",
        f_title: "Invoice",
        serie: "Series",
        numar: "Number",
        furnizor: "Seller",
        cumparator: "Buyer",
        name: "Company name",
        cif: "Unique Registry Number",
        orc: "ORC Registry Number",
        sediu: "Headquarters",
        oras: "City",
        judet: "County/Region",
        tara: "Country",
        banca: "Bank",
        cont: "IBAN",
        total: "TOTAL"
      },
      bill: {
        serie: "SSW",
        numar: "001",
        data: "02-09-2015",
        currency: "RON",
        columns: ["SERVICIU OFERIT", "VALOARE"],
        total: 4e3,
        seller: {
          name: "Sandd Soft Works S.R.L.",
          cif: "33535396",
          orc: "J25/235/01.09.2014",
          sediu: "Str Smardan 26, Bl S4E, Sc 1, Ap 4",
          oras: "Drobeta Turnu Severin",
          judet: "Mehedinti",
          tara: "Romania",
          banca: "ING Bank",
          cont: "RO000PULA"
        },
        buyer: {
          name: "Sandd Soft Works S.R.L.",
          cif: "33535396",
          orc: "J25/235/01.09.2014",
          sediu: "Str Smardan 26, Bl S4E, Sc 1, Ap 4",
          oras: "Drobeta Turnu Severin",
          judet: "Mehedinti",
          tara: "Romania",
          banca: "ING Bank",
          cont: "RO000PULA"
        },
        products: [{
          lines: [4e3],
          title: "Dezvoltare software la comanda",
          desc: "Conform contractului 01.01.2016"
        }, {lines: [4e3], title: "Dezvoltare software la comanda", desc: "Conform contractului 01.01.2016"}]
      },
      getWidth: function (a) {
        return {width: 0 != a ? "" + (45 - 15 * (this.bill.columns.length - 2)) + "%" : "55%"}
      },
      getLineWidth: function (a) {
        return {width: 0 != a ? "" + (45 - 15 * (this.bill.columns.length - 2)) + "%" : "45%"}
      }
    };

    $scope.$watch('vm.client', function(client) {
      if (client.nume === undefined && client.banca[0].nume === '') {
        return;
      }
      var buyer = {
        name: client.nume,
        cif: client.cif,
        orc: client.orc,
        sediu: client.adresa,
        oras: client.oras,
        judet: client.judet,
        tara: client.tara,
        banca: client.banca[0].nume,
        cont: client.banca[0].cont
      };
      $scope.f.bill.buyer = buyer;
    });



    function closeClientModal(modal) {
      modal.deactivate();
      $timeout(function() {
        modal.destroy();
      }, 1000);
    }
  });
