app.controller("rapportCtrl", ['$scope', '$http', '$location', 'getdata', function ($scope, $http, $location, getdata) {

    // Standarverdier 
    $scope.a = {};
    $scope.a.objekttype = "Rekkverk";
    $scope.a.kolonne = "Vegkategori";
    $scope.a.rad = "Fylke";
    $scope.a.rad2 = false;
    $scope.a.sum = "antallFunnet";
    $scope.a.intervall = [];
    $scope.a.egenskapsfilter = [];
    $scope.a.radfilter = [];
    $scope.ef = {};
    $scope.dato = new Date().toLocaleDateString();;
    

    // Konfigurasjon av mulige rad- og kolonnevalg
    $scope.rader = ['Vegkategori', 'Region', 'Fylke', 'Kommune'];
    $scope.kolonner = ['Vegkategori'];
    $scope.kolonnefilter = function(egenskapstype){
        return egenskapstype.datatype == 'ENUM' || egenskapstype.datatype == 'Tall';
    };

    // Initialbetingelser
    var initialbetingelser = ['kolonne', 'rad', 'rad2'];
    for (var i in initialbetingelser) {
        var type = initialbetingelser[i];
        if ($location.search()[type]) {
            $scope.a[type] = $location.search()[type];
        }
    }
    
    if ($location.search().objekttype) {
        $scope.a.objekttype = $location.search().objekttype;
    }

    if ($location.search().egenskapsfilter) {
        $scope.a.egenskapsfilter = angular.fromJson($location.search().egenskapsfilter);
    }
    
    if ($location.search().radfilter) {
        $scope.a.radfilter = $location.search().radfilter.split(',');
    }
    
    if ($location.search().intervall) {
        $scope.a.intervall = $location.search().intervall;
    }
    

    getdata.objekttyper().then(function(promise) {
        getdata.egenskapstyper($scope.a.objekttype).then(function(promise) {
            if ($location.search().intervall) {
                $scope.setIntervall();
            }
        });
    });

    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    /*      Events                                                      */
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    
    // Ved endring av aktiv objekttype
    $scope.setObjekttype = function() {
        // getEgenskapstyper();
        getdata.egenskapstyper($scope.a.objekttype);
        $scope.a.kolonne = "Vegkategori";
        $scope.a.egenskapsfilter = [];
        $scope.ef.egenskapstype = "Velg egenskapstype";
        $scope.ef.type = false;
        $scope.ef.operator = '=';
        $scope.ef.verdi = '';
    };
    
    // Ved endring av aktiv kolonne
    $scope.setKolonne = function() {
    };
    
    // Angir intervall
    $scope.setIntervall = function() {  
        var verdier = $scope.a.intervall.split(' ');
        $scope.valg[$scope.a.kolonne].verdier = [];
        
        // Endrer desimalskille fra komma til punktum
        for (var i = 0; i < verdier.length; i++) {
            verdier[i] = verdier[i].replace(',', '.');
        }
        
        $scope.valg[$scope.a.kolonne].verdier.push({'navn': '< '+verdier[0], 'verdi': [null, verdier[0]]})
        for (var i = 1; i < verdier.length; i++) {
            $scope.valg[$scope.a.kolonne].verdier.push({'navn': verdier[i-1]+' - '+verdier[i], 'verdi': [verdier[i-1], verdier[i]]});
        }
        $scope.valg[$scope.a.kolonne].verdier.push({'navn': verdier[verdier.length-1]+' ≤', 'verdi': [verdier[verdier.length-1], null]});
        // $scope.valg[$scope.a.kolonne].verdier.push({'navn': 'Ingen verdi', 'verdi': [null]});
    };
    
    // Ved endring av aktiv rad
    $scope.setRad = function() {
        $scope.a.rad2 = false;
        $scope.a.radfilter = [];
    };
    
    // Ved endring av aktiv rad
    $scope.setRad2 = function() {
    };
    
    $scope.addRadfilter = function(verdi) {
        $scope.a.radfilter.push(verdi);
    };
    
    $scope.setRadfilter = function(verdi) {
        $scope.a.radfilter = [];
        
        for (var i = 0; i < $scope.valg[$scope.a.rad].verdier.length; i++) {
            if ($scope.valg[$scope.a.rad].verdier[i].navn != verdi) {
                $scope.a.radfilter.push($scope.valg[$scope.a.rad].verdier[i].navn);
            }
        }
    };
    
    $scope.nullstillRadfilter = function() {
        $scope.a.radfilter = [];
    };

    
    $scope.eksportExcel = function() {
        var celler = document.querySelectorAll("[class='radfilter_fjern']");
        
        for (var i = 0; i < celler.length; i++) {
            celler[i].innerHTML = '';
        }
        tableToExcel();
        
        for (var i = 0; i < celler.length; i++) {
            celler[i].innerHTML = 'fjern';
        }
    };
    
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,';
      
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
        template += '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
        template += '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>';
        template += '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->';
        template += '<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head>';
        template += '<body><table>{table}</table></body></html>';;
      
        var base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) };
        var format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
                
      
        return function(table, name, ctx) {
            var table = document.getElementById('rapport');
            var name = 'Rapport fra NVDB';
            var ctx = {
                worksheet: name, 
                table: table.innerHTML
            };
            window.location.href = uri + base64(format(template, ctx));
        }
    })()


    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    /*      Nullstiller tabell                                          */
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */


    // Watch som angir når tabellen skal nullstilles
    $scope.$watchGroup(['a.kolonne', 'a.rad', 'a.rad2'], function() {
       $scope.resetRapport(); 
    });


    // Funksjon som nullstiller tabellen 
    $scope.resetRapport = function() {
        var celler = document.querySelectorAll("[class~='resultat']");
        for (var i = 0; i < celler.length; i++) {
            celler[i].innerHTML = '';
        }


        document.querySelector("#status-gfx").style.width = "0%";
    };
    
    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    /*      Watches som oppdaterer URL når modellen endres              */
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    
    
    $scope.$watch('a.objekttype', function() {
       $location.search('objekttype', $scope.a.objekttype);
    });
    $scope.$watch('a.rad', function() {
       $location.search('rad', $scope.a.rad);
    });
    $scope.$watch('a.rad2', function() {
       $location.search('rad2', $scope.a.rad2);
    });
    $scope.$watch('a.kolonne', function() {
       $location.search('kolonne', $scope.a.kolonne);
    });
    $scope.$watch('a.intervall', function() {
       $location.search('intervall', $scope.a.intervall);
    });
    $scope.$watchCollection('a.egenskapsfilter', function() {
        $location.search('egenskapsfilter', angular.toJson($scope.a.egenskapsfilter));
    });
    $scope.$watchCollection('a.radfilter', function() {
       $location.search('radfilter', $scope.a.radfilter.join(','));
    });


    
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    /*      Fyller tabellen med resultat - Skilles ut                   */
    /* ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
    

    $scope.getResultat = function (sum) {
        document.querySelector(".progress").style.visibility = "visible";
        $scope.a.sum = sum; 
    
        $scope.resetRapport();
        

        
        // Oppretter tomt søkeobjekt
        var sok = {};
        sok.lokasjon = {};
        sok.objektTyper = [];
        sok.objektTyper[0] = {};
        sok.objektTyper[0].antall = 0;
        
        // Legger til objekttype
        sok.objektTyper[0].id = $scope.objekttyper[$scope.a.objekttype].id;

        // Legger til egenskapsfilter
        sok.objektTyper[0].filter = $scope.a.egenskapsfilter;
                
        var kolonne = angular.copy($scope.valg[$scope.a.kolonne]);
        var rad = angular.copy($scope.valg[$scope.a.rad]);
        
        
        if ($scope.a.radfilter) {
            for (var i = rad.verdier.length-1; i > -1; i--) {
                if ($scope.a.radfilter.indexOf(rad.verdier[i].navn) > -1) {
                    rad.verdier.splice(i, 1);
                }
            }
        }
        
        // Initialiserer teller
        $scope.totalt = (kolonne.verdier.length+1) * (rad.verdier.length+1);
        $scope.antall = 0;

        // Når vi har rad2, får vi flere antall spørringer 
        if ($scope.a.rad2 == true)  {
            for (var i = 0; i < rad.verdier.length; i++) {                
                $scope.totalt += (kolonne.verdier.length+1) * ($scope.valg[rad.verdier[i].navn].verdier.length);
            }
        }
        
        // Henter totalsum
        getSok(sok, 'sumsum');
        
        // Henter sum per kolonne
        for (var i in kolonne.verdier) {
            var kriterie = getKriterie(sok, kolonne, kolonne.verdier[i].verdi);
            getSok(kriterie, 'sum'+kolonne.verdier[i].verdi);
        } 
        
        // Henter hver rad
        for (var i in rad.verdier) {
            var kriterie = getKriterie(sok, rad, rad.verdier[i].verdi);
            getSok(kriterie, rad.verdier[i].verdi+'sum');
            
            for (var j in kolonne.verdier) {
                var kriterie2 = getKriterie(kriterie, kolonne, kolonne.verdier[j].verdi);
                getSok(kriterie2, rad.verdier[i].verdi+kolonne.verdier[j].verdi);
            } 
            

            if ($scope.a.rad2 == true) {
                var rad2 = $scope.valg[rad.verdier[i].navn]; 
                for (var k in rad2.verdier) {
                    var kriterie3 = getKriterie(sok, rad2, rad2.verdier[k].verdi);
                    getSok(kriterie3, rad.verdier[i].verdi+rad2.verdier[k].navn+'sum');
                    
                    for (var l in kolonne.verdier) {
                        var kriterie4 = getKriterie(kriterie3, kolonne, kolonne.verdier[l].verdi);
                        getSok(kriterie4, rad.verdier[i].verdi+rad2.verdier[k].navn+kolonne.verdier[l].verdi);
                    } 
                } 
            }
            
        } 
    };


    function getKriterie (sokeobjekt, valg, verdi) {
        var kriterie = angular.copy(sokeobjekt);
        

        switch (valg.type) {
            case 'lokasjon':
                kriterie.lokasjon[valg.egenskap] = verdi;
                break;
            case 'Tall':
                if (verdi[0]) {
                    kriterie.objektTyper[0].filter.push({
                        'type': valg.egenskap,
                        'operator': '>=',
                        'verdi': [verdi[0]]
                    });
                }
                
                if (verdi[1]) {
                    kriterie.objektTyper[0].filter.push({
                        'type': valg.egenskap,
                        'operator': '<',
                        'verdi': [verdi[1]]
                    });
                }
                
                break;
            default:
                kriterie.objektTyper[0].filter.push({
                    'type': valg.egenskap,
                    'operator': '=',
                    'verdi': verdi
                });
        }        
        return kriterie;
    } 

    
    function getSok (sokeobjekt, key) {
    
        var url = 'api.php?path=/sok.json?kriterie='+angular.toJson(sokeobjekt);
        
        url = url.replace(/#/g, '%23');
        url = url.replace(/\+/g, '%2B');
        
        $http.get(url).success((function(key) {
            return function(data) {
            
                // Henter riktig tall, og legger til tusenskiller
                var resultat = data.resultater[0].statistikk[$scope.a.sum];
                resultat = resultat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                
                // Legger til resultat i riktig celle
                var selector = '[title=\''+key+'\']';
                var element = document.querySelector(selector);
                element.innerHTML = resultat;
                
                
                // Oppdaterer teller og statuslinje
                $scope.antall += 1;
                var width = ($scope.antall / $scope.totalt) * 100;
                document.querySelector("#status-gfx").style.width = width+"%";

                if (($scope.antall / $scope.totalt) == 1) {
                    document.querySelector(".progress").style.visibility = "hidden";
                }
            };
        })(key));
    }
    
  
    
        
        
}]);
