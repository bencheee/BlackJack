let help = [{
        title: `Title 1`,
        text: `Example Text 1`
    },
    {
        title: `Title 2`,
        text: `Example Text 2`
    },
    {
        title: `Title 3`,
        text: `Example Text 3`
    },
    {
        title: `Title 4`,
        text: `Example Text 4`
    },
    {
        title: `Title 5`,
        text: `Example Text 5`
    },
    {
        title: `Title 6`,
        text: `Example Text 6`
    },
    {
        title: `Title 7`,
        text: `Example Text 7`
    }
];

let helpCounter = 0;

$('.help-title').text(help[0].title)
$('.help-text').text(help[0].text);

$('#help-ingame').click(function () {
    $('.playing-container').hide();
    $('.controls-container').hide();
    $('.help-container').show();
}); // end listener

$('#help-close').click(function () {
    $('.playing-container').show();
    $('.controls-container').show();
    $('.help-container').hide();
}); // end listener

$('#btn-right').click(function () {
    helpCounter += 1;
    if (helpCounter > 6) {
        helpCounter = 0;
    };

    helpText(helpCounter);
}); // end listener

$('#btn-left').click(function () {
    helpCounter -= 1;
    if (helpCounter < 0) {
        helpCounter = 6;
    };

    helpText(helpCounter);
}); // end listener


function helpText(i) {
    $('.help-title').text(help[i].title)
    $('.help-text').text(help[i].text);
}; // endhelpText