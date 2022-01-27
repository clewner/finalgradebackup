var randomsound = 42069;
var oldnum;
var randomnum = 42069;
var newnum;
var temp = "none";
var unold = false;
var unnew = false;

function neededGrade(form){
    var currentGrade = form.currgrade.value;
    var neededGrade;
    var finalWeight = form.finalworth.value;

    if(document.getElementById("needradio").checked == true){
        neededGrade = form.neededinput.value;
    }else{
        neededGrade = form.predictedinput.value;
    }

    const deleted = document.getElementById("sentence");
    const secdeleted = document.getElementById("finalcalc");

    const warndeleted = document.getElementById("currentgradewarning");
    const warndeletedsec = document.getElementById("neededgradewarning");
    const warndeletedthird = document.getElementById("finalweightwarning");

    if(warndeleted){
        warndeleted.remove();
        const top = document.getElementById("currentgrade");
        top.classList.remove("mb-3");
        const bottom = document.getElementById("neededgrade");
        bottom.classList.remove("mt-3");
    }

    if(warndeletedsec){
        warndeletedsec.remove();
        const top = document.getElementById("neededgrade");
        top.classList.remove("mb-3");
        const bottom = document.getElementById("finalweight");
        bottom.classList.remove("mt-3");
    }

    if(warndeletedthird){
        warndeletedthird.remove();
        const top = document.getElementById("finalweight");
        top.classList.remove("mb-3");
        const bottom = document.getElementById("predictbutton");
        bottom.classList.remove("mt-4");
    }

    if(deleted){
        deleted.remove();
        secdeleted.remove();
    }

    if((currentGrade.toString() == "") || (currentGrade<0)){
        const warning = document.createElement("SPAN");
        const warningtext = document.createTextNode("Current grade can't be empty or negative.");
        warning.appendChild(warningtext);
        warning.setAttribute("id","currentgradewarning");
        warning.classList.add("text-danger");
        warning.classList.add("border");
        warning.classList.add("border-danger");
        warning.classList.add("rounded");
        warning.classList.add("py-1");
        warning.classList.add("px-2");

        const inelement = document.getElementById("formNeeded");
        const inchild = document.getElementById("neededgrade");
        
        const top = document.getElementById("currentgrade");
        top.classList.add("mb-3");
        const bottom = document.getElementById("neededgrade");
        bottom.classList.add("mt-3");

        inelement.insertBefore(warning, inchild);

    }

    if((neededGrade.toString() == "") || (neededGrade<0)){
        const warning = document.createElement("SPAN");
        var warningtext;
        if(document.getElementById("needradio").checked == true){
            warningtext = document.createTextNode("Needed grade can't be empty or negative.");
        }else{
            warningtext = document.createTextNode("Predicted grade can't be empty or negative.");
        }
        
        warning.appendChild(warningtext);
        warning.setAttribute("id","neededgradewarning");
        warning.classList.add("text-danger");
        warning.classList.add("border");
        warning.classList.add("border-danger");
        warning.classList.add("rounded");
        warning.classList.add("py-1");
        warning.classList.add("px-2");

        const inelement = document.getElementById("formNeeded");
        const inchild = document.getElementById("finalweight");
        
        const top = document.getElementById("neededgrade");
        top.classList.add("mb-3");
        const bottom = document.getElementById("finalweight");
        bottom.classList.add("mt-3");

        inelement.insertBefore(warning, inchild);

    }

    if((finalWeight.toString() == "") || (finalWeight<0)){
        const warning = document.createElement("SPAN");
        const warningtext = document.createTextNode("Final weight can't be empty or negative.");
        warning.appendChild(warningtext);
        warning.setAttribute("id","finalweightwarning");
        warning.classList.add("text-danger");
        warning.classList.add("border");
        warning.classList.add("border-danger");
        warning.classList.add("rounded");
        warning.classList.add("py-1");
        warning.classList.add("px-2");

        const inelement = document.getElementById("formNeeded");
        const inchild = document.getElementById("predictbutton");
        
        const top = document.getElementById("finalweight");
        top.classList.add("mb-3");
        const bottom = document.getElementById("predictbutton");
        bottom.classList.add("mt-4");

        inelement.insertBefore(warning, inchild);

    }

    if ((currentGrade.toString() == "") || (neededGrade.toString() == "") || (finalWeight.toString() == "") || (finalWeight<0) || (neededGrade<0) || (currentGrade<0)){
        return false;

    }
    var predictedFinalGrade;
    if(document.getElementById("needradio").checked == true){
        predictedFinalGrade = (neededGrade - (currentGrade*(1 - finalWeight/100)))/(finalWeight/100);
    }else{
        predictedFinalGrade = neededGrade * (finalWeight/100) + currentGrade * (1 - (finalWeight/100));
    }
    
    predictedFinalGrade = Math.round((predictedFinalGrade + Number.EPSILON) * 100) / 100;
    
    const element = document.getElementById("formNeeded");
    const child = document.getElementById("predictbutton");

    const sentence = document.createElement("h6");
    const finalcalculation = document.createElement("h3");

    var node;
    var secnode;
    if(document.getElementById("needradio").checked == true){
        node = document.createTextNode("To get your overall grade to " + neededGrade.toString() + "% you'll need to score: ");
        secnode = document.createTextNode(predictedFinalGrade.toString() + "%");
    }else{
        node = document.createTextNode("If you score a " + neededGrade.toString() + "% on the final your overall grade will be: ");
        secnode = document.createTextNode(predictedFinalGrade.toString() + "%");
    }
    

    sentence.appendChild(node);
    finalcalculation.appendChild(secnode);
    
    sentence.classList.add("mt-2");
    sentence.setAttribute("id","sentence");
    
    finalcalculation.classList.add("mb-3");
    finalcalculation.setAttribute("id","finalcalc");

    element.insertBefore(sentence, child);
    element.insertBefore(finalcalculation, child);


}

function addGrader(gradeText, formname){
    const firstdiv = document.createElement("div");
    firstdiv.classList.add("col-md-5");
    firstdiv.classList.add("form-group");
    firstdiv.classList.add("pt-3");
    firstdiv.classList.add("mx-auto");
    firstdiv.classList.add("inlinebox");
    firstdiv.setAttribute("id", "extra");

    const firstlabel = document.createElement("label");
    const node = document.createTextNode(gradeText + "\xA0");

    firstlabel.appendChild(node);

    

    const firstinput = document.createElement("input");
    firstinput.setAttribute("type", "number");
    firstinput.setAttribute("name", formname);
    firstinput.setAttribute("min", "0");
    firstinput.setAttribute("onkeypress", "return event.charCode >= 48 && event.charCode <= 57");
    firstinput.setAttribute("placeholder", "0");
    firstinput.classList.add("form");
    firstinput.classList.add("rounded");
    firstinput.classList.add("border");
    firstinput.classList.add("col-3");

    firstdiv.appendChild(firstinput);
    firstdiv.insertBefore(firstlabel, firstinput);

    return firstdiv;

}

function addWeighted(gradeText, formname){
    const firstdiv = document.createElement("div");
    firstdiv.classList.add("col-md-7");
    firstdiv.classList.add("form-group");
    firstdiv.classList.add("pt-3");
    firstdiv.classList.add("mx-auto");
    firstdiv.classList.add("inlinebox");
    firstdiv.setAttribute("id", "weightedbox");

    const firstlabel = document.createElement("label");
    const node = document.createTextNode(gradeText + "\xA0");

    firstlabel.appendChild(node);

    

    const firstinput = document.createElement("input");
    firstinput.setAttribute("type", "number");
    firstinput.setAttribute("name", formname);
    firstinput.setAttribute("min", "0");
    firstinput.setAttribute("onkeypress", "return event.charCode >= 48 && event.charCode <= 57");
    firstinput.setAttribute("placeholder", "0");
    firstinput.classList.add("form");
    firstinput.classList.add("rounded");
    firstinput.classList.add("border");
    firstinput.classList.add("col-3");

    firstdiv.appendChild(firstinput);
    firstdiv.insertBefore(firstlabel, firstinput);

    return firstdiv;

}

function onMinusPlus(){
    for(var i = 0; i<10; i++){
        var deleteExtra = document.getElementById("extra");
        if(deleteExtra){
            deleteExtra.remove();
        }
    }

    var checkBox = document.getElementById("plusminuscheck");

    if (checkBox.checked == true){
        const element = document.getElementById("gpaform");
        var child = document.getElementById("agrade");
        element.insertBefore(addGrader("Number of A+ grades:", "aplusgrade"), child);

        child = document.getElementById("bgrade");
        element.insertBefore(addGrader("Number of A- grades:", "aminusgrade"), child);
        element.insertBefore(addGrader("Number of B+ grades:", "bplusgrade"), child);

        child = document.getElementById("cgrade");
        element.insertBefore(addGrader("Number of B- grades:", "bminusgrade"), child);
        element.insertBefore(addGrader("Number of C+ grades:", "cplusgrade"), child);

        child = document.getElementById("dgrade");
        element.insertBefore(addGrader("Number of C- grades:", "cminusgrade"), child);
        element.insertBefore(addGrader("Number of D+ grades:", "dplusgrade"), child);

        child = document.getElementById("fgrade");
        element.insertBefore(addGrader("Number of D- grades:", "dminusgrade"), child);
        element.insertBefore(addGrader("Number of F+ grades:", "fplusgrade"), child);

        child = document.getElementById("weightedbox");
        if(child){
            element.insertBefore(addGrader("Number of F- grades:", "fminusgrade"), child);
        }else{
            child = document.getElementById("buttongpa");
            element.insertBefore(addGrader("Number of F- grades:", "fminusgrade"), child);
        }

    }


}

function onWeighted(){

    var deletedWeighted = document.getElementById("weightedbox");
    if(deletedWeighted){
        deletedWeighted.remove();
    }

    var weightedBox = document.getElementById("weightedcheck");
    if(weightedBox.checked == true){
        const element = document.getElementById("gpaform");
        var child = document.getElementById("buttongpa");
        element.insertBefore(addWeighted("Number of weighted classes taken: ", "weightedclasses"), child);
    }
}

function gpaSubmit(form){

    const firstdelete = document.getElementById("finalthingsec");
    const secdelete = document.getElementById("finalthing");

    if(firstdelete){
        firstdelete.remove();
        secdelete.remove();
    }

    
    var aGrade = parseInt(form.agrade.value);
    var bGrade = parseInt(form.bgrade.value);
    var cGrade = parseInt(form.cgrade.value);
    var dGrade = parseInt(form.dgrade.value);
    var fGrade = parseInt(form.fgrade.value);

    if(aGrade.toString() == "NaN"){
        aGrade = 0;
    }
    if(bGrade.toString() == "NaN"){
        bGrade = 0;
    }
    if(cGrade.toString() == "NaN"){
        cGrade = 0;
    }
    if(dGrade.toString() == "NaN"){
        dGrade = 0;
    }
    if(fGrade.toString() == "NaN"){
        fGrade = 0;
    }
    

    var weighted = 0;
    var finalgpa;

    const weightedexist = document.getElementById("weightedbox");
    if(weightedexist){
        weighted = parseInt(form.weightedclasses.value);
    }

    const minusplus = document.getElementById("extra");
    if(minusplus){
        var aplusGrade = parseInt(form.aplusgrade.value);
        var aminusGrade = parseInt(form.aminusgrade.value);

        var bplusGrade = parseInt(form.bplusgrade.value);
        var bminusGrade = parseInt(form.bminusgrade.value);

        var cplusGrade = parseInt(form.cplusgrade.value);
        var cminusGrade = parseInt(form.cminusgrade.value);

        var dplusGrade = parseInt(form.dplusgrade.value);
        var dminusGrade = parseInt(form.dminusgrade.value);

        var fplusGrade = parseInt(form.fplusgrade.value);
        var fminusGrade = parseInt(form.fminusgrade.value);


        if(aminusGrade.toString() == "NaN"){
            aminusGrade = 0;
        }
        if(bminusGrade.toString() == "NaN"){
            bminusGrade = 0;
        }
        if(cminusGrade.toString() == "NaN"){
            cminusGrade = 0;
        }
        if(dminusGrade.toString() == "NaN"){
            dminusGrade = 0;
        }
        if(fminusGrade.toString() == "NaN"){
            fminusGrade = 0;
        }

        if(aplusGrade.toString() == "NaN"){
            aplusGrade = 0;
        }
        if(bplusGrade.toString() == "NaN"){
            bplusGrade = 0;
        }
        if(cplusGrade.toString() == "NaN"){
            cplusGrade = 0;
        }
        if(dplusGrade.toString() == "NaN"){
            dplusGrade = 0;
        }
        if(fplusGrade.toString() == "NaN"){
            fplusGrade = 0;
        }


        finalgpa = (weighted + (aplusGrade * 4) + (aGrade * 4) + (aminusGrade * 3.7) + (bplusGrade * 3.3) + (bGrade * 3) + (bminusGrade * 2.7) + (cplusGrade * 2.3) + (cGrade * 2) + (cminusGrade * 1.7) + (dplusGrade * 1.3) + (dGrade * 1) + (dminusGrade * 0.7) + (fplusGrade * 0) + (fGrade * 0) + (fminusGrade * 0))/(aplusGrade + aGrade + aminusGrade + bplusGrade + bGrade + bminusGrade + cplusGrade + cGrade + cminusGrade + dplusGrade + dGrade + dminusGrade + fplusGrade + fGrade + fminusGrade);
        
        if(finalgpa.toString() == "NaN"){
            finalgpa = 0;
        }
        
        finalgpa = finalgpa.toFixed(3);
        

        const element = document.getElementById("holder");
        const sentence = document.createElement("h6");
        const node = document.createTextNode("Your GPA is: ");
        sentence.appendChild(node);
        sentence.setAttribute("id", "finalthing");
        sentence.classList.add("inlinebox");
        const gpatext = document.createElement("h3");
        const secnode = document.createTextNode(finalgpa);
        gpatext.appendChild(secnode);
        gpatext.setAttribute("id", "finalthingsec");
        gpatext.classList.add("inlinebox");

        element.appendChild(sentence);
        element.appendChild(gpatext);

    }else{
        finalgpa = (weighted + (aGrade * 4) + (bGrade * 3) + (cGrade * 2) + (dGrade * 1) + (fGrade * 0))/(aGrade + bGrade + cGrade + dGrade + fGrade);
        if(finalgpa.toString() == "NaN"){
            finalgpa = 0;
        }
        finalgpa = finalgpa.toFixed(3);

        const element = document.getElementById("holder");
        const sentence = document.createElement("h6");
        const node = document.createTextNode("Your GPA is: ");
        sentence.appendChild(node);
        sentence.setAttribute("id", "finalthing");
        sentence.classList.add("inlinebox");
        const gpatext = document.createElement("h3");
        const secnode = document.createTextNode(finalgpa);
        gpatext.appendChild(secnode);
        gpatext.setAttribute("id", "finalthingsec");
        gpatext.classList.add("inlinebox");

        element.appendChild(sentence);
        element.appendChild(gpatext);
    }

}

function onRadio(){

    var data;
    var dataTransfer = document.getElementById("neededinput");
    if(dataTransfer){
        data = dataTransfer.value;
    }else{
        data = document.getElementById("predictedinput").value;
    }

    const deleted = document.getElementById("sentence");
    const secdeleted = document.getElementById("finalcalc");

    const warndeleted = document.getElementById("currentgradewarning");
    const warndeletedsec = document.getElementById("neededgradewarning");
    const warndeletedthird = document.getElementById("finalweightwarning");

    if(warndeleted){
        warndeleted.remove();
        const top = document.getElementById("currentgrade");
        top.classList.remove("mb-3");
        const bottom = document.getElementById("neededgrade");
        bottom.classList.remove("mt-3");
    }

    if(warndeletedsec){
        warndeletedsec.remove();
        const top = document.getElementById("neededgrade");
        top.classList.remove("mb-3");
        const bottom = document.getElementById("finalweight");
        bottom.classList.remove("mt-3");
    }

    if(warndeletedthird){
        warndeletedthird.remove();
        const top = document.getElementById("finalweight");
        top.classList.remove("mb-3");
        const bottom = document.getElementById("predictbutton");
        bottom.classList.remove("mt-4");
    }

    if(deleted){
        deleted.remove();
        secdeleted.remove();
    }

    var deletedone = document.getElementById("neededinput");
    if(deletedone){
        deletedone.remove();
    }else{
        var thirdelete = document.getElementById("predictedinput");
        thirdelete.remove();
    }

    if(document.getElementById("needradio").checked == true){
        const button = document.getElementById("changebutton");
        button.innerHTML = "Calculate Needed Final Grade";
        const label = document.getElementById("changelabel");
        label.innerHTML = "The grade you want (%): ";

        const input = document.createElement("input");
        input.setAttribute("id", "neededinput");
        input.classList.add("form-control");
        input.classList.add("mb-2");
        input.setAttribute("type", "number");
        input.setAttribute("name", "neededinput");
        input.setAttribute("required", "");
        input.setAttribute("value", data);

        var connector = document.getElementById("neededgrade");
        connector.appendChild(input);
    
    }else{
        const button = document.getElementById("changebutton");
        button.innerHTML = "Calculate Predicted Final Grade";
        const label = document.getElementById("changelabel");
        label.innerHTML = "What you think you will score on the final (%): "

        const input = document.createElement("input");
        input.setAttribute("id", "predictedinput");
        input.classList.add("form-control");
        input.classList.add("mb-2");
        input.setAttribute("type", "number");
        input.setAttribute("name", "predictedinput");
        input.setAttribute("required", "");
        input.setAttribute("value", data);

        var connector = document.getElementById("neededgrade");
        connector.appendChild(input);
    }
}

function wordGenerator(){
    fetch('wordlist.json')
        .then(response => response.json())
        .then(data => {
            if(temp == "back"){
                randomnum = oldnum;
            }else if(temp == "front"){
                randomnum = newnum;
            }

            

            oldnum = randomnum;
            randomnum = Math.floor(Math.random() * data.words.length);
            randomsound = randomnum;
            var pos = data.words[randomnum].meanings[0].partOfSpeech;
            var abrv;

            if(pos == "noun"){
                abrv = "(n.) ";

            }else if(pos == "verb"){
                abrv = "(v.) ";

            }else if(pos == "adjective"){
                abrv = "(adj.) ";

            }else if(pos == "adverb"){
                abrv = "(adv.) ";
            }

            
            document.getElementById("wordchange").innerHTML = (data.words[randomnum].word).toUpperCase();
            document.getElementById("defchange").innerHTML = abrv + data.words[randomnum].meanings[0].definitions[0].definition.slice(0, -1);
            if(data.words[randomnum].meanings[0].definitions[0].example){
                document.getElementById("examplechange").innerHTML = "(" + data.words[randomnum].meanings[0].definitions[0].example + ")";
            }else{
                document.getElementById("examplechange").innerHTML = "";
            }
            if(data.words[randomnum].phonetics[0].audio){
                document.getElementById("soundimg").style.display = "inline";
            }else{
                document.getElementById("soundimg").style.display = "none";
            }
            const backarrow = document.getElementById("svgback");
            if(oldnum == 42069){
                
                if(backarrow.classList.contains("text-primary")){
                    
                }else{
                    backarrow.classList.add("text-primary");
                    backarrow.style.cursor = "auto";
                    unold = false;
                }
            }else{
                if(backarrow.classList.contains("text-primary")){
                    backarrow.classList.remove("text-primary");
                    backarrow.style.cursor = "pointer";
                    unold = true;
                }
            }

            const frontarrow = document.getElementById("svgfront");
            if(frontarrow.classList.contains("text-primary")){
                
            }else{
                unnew = false;
                frontarrow.classList.add("text-primary");
                frontarrow.style.cursor = "auto";
            }


            temp = "";
            

        
        
        })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function onsoundclick(){
    
    if(randomsound == 42069){
        playSound("//ssl.gstatic.com/dictionary/static/sounds/20200429/word--_gb_1.8.mp3");
    }else{
        fetch('wordlist.json')
        .then(response => response.json())
        .then(data => {
            playSound(data.words[randomsound].phonetics[0].audio);
            
        })
        
    }

}


function playSound(url) {
    var a = new Audio(url);
    a.play();
}

function onback(){
    if(unold){
        fetch('wordlist.json')
            .then(response => response.json())
            .then(data => {
                
                newnum = randomnum;
                randomsound = oldnum;
                
                var pos = data.words[oldnum].meanings[0].partOfSpeech;
                var abrv;

                if(pos == "noun"){
                    abrv = "(n.) ";

                }else if(pos == "verb"){
                    abrv = "(v.) ";

                }else if(pos == "adjective"){
                    abrv = "(adj.) ";

                }else if(pos == "adverb"){
                    abrv = "(adv.) ";
                }

                
                document.getElementById("wordchange").innerHTML = (data.words[oldnum].word).toUpperCase();
                document.getElementById("defchange").innerHTML = abrv + data.words[oldnum].meanings[0].definitions[0].definition.slice(0, -1);
                if(data.words[oldnum].meanings[0].definitions[0].example){
                    document.getElementById("examplechange").innerHTML = "(" + data.words[oldnum].meanings[0].definitions[0].example + ")";
                }else{
                    document.getElementById("examplechange").innerHTML = "";
                }
                if(data.words[oldnum].phonetics[0].audio){
                    document.getElementById("soundimg").style.display = "inline";
                }else{
                    document.getElementById("soundimg").style.display = "none";
                }
                
                const backarrow = document.getElementById("svgback");
                
                    
                if(backarrow.classList.contains("text-primary")){
                        
                }else{
                    backarrow.classList.add("text-primary");
                    backarrow.style.cursor = "auto";
                    unold = false;
                }
                

                const frontarrow = document.getElementById("svgfront");
                if(frontarrow.classList.contains("text-primary")){
                    frontarrow.classList.remove("text-primary");
                    unnew = true;
                    frontarrow.style.cursor = "pointer";
                }

                temp = "back";

            
            
        })
    }
}

function onfront(){
    if(unnew){
        fetch('wordlist.json')
            .then(response => response.json())
            .then(data => {
                
                randomsound = newnum;
                var pos = data.words[newnum].meanings[0].partOfSpeech;
                var abrv;

                if(pos == "noun"){
                    abrv = "(n.) ";

                }else if(pos == "verb"){
                    abrv = "(v.) ";

                }else if(pos == "adjective"){
                    abrv = "(adj.) ";

                }else if(pos == "adverb"){
                    abrv = "(adv.) ";
                }

                
                document.getElementById("wordchange").innerHTML = (data.words[newnum].word).toUpperCase();
                document.getElementById("defchange").innerHTML = abrv + data.words[newnum].meanings[0].definitions[0].definition.slice(0, -1);
                if(data.words[newnum].meanings[0].definitions[0].example){
                    document.getElementById("examplechange").innerHTML = "(" + data.words[newnum].meanings[0].definitions[0].example + ")";
                }else{
                    document.getElementById("examplechange").innerHTML = "";
                }
                if(data.words[newnum].phonetics[0].audio){
                    document.getElementById("soundimg").style.display = "inline";
                }else{
                    document.getElementById("soundimg").style.display = "none";
                }

                const frontarrow = document.getElementById("svgfront");
                if(frontarrow.classList.contains("text-primary")){
                    
                }else{
                    frontarrow.classList.add("text-primary");
                    unnew = false;
                    frontarrow.style.cursor = "auto";
                }
                
                const backarrow = document.getElementById("svgback");
                if(backarrow.classList.contains("text-primary")){
                    backarrow.classList.remove("text-primary");
                    backarrow.style.cursor = "pointer";
                    unold = true;
                }
                
                temp = "front";
                
                

            
            
        })
    }
}
