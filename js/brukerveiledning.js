function startIntro(){
    var intro = introJs();
    intro.setOptions({
        steps: [
            { 
                intro: "Hello world!"
            },
            {
                element: document.querySelector('.velg_objekttype'),
                intro: "Velg objekttype",
                position: 'right'
            },
            {
                element: document.querySelector('.velg_rad'),
                intro: "Velg rad",
                position: 'left'
            },
            {
                element: document.querySelector('.velg_kolonne'),
                intro: "Velg kolonne",
                position: 'left'
            }
        ]
    });

    intro.start();
}