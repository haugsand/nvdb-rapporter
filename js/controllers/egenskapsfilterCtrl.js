app.controller("egenskapsfilterCtrl", ['$scope', function ($scope) {
    
    // Standaradverdier
    $scope.ef.egenskapstype = "Velg egenskapstype";
    $scope.ef.type = false;
    $scope.ef.operator = '=';
    $scope.ef.verdi = '';
    
    // Config av datatyper og operatorer
    $scope.ef.operatorer = {};
    $scope.ef.operatorer.ENUM = ['=', '!=', 'Har verdi', 'Har ingen verdi'];
    $scope.ef.operatorer.Tall = ['=', '!=', '<=', '>=', 'Har verdi', 'Har ingen verdi'];
    $scope.ef.operatorer.Tekst = ['=', '!=', 'Har verdi', 'Har ingen verdi'];
    $scope.ef.operatorer.Dato = ['=', '!=', '<=', '>=', 'Har verdi', 'Har ingen verdi'];

    $scope.ef.filter = function(egenskapstype){
        return egenskapstype.datatype == 'ENUM' || egenskapstype.datatype == 'Tall' || egenskapstype.datatype == 'Tekst' || egenskapstype.datatype == 'Dato';
    };
    
    // Datatypene nedefor er ikke implementert, og filtrert vekk fra viewet
    $scope.ef.operatorer.Klokkeslett = ['Klokkeslett'];
    $scope.ef.operatorer.GeomPunkt = ['GeomPunkt'];
    $scope.ef.operatorer['GeomLinje eller Kurve'] = ['GeomLinje eller Kurve'];
    $scope.ef.operatorer.GeomFlate = ['GeomFlate'];
    $scope.ef.operatorer['BinærObjekt'] = ['BinærObjekt'];
    
    
    // Ved endring av egenskapstype i egenskapsfilteret
    $scope.setEgenskapstype = function() {
        if ($scope.ef.egenskapstype != 'Velg egenskapstype') {
            $scope.ef.type = $scope.valg[$scope.a.objekttype+': '+$scope.ef.egenskapstype].type;
        } else {
            $scope.ef.type = false;
        }
        $scope.ef.operator = '=';
        $scope.ef.verdi = '';
    };
    
    // Ved endring av operator
    $scope.setOperator = function () {
        console.log($scope.ef.operator);
        if ($scope.ef.operator == 'Har verdi' || $scope.ef.operator == 'Har ingen verdi') {
            $scope.addEgenskapsfilter();
        }
    }
    
    // Legger til et egenskapsfilter
    $scope.addEgenskapsfilter = function() {
    
        var eksisterer = false;
        var oppdater = false;
        
        for (var i = 0; i < $scope.a.egenskapsfilter.length; i++) {
        
            if ($scope.a.egenskapsfilter[i].type == $scope.ef.egenskapstype) {
                if (($scope.a.egenskapsfilter[i].operator == $scope.ef.operator) && ($scope.a.egenskapsfilter[i].verdi == $scope.ef.verdi)) {
                    eksisterer = true;
                } else if ($scope.a.egenskapsfilter[i].operator == '=') {

                    oppdater = true;
                    for (var j = 0; j < $scope.a.egenskapsfilter[i].verdi.length; j++) {
                        if ($scope.a.egenskapsfilter[i].verdi[j] == $scope.ef.verdi) {
                            oppdater = false;
                        }
                    }
                }
            }
        }

        if (eksisterer) {
            console.log('Egenskapsfilter finnes fra før av');
        } else if (oppdater) {
            for (var i = 0; i < $scope.a.egenskapsfilter.length; i++) {
                if ($scope.a.egenskapsfilter[i].type == $scope.ef.egenskapstype) {
                    $scope.a.egenskapsfilter[i].verdi.push($scope.ef.verdi);
                }
            }
        } else {
        
            var filter_operator = $scope.ef.operator;
            var filter_verdi = $scope.ef.verdi;
            
            switch ($scope.ef.operator) {
                case 'Har verdi':
                    filter_operator = '!=';
                    filter_verdi = null;
                    break;
                case 'Har ingen verdi':
                    filter_operator = '=';
                    filter_verdi = null;
                    break;
            }
            
            var filter = {
                'type': $scope.ef.egenskapstype,
                'operator': filter_operator,
                'verdi': [filter_verdi]
            };
            $scope.a.egenskapsfilter.push(filter);
        }

    }
    
    // Fjerner til et egenskapsfilter
    $scope.delEgenskapfilter = function(index) {
        $scope.a.egenskapsfilter.splice(index, 1);
    }
}]);
