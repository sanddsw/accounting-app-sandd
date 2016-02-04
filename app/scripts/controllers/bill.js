'use strict';

/**
 * @ngdoc overview
 * @name generatorFactura
 * @description
 * # generatorFactura
 *
 * Main module of the application.
 */
angular
  .module('generatorFactura', [
    'foundation',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .controller('BillCtrl', function () {
    this.getWidth = function($index) {
      return {
        'width': ($index != 0) ? ('' + (45 - ((this.bill.columns.length - 2) * 15)) + '%') : '55%'
      }
    };
    this.getLineWidth = function($index) {
      return {
        'width': ($index != 0) ? ('' + (45 - ((this.bill.columns.length - 2) * 15)) + '%') : '45%'
      }
    };
    this.bill = {
      serie: 'SSW',
      numar: '001',
      data: '02-09-2015',
      currency: 'RON',
      columns: ['SERVICIU OFERIT', 'VALOARE'],
      total: 4000.00,
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
        //  function() {
        //  return (this.buyer.isEU) ? "x" : "33535396"
        //},
        orc: "J25/235/01.09.2014",
        sediu: "Str Smardan 26, Bl S4E, Sc 1, Ap 4",
        oras: "Drobeta Turnu Severin",
        judet: "Mehedinti",
        tara: "Romania",
        banca: "ING Bank",
        cont: "RO000PULA"
      },
      products: [
        {
          lines: [4000.00],
          title: "Dezvoltare software la comanda",
          desc: "Conform contractului 01.01.2016"
        },
        {
          lines: [4000.00],
          title: "Dezvoltare software la comanda",
          desc: "Conform contractului 01.01.2016"
        }
      ]
    };
    this.int8n = {
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
      cont: "Cont",
      total: "TOTAL"
    };
  });
