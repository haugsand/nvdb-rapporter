app.factory('getdata', ['$rootScope', '$http', 'nvdbapi', function($rootScope, $http, nvdbapi) {
    
    return {
        egenskapstyper: function(objekttype) {
            
            if (!$rootScope.egenskapstyper.hasOwnProperty(objekttype)) {
            
                $rootScope.egenskapstyper[objekttype] = [];
                
                var id = $rootScope.objekttyper[objekttype].id;
                
                var promise = $http.get(nvdbapi+'/datakatalog/objekttyper/'+id+'.json').success(function(data) {                    

                    for (var i in data.egenskapsTyper) {
                        var egenskapstype = data.egenskapsTyper[i];
                        
                        $rootScope.egenskapstyper[objekttype].push({
                            'navn': egenskapstype.navn,
                            'datatype': egenskapstype.type
                        });
                        
                        $rootScope.valg[objekttype+': '+egenskapstype.navn] = {
                            'type': egenskapstype.type,
                            'egenskap': egenskapstype.navn,
                            'verdier': []
                        };

                        if (egenskapstype.type == 'ENUM') {

                            for (var j in egenskapstype.enumVerdier) {
                                $rootScope.valg[objekttype+': '+egenskapstype.navn].verdier.push({
                                    'navn': egenskapstype.enumVerdier[j].verdi,
                                    'verdi': [egenskapstype.enumVerdier[j].verdi]
                                });
                            }
                            $rootScope.valg[objekttype+': '+egenskapstype.navn].verdier.push({
                                'navn': 'Ingen verdi',
                                'verdi': [null]
                            });
                        }
                    }
                });
                return promise;
            }
        },
        
        
        objekttyper: function() {
            var promise = $http.get(nvdbapi+'/datakatalog/objekttyper.json').success(function(data) {
            
                for (var i = 0; i < data.vegObjektTyper.length; i++) {
                    var objekttype = data.vegObjektTyper[i];
                    
                    $rootScope.objekttyper[objekttype.navn] = {
                        'navn': objekttype.navn,
                        'id': objekttype.id
                    };
                    
                    if (objekttype.geometriType == 'LINJE') {
                        $rootScope.objekttyper[objekttype.navn].lengde = true;
                    } else {
                        $rootScope.objekttyper[objekttype.navn].lengde = false;
                    }
                }

            });
            return promise;
        },
        
        
        vegreferanse: function() {
            $http.get(nvdbapi+'/datakatalog/objekttyper/532.json').success(function(data) {
            
                $rootScope.valg.Vegkategori = {
                    'type': 'lokasjon',
                    'egenskap': 'vegreferanse',
                    'rad2': true,
                    'verdier': []
                };
                
                for (var i = 0; i < data.egenskapsTyper.length; i++) {
                    if (data.egenskapsTyper[i].id == 4566) {
                        var vegkategori = data.egenskapsTyper[i].enumVerdier;
                    } else if (data.egenskapsTyper[i].id == 4567) {
                        var vegstatus = data.egenskapsTyper[i].enumVerdier;
                    }
                }
                
                for (j in vegkategori) {
                    $rootScope.valg.Vegkategori.verdier.push({
                        'navn': vegkategori[j].verdi,
                        'verdi': [vegkategori[j].kortVerdi]
                    });
                    
                    
                    $rootScope.valg[vegkategori[j].verdi] = {
                        'type': 'lokasjon',
                        'egenskap': 'vegreferanse',
                        'verdier': []
                    };

                    for (k in vegstatus) {
                        $rootScope.valg[vegkategori[j].verdi].verdier.push({
                            'navn': vegstatus[k].verdi,
                            'verdi': [vegkategori[j].kortVerdi+vegstatus[k].kortVerdi]
                        });

                    }

                }
            });
        },
        
        
        region: function() {
        
            $rootScope.valg.Region = {
                'type': 'lokasjon',
                'egenskap': 'region',
                'rad2': true,
                'verdier': []
            };
            
            $http.get(nvdbapi+'/omrader/regioner.json').success(function(data) {

                for (var i = 0; i < data['regioner'].length; i++) {
                    var omrade = data['regioner'][i];
                    $rootScope.valg.Region.verdier.push({
                        'navn': omrade.navn,
                        'verdi': [omrade.nummer]
                    });
                    
                    $rootScope.valg[omrade.navn] = {
                        'type': 'lokasjon',
                        'egenskap': 'fylke',
                        'verdier': []
                    };
                }
                $rootScope.valg['ØST'].verdier = [
                    {'navn': "\u00d8stfold", 'verdi': [1]},
                    {'navn': "Akershus", 'verdi': [2]},
                    {'navn': "Oslo", 'verdi': [3]},
                    {'navn': "Hedmark", 'verdi': [4]},
                    {'navn': "Oppland", 'verdi': [5]}
                ];

                $rootScope.valg['SØR'].verdier = [
                    {'navn': "Buskerud", 'verdi': [6]},
                    {'navn': "Vestfold", 'verdi': [7]},
                    {'navn': "Telemark", 'verdi': [8]},
                    {'navn': "Aust-Agder", 'verdi': [9]},
                    {'navn': "Vest-Agder", 'verdi': [10]}
                ];

                $rootScope.valg['VEST'].verdier = [
                    {'navn': "Rogaland", 'verdi': [11]},
                    {'navn': "Hordaland", 'verdi': [12]},
                    {'navn': "Sogn og Fjordane", 'verdi': [14]}
                ];

                $rootScope.valg['MIDT'].verdier = [
                    {'navn': "M\u00f8re og Romsdal", 'verdi': [15]},
                    {'navn': "S\u00f8r-Tr\u00f8ndelag", 'verdi': [16]},
                    {'navn': "Nord-Tr\u00f8ndelag", 'verdi': [17]}
                ];

                $rootScope.valg['NORD'].verdier = [
                    {'navn': "Nordland", 'verdi': [18]},
                    {'navn': "Troms", 'verdi': [19]},
                    {'navn': "Finnmark", 'verdi': [20]}
                ];
            });
        },
        
        
        fylke: function() {
        
            $rootScope.valg.Fylke = {
                'type': 'lokasjon',
                'egenskap': 'fylke',
                'rad2': true,
                'verdier': []
            };
            
            // koblingstabell[Fylkesnr] = Fylkesnavn
            $rootScope.koblingstabell = {};
            
            var promise = $http.get(nvdbapi+'/omrader/fylker.json').success(function(data) {
                for (var i = 0; i < data['fylker'].length; i++) {
                    var omrade = data['fylker'][i];
                    $rootScope.valg.Fylke.verdier.push({
                        'navn': omrade.navn,
                        'verdi': [omrade.nummer]
                    });
                    
                    $rootScope.valg[omrade.navn] = {
                        'type': 'lokasjon',
                        'egenskap': 'kommune',
                        'verdier': []
                    };
                    
                    $rootScope.koblingstabell[omrade.nummer] = omrade.navn;
                }
            });
            return promise;
        },
        
        
        kommune: function() {

            $rootScope.valg.Kommune = {
                'type': 'lokasjon',
                'egenskap': 'kommune',
                'verdier': []
            };
            
            $http.get(nvdbapi+'/omrader/kommuner.json').success(function(data) {

                for (var i = 0; i < data['kommuner'].length; i++) {
                    var omrade = data['kommuner'][i];
                    
                    if (omrade.nummer > 1000) {
                        var fylkesnr = Number(String(omrade.nummer).substr(0,2));
                    } else {
                        var fylkesnr = Number(String(omrade.nummer).substr(0,1));
                    }

                    $rootScope.valg.Kommune.verdier.push({
                        'navn': omrade.navn,
                        'verdi': [omrade.nummer]
                    });
                    
                    // Siden Oslo ikke finnes
                    if (fylkesnr != 3) {
                        $rootScope.valg[$rootScope.koblingstabell[fylkesnr]].verdier.push({
                            'navn': omrade.navn,
                            'verdi': [omrade.nummer]
                        });
                    }
 
                }
                $rootScope.valg.Kommune.verdier.sort(function(a, b) {
                    if (a.navn > b.navn) {
                        return 1;
                    }
                    if (a.navn < b.navn) {
                        return -1;
                    }
                    return 0;
                });   
            });

        }
        
    };
    
}]);