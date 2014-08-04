app.controller("velkomstsideCtrl", ['$scope', function ($scope) {

    $scope.standardrapporter = [
        {
            'tittel': 'Veglengder',
            'url': '#!/rapport?objekttype=Vegreferanse&rad=Fylke&rad2=false&kolonne=Vegkategori&egenskapsfilter=%5B%7B%22type%22:%22Vegtype%22,%22operator%22:%22!%3D%22,%22verdi%22:%5B%22Fiktiv%22%5D%7D,%7B%22type%22:%22Envegsregulering%22,%22operator%22:%22!%3D%22,%22verdi%22:%5B%22Enveg%20Mot%22%5D%7D%5D&radfilter='
        },
        {
            'tittel': 'Vegbredde',
            'url': '#!/rapport?objekttype=Vegbredde,%20beregnet&rad=Vegkategori&rad2=false&kolonne=Vegbredde,%20beregnet:%20Dekkebredde&egenskapsfilter=%5B%5D&intervall=3%205%207%209%2011%2013&radfilter=Kommunal%20veg,Privat%20veg,Skogsbilveg'
        },
        {
            'tittel': 'Trafikkmengde',
            'url': '#!/rapport?objekttype=Trafikkmengde&rad=Fylke&rad2=false&kolonne=Trafikkmengde:%20%C3%85DT,%20total&egenskapsfilter=%5B%5D&radfilter=&intervall=100%20500%201000%205000%2010000%2050000'
        },
        {
            'tittel': 'Elgskilt i NT',
            'url': '#!/rapport?objekttype=Skiltplate&rad=Fylke&rad2&kolonne=Vegkategori&egenskapsfilter=%5B%7B%22type%22:%22Skiltnummer%20HB-050%22,%22operator%22:%22%3D%22,%22verdi%22:%5B%22146.1%20-%20Elg%22%5D%7D%5D&radfilter=%C3%98STFOLD,AKERSHUS,HEDMARK,OPPLAND,BUSKERUD,VESTFOLD,TELEMARK,AUST-AGDER,VEST-AGDER,ROGALAND,HORDALAND,SOGN%20OG%20FJORDANE,M%C3%98RE%20OG%20ROMSDAL,S%C3%98R-TR%C3%98NDELAG,NORDLAND,TROMS,FINNMARK&intervall=100%20500%201000%205000%2010000%2050000'
        },
        {
            'tittel': 'Tunneler',
            'url': '#!/rapport?objekttype=Tunnel&rad=Fylke&rad2=false&kolonne=Vegkategori&egenskapsfilter=%5B%5D&radfilter=&intervall=100%20500%201000%205000%2010000%2050000'
        },
        {
            'tittel': 'Bruer',
            'url': '#!/rapport?objekttype=Bru&rad=Fylke&rad2=false&kolonne=Vegkategori&egenskapsfilter=%5B%5D&radfilter=&intervall=100%20500%201000%205000%2010000%2050000'
        },
        {
            'tittel': 'Kollektivfelt',
            'url': '#!/rapport?objekttype=Feltstrekning&rad=Fylke&rad2=false&kolonne=Vegkategori&egenskapsfilter=%5B%7B%22type%22:%22Feltoversikt%22,%22operator%22:%22%3D%22,%22verdi%22:%5B%22*K*%22%5D%7D%5D&radfilter='
        }
    ];

}]);