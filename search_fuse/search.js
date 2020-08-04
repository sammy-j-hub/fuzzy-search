$(document).ready(function(){
    $('#search').keyup(function(){
        var searchValue = ($('#search').val()).trim();
        if(searchValue != ''){
            $.getJSON('list.json', function(result){
                var list = result.list;
                var options = {
                    shouldSort: true,
                    tokenize: false,
                    threshold: 0.6,
                    location: 0,
                    distance : 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    distance: 100,
                    keys: [
                        "title",
                        "author.firstName",
                        "author.lastName"
                    ]
                };
                const fuse = new Fuse(list, options);
                var searchResult = fuse.search(searchValue);
                if(searchResult.length > 0){
                    $('#results').empty();
                    for(i = 0; i < searchResult.length; i++){
                         $('#results').append('<div class="res"><h3>'+searchResult[i].title+'</h3><p>'+searchResult[i].author.firstName+' '+searchResult[i].author.lastName+'</p></div>');
                    }
                }
                else{
                    $('#results').empty();
                    $('#results').html("No results found!");
                }
            })
        }
    })
})