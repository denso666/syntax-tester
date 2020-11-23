const dictionary = {
    'if':'Reserved Word',
    '&&':'Logic Operator - and',
    '||':'Logic Operator - or',
    '>':'Mayor',
    '>=':'Mayor or Equal',
    '<':'Minor',
    '<=':'Minor or Equal',
    '!=':'Difernt',
    '==':'Identical',
    '(':'Open Parenthesis',
    ')':'Closed Parenthesis'
}
const identifier = new RegExp('^[_a-zA-Z][_a-zA-Z0-9]{0,30}$');
const number = new RegExp('^[0-9]+(.[0-9]+)?$');


function test() {
    let sentence = document.getElementById('sentence').value;
    let temporal_token = '';
    let tokens = [];

    //letter for letter
    for (let i = 0;i<sentence.length;i++) {
        
        //space or nothing, pass the symbol
        if (sentence[i] == '' || sentence[i] == ' ') continue;

        //simple symbol 
        if (dictionary[sentence[i]] != undefined) {

            //create row and push valid symbol
            tokens.push(sentence[i]);
            craete_row(sentence[i],dictionary[sentence[i]],true);

            //temporal_token contain any word
            if (temporal_token.length) {

                if (identifier.test(temporal_token)) {
                    craete_row(temporal_token,'identifier',true);
                }
                else if (number.test(temporal_token)) {
                    craete_row(temporal_token,'number',true);
                }
                else {
                    craete_row(temporal_token,'undefined',false);
                }
                
                temporal_token = '';
            }
            continue; 
        }

        temporal_token += sentence[i];

        //complex symbol 
        if (dictionary[temporal_token] != undefined) {
            tokens.push(temporal_token);
            craete_row(temporal_token,dictionary[temporal_token],true);
            temporal_token = '';
        }

        //the sentence finalize and don¿t found any reserved symbol or word
        if (i == sentence.length-1 && temporal_token.length) {
            if (identifier.test(temporal_token)) {
                craete_row(temporal_token,'identifier',true);
            }
            else if (number.test(temporal_token)) {
                craete_row(temporal_token,'number',true);
            }
            else {
                craete_row(temporal_token,'undefined',false);
            }
        }
    }
    document.getElementById('sentence').value = "";
}

function clear_table() {
    let body = document.getElementById('body');
    body.innerHTML = "";
}

function craete_row(token,value,state) {

    let row = document.createElement('tr');

    let col = document.createElement('td');
    col.innerText = token;

    let col2 = document.createElement('td');
    col2.innerText = value;

    let col3 = document.createElement('td');
    col3.innerText = state;

    row.append(col);
    row.append(col2);
    row.append(col3)

    if (state) {
        row.className = "table-success";
    } else {
        row.className = "table-danger";
    }

    body.append(row);
}