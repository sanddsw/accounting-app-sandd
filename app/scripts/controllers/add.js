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
        banca: []
      },
      openClientModal: function (client) {
        if(!client) client = vm.client;
        var modal = new ModalFactory({
          class: 'small',
          overlay: true,
          overlayClose: false,
          templateUrl: 'views/_/client-modal.html',
          contentScope: {
            addAccount: function (){
              console.log(client);
              client.banca.push({});
            },
            int8n: vm.int8n,
            client: client,
            close: function() {closeClientModal(modal)},
            pushClient: function() {
              closeClientModal(modal);
              $clients(((client._id) ? 'update' : 'push'), client).then(function(data) {
                console.log(data);
              });
            }
          }
        });
        modal.activate();
      }
    });

    $scope.$watch('vm.selectedClient', function(newVal) {
      vm.client = $clients('getById', newVal);
      if(vm.client && vm.client._id) vm.cli.selected = true;
    });



    function closeClientModal(modal) {
      modal.deactivate();
      $timeout(function() {
        modal.destroy();
      }, 1000);
    }
  });
