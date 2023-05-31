class Songo{
    

    constructor(){
        this.coteJoueur1 = [5,5,5,5,5,5,5];
        this.coteJoueur2 =  [5,5,5,5,5,5,5];
        this.pointJoueur1 = 0;
        this.pointJoueur2 = 0;

    }

    nbPoints(idJ) {
        //qui retourne le nombre de points du joueur idJ

        if(idJ == 1){
            return this.pointJoueur1;
        }
        if(idJ == 2){
            return this.pointJoueur2;
        }

        
    }

    estBloque(idJ) {
        //qui retourne 1 ou 0 si le joueur est respectivement bloque ou non

        if(idJ == 1){
            let somme1 = 0;
            for (let index = 0; index < this.coteJoueur1.length; index++) {
                const element = this.coteJoueur1[index];
                
                somme1 += element;
            }
            if((somme1 == 0) || (somme1 == this.coteJoueur1[6] && somme1 > 2)){
                //Le joueur est bloque
                return 1;
            }
            return 0;
        }
        if(idJ == 2){
            let somme2 = 0;
            for (let index = 0; index < this.coteJoueur2.length; index++) {
                const element = this.coteJoueur2[index];
                
                somme2 += element;
            }
            if((somme2 == 0) || (somme2 == this.coteJoueur2[6] && somme2 > 2)){
                //Le joueur est bloque
                return 1;
            }
            return 0;
        }
    }

    distribution(idJ,indice_cellule) {
        //qui retourne un entier correspondant a l'indice de la derniere cellule ou s'est effectuee la distribution.

        this.afficher();

        let indice_cellule_prise = 0;
        let tableau = this.tableau_distribution();

        let valeur;
        valeur = tableau[indice_cellule];

        //cellule ici est la cellule sur laquelle on a clique

        let jeu = true;

        if(indice_cellule == 6 || indice_cellule ==13){
            
            jeu = false;

            if(valeur == 1 || valeur == 2){
                //gestion des interdits
                if(valeur == 2){
                    //si il y aura prise, on peut jouer la case
                    let indice_test_prise = indice_cellule + 1 + valeur - 1;//indice_cellule_prise
                    let test_valeur = tableau[(indice_test_prise)%14] + 1;//valeur de la cellule_prise apres la distribution
                    if(2 <= test_valeur && test_valeur <= 4){
                        //Donc il y aura prise, on joue.
                        jeu = true;
                    } 

                    //si c'est la seule case qui dispose des pierres,on peut la jouer
                    if(idJ == 1){
                        let somme1 = 0;
                        for (let index = 0; index < this.coteJoueur1.length; index++) {
                            const element = this.coteJoueur1[index];
                            
                            somme1 += element;
                        }
                        if(somme1 == 2){
                            // Donc c'est la seule case du joueur qui dispose de pierres.
                            jeu = true;
                        }
                    }
                    if(idJ == 2){
                        let somme2 = 0;
                        for (let index = 0; index < this.coteJoueur2.length; index++) {
                            const element = this.coteJoueur2[index];
                            
                            somme2 += element;
                        }
                        if(somme2 == 2){
                            // Donc c'est la seule case du joueur qui dispose de pierres.
                            jeu = true;
                        }
                    }
                }
            }
        }

        if(jeu){
            // Jeu
            // incrementation
            for(let i = indice_cellule+1; i< indice_cellule+1+valeur;i++){
                //ici on a i comme l'indice des prochaines cellules a incrementer.
                let index = i%14;
                
                tableau[index]++;
                //La cellule est incrementer
            
                indice_cellule_prise = index;
            }
            // mise a zero
            tableau[indice_cellule] = 0;

        }
        

        this.actualiser(tableau);
        this.afficher();

    
        return indice_cellule_prise;
    }
    

    prise(idJ,indice_cellule) {
        //qui realise la prise

        //cellule ici est la cellule sur laquelle on a clique

        let indice_cellule_prise = this.distribution(idJ,indice_cellule);

        let tableau = this.tableau_distribution();

        // si au terme d'une distribution, toutes les 7 cases d'un joueur ont un nombre compris entre 2 et 4, aucune prise n'est faite.
        let prise = false;
        for (let index = 0; index < this.coteJoueur1.length; index++) {
            const element = this.coteJoueur1[index];

            if((2 <= element && element <= 4 ) && (!prise) ){
                //on passe a l'element suivant
            }else{
                //on a un element qui n'est pas compris entre 2 et 4
                prise = true;
            }
            
        }
        if(!prise){
            //si prise est toujours false i.e tous les elements du joueur 1 son compris entre 2 et 4 alors on teste ceux du joueur 2.
            for (let index = 0; index < this.coteJoueur2.length; index++) {
                const element = this.coteJoueur2[index];
    
                if((2 <= element && element <= 4 ) && (!prise) ){
                    //on passe a l'element suivant
                }else{
                    //on a un element qui n'est pas compris entre 2 et 4
                    prise = true;
                }
                
            }
        }

        if(prise){
            // si la distribution se termine sur une cellule adverse
            let cellule_adverse = false;
            if(indice_cellule_prise < 7 && idJ == 2){
                cellule_adverse = true;
            }
            if(indice_cellule_prise >= 7 && idJ == 1){
                cellule_adverse = true;
            }

            if(cellule_adverse){
                let cellule_prise = tableau[indice_cellule_prise];
                //cellule_prise est la cellule sur laquelle on testera s'il y a une prise ou non.

                let cellule_prise_precedente = tableau[(indice_cellule_prise - 1)%14];
                //cellule_prise_precedente

                if(2 <= cellule_prise && cellule_prise <= 4){
                    //si la cellule prise est entre 2 et 4.

                    if(idJ == 1){
                        this.pointJoueur1 += cellule_prise;
                    }else{
                        this.pointJoueur2 += cellule_prise;
                    }
                    tableau[indice_cellule_prise] = 0;


                    if(2 <= cellule_prise_precedente && cellule_prise_precedente <= 4){
                        //si la cellule prise est entre 2 et 4.

                        if(idJ == 1){
                            this.pointJoueur1 += cellule_prise_precedente;
                        }else{
                            this.pointJoueur2 += cellule_prise_precedente;
                        }
                        
                        tableau[(indice_cellule_prise - 1)%14] = 0;
                    }
                }
            }
        }

        this.actualiser(tableau);
        this.afficher();
    }

    poursuiteJeu() {
        //qui retourne 0 si le jeu se poursuit ou i si le jeu s'arrete et i comme retour si le joueur i gagne.

        for (let id = 1; id < 3; id++) {
         
            if (this.nbPoints(id) > 35) {
                return id;
            }
        }

        if (this.nbrePierresEnJeu() < 10) {
            let somme1 = 0;

            for (let index = 0; index < this.coteJoueur1.length; index++) {
                const element = this.coteJoueur1[index];
                
                somme1 += element;
            }

            somme1 = somme1 + this.nbPoints(1);

            if (somme1 > 35) {
                return 1;
            }
            
            let somme2 = 0;

            for (let index = 0; index < this.coteJoueur1.length; index++) {
                const element = this.coteJoueur2[index];
                
                somme2 += element;
            }

            somme2 = somme2 + this.nbPoints(2);

            if (somme2 > 35) {
                return 2;
            }
        }

        return 0;
       
    }

    nbrePierresEnJeu(){
        //qui retourne le nbre de pierres en jeu en excluant les prises.

        let nbre = 0;
        for (let index = 0; index < this.coteJoueur1.length; index++) {
            const element = this.coteJoueur1[index];

            nbre += element ;
            
        }
        for (let index = 0; index < this.coteJoueur2.length; index++) {
            const element = this.coteJoueur2[index];

            nbre += element ;
            
        }

        return nbre;
    }

    tableau_distribution(){
        //tableau qui va permettre de faire la distribution    
        let tableau = [];

        for (let index = 0; index < this.coteJoueur1.length; index++) {
            let element = this.coteJoueur1[index];
            tableau.push(element);
        }
        for (let index = 0; index < this.coteJoueur2.length; index++) {
            let element = this.coteJoueur2[index];
            tableau.push(element);
        }
        return tableau;
    }

    actualiser(tableau){

        // actualise ou modifie les donnees des coteJoueur[]
        for (let index = 0; index < tableau.length; index++) {
            const element = tableau[index];

            if(index < 7){
                this.coteJoueur1[index] = element;
            }else{
                this.coteJoueur2[index-7] = element;
            }
            
        }
    }

    afficher(){
        document.getElementById("player1[0]").innerHTML = this.coteJoueur1[0];
        document.getElementById("player1[1]").innerHTML = this.coteJoueur1[1];
        document.getElementById("player1[2]").innerHTML = this.coteJoueur1[2];
        document.getElementById("player1[3]").innerHTML = this.coteJoueur1[3];
        document.getElementById("player1[4]").innerHTML = this.coteJoueur1[4];
        document.getElementById("player1[5]").innerHTML = this.coteJoueur1[5];
        document.getElementById("player1[6]").innerHTML = this.coteJoueur1[6];
    
        document.getElementById("player2[0]").innerHTML = this.coteJoueur2[0];
        document.getElementById("player2[1]").innerHTML = this.coteJoueur2[1];
        document.getElementById("player2[2]").innerHTML = this.coteJoueur2[2];
        document.getElementById("player2[3]").innerHTML = this.coteJoueur2[3];
        document.getElementById("player2[4]").innerHTML = this.coteJoueur2[4];
        document.getElementById("player2[5]").innerHTML = this.coteJoueur2[5];
        document.getElementById("player2[6]").innerHTML = this.coteJoueur2[6];
        
        document.getElementById("pointJoueur1").innerHTML = this.pointJoueur1;
        document.getElementById("pointJoueur2").innerHTML = this.pointJoueur2;
    }
    
}

// AJAX
function get_from_server(){
        
    let httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance de XMLHTTP');
        return false;
    }
    httpRequest.onreadystatechange = function() {

        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            //alert(response.coteJoueur1);
            for(let i = 0; i<7;i++){
            monSongo.coteJoueur1[i] = parseInt(response.coteJoueur1[i]);
            monSongo.coteJoueur2[i] = parseInt(response.coteJoueur2[i]);
            }
            monSongo.pointJoueur1 = parseInt(response.pointJoueur1);
            monSongo.pointJoueur2 = parseInt(response.pointJoueur2);
            
            //alert(songo.coteJoueur1);
            } else {
            alert('Un problème est survenu avec la requête.');
            }
        }
          
    };
    httpRequest.open('GET', 'data_get.php');
    httpRequest.send();

}

function send_to_server(){

    let httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance de XMLHTTP');
        return false;
    }
    httpRequest.onreadystatechange = function() {

        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            /* alert(response.pointJoueur1);
            alert(response.coteJoueur1);
          
            songo.coteJoueur1 = response.coteJoueur1;
            songo.coteJoueur2 = response.coteJoueur2;
            songo.pointJoueur1 = response.pointJoueur1;
            songo.pointJoueur2 = response.pointJoueur2; 
            

            alert(response.coteJoueur1); */
            } else {
            alert('Un problème est survenu avec la requête.');
            }
        }
          
    };

    let t1 = monSongo.coteJoueur1.join('|');
    let t2 = monSongo.coteJoueur2.join('|');

    httpRequest.open('POST', 'data_send.php');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   /*  httpRequest.send('coteJoueur1[0]=' + songo.coteJoueur1[0] +'&coteJoueur1[1]=' + songo.coteJoueur1[1] +'&coteJoueur1[2]=' + songo.coteJoueur1[2] +'&coteJoueur1[3]=' + songo.coteJoueur1[3] +'&coteJoueur1[4]=' + songo.coteJoueur1[4] +'&coteJoueur1[5]=' + songo.coteJoueur1[5] +'&coteJoueur1[6]=' + songo.coteJoueur1[6] + '&coteJoueur2[0]=' + songo.coteJoueur2[0] +'&coteJoueur2[1]=' + songo.coteJoueur2[1] +'&coteJoueur2[2]=' + songo.coteJoueur2[2] +'&coteJoueur2[3]=' + songo.coteJoueur2[3] +'&coteJoueur2[4]=' + songo.coteJoueur2[4] +'&coteJoueur2[5]=' + songo.coteJoueur2[5] +'&coteJoueur2[6]=' + songo.coteJoueur2[6] + '&pointJoueur1=' + songo.pointJoueur1 + '&pointJoueur2=' + songo.pointJoueur2);
     */
    httpRequest.send('coteJoueur1='+ t1 + '&coteJoueur2='+ t2 +'&pointJoueur1='+monSongo.pointJoueur1 +'&pointJoueur2='+monSongo.pointJoueur2);
}

// const controller = new AbortController();

function abonne(event){
    let indice = parseInt(event.target.value);
    let idJ;
    if(indice < 7){
        idJ = 1;
    }
    else{
        idJ = 2;        
    };

    monSongo.afficher();
    // Recevoir les donnees du serveur
    get_from_server();

    //affichage des donnees recus
    setTimeout(() => {
        monSongo.afficher();
    }, 2000);

    // Traiter les donnees
    setTimeout(() => {
            monSongo.prise(idJ,indice)
        }, 2000);
    
    // Envoyer les donnees au serveur
    send_to_server();

    // Recevoir les donnees du serveur
    get_from_server();

    //affichage des donnees recus
    monSongo.afficher()

    // Poursuite du Jeu
    if(!(monSongo.poursuiteJeu())){
        //Joueur bloque ?
        if(monSongo.estBloque(idJ)){
            alert("Le joueur " + idJ + "est bloque !");
            //Fin du jeu
            alert("Match Nul !");
            // controller.abort();
        }
    }else{
        //Fin du jeu.
        alert("Le joueur " + monSongo.poursuiteJeu() + " a gagne.");
        // controller.abort();
    }
}

function machine(event){
    let indice = parseInt(event.target.value);
    let idJ;
    if(indice < 7){
        idJ = 1;
    

        monSongo.prise(idJ, indice);
    
        let idM = 2 ;
        let indice_machine = Math.floor(Math.random() * 6) + 7;
        setTimeout(() => {
            monSongo.prise(idM,indice_machine)
        }, 3000);
    }   

    // Poursuite du Jeu
    if(!(monSongo.poursuiteJeu())){
        //Joueur bloque ?
        if(monSongo.estBloque(idJ)){
            alert("Le joueur " + idJ + " est bloque !");
            //Fin du jeu
            alert("Match Nul !");
            // controller.abort();
        }
    }else{
        //Fin du jeu.
        alert("Le joueur " + monSongo.poursuiteJeu() + " a gagne.");
        // controller.abort();
    }
}

function jouer_vs_abonne(){
    monSongo = new Songo();
    monSongo.afficher();

    //initialisation des donnees du serveur
        // Envoyer les donnees au serveur
        send_to_server(); 

    const buttons = document.querySelectorAll("th > button");

    for (const button of buttons) {
    //button.addEventListener("click", abonne, { signal: controller.signal });
    button.onclick = abonne;
    }
}

function jouer_vs_machine(){
    monSongo = new Songo();
    monSongo.afficher();

    const buttons = document.querySelectorAll("th > button");

    for (const button of buttons) {
    //button.addEventListener("click", machine, { signal: controller.signal});
    button.onclick = machine;
    }
}

const vs_machine = document.querySelector("#vs_machine");
const vs_abonne = document.querySelector("#vs_abonne");

vs_abonne.addEventListener("click", jouer_vs_abonne);
vs_machine.addEventListener("click", jouer_vs_machine);

