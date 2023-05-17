class Songo{
    

    constructor(){
        this.coteJoueur1 = [5,5,5,5,5,5,5];
        this.coteJoueur2 =  [5,5,5,5,5,5,5];
        this.pointJoueur1 = 0;
        this.pointJoueur2 = 0;
        this.col1 = 0;
        this.col3 = 0;

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
        //qui retourne 0 ou 1 si le joueur est respectivement bloque ou non

    }

    distribution(idJ,indice_cellule) {
        //qui retourne un entier correspondant a l'indice de la derniere cellule ou s'est effectuee la distribution.

        this.afficher();

        let indice_cellule_prise;
        let tableau = this.tableau_distribution();

        valeur = tableau[indice_cellule];



        //cellule ici est la cellule sur laquelle on a clique


        if(valeur == 0){
            //Le tableau ne change pas.

            //Le joueur doit rejouer

        }else{

            if(index == 6 || index ==13){

                if(valeur == 1 || valeur == 2){
                    //gestion des interdits

                    //si il y aura prise, on peut jouer la case

                    //si c'est la seule case qui dispose des pierres,on peut la jouer

                }
            }else{
            
                for(let i = indice_cellule+1; i< indice_cellule+1+valeur;i++){
                    //ici on a i comme l'indice des prochaines cellules a incrementer.
                    let index = i%14;
                    
                    tableau[index]++;
                    //La cellule est incrementer
                
                    indice_cellule_prise = index;
                }
            }
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

        let cellule_prise = tableau[indice_cellule_prise];
        //cellule_prise est la cellule sur laquelle on testera s'il y a une prise ou non.

        let cellule_prise_suivante = tableau[indice_cellule_prise + 1];
        //cellule_prise_suivante

        if(2 <= cellule_prise.value <= 4){
            //si la cellule prise est entre 2 et 4.

            this.col(idJ).value += cellule_prise;

            tableau[indice_cellule_prise] = 0;


            if(2 <= cellule_prise_suivante <= 4){
                //si la cellule prise est entre 2 et 4.

                this.col(idJ) += cellule_prise_suivante;
                
                tableau[indice_cellule_prise + 1] = 0;
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
                const element = this.coteJoueur1[index];
                
                somme2 += element;
            }

            somme2 = somme2 + this.nbPoints(1);

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

    coteJoueur(idJ){
        if (idJ == 1) {
            return this.coteJoueur1;
        }
        if (idJ == 2) {
            return this.coteJoueur2;
        }
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

    col(idJ){
        //Renvoie la cellule ou est garde les pierres prises par le joueur idJ

        if(idJ == 1){
            return this.col1;
        }
        if(idJ == 2){
            return this.col2;
        }
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
    
        document.getElementById("col1").innerHTML = this.col1;
        document.getElementById("col3").innerHTML = this.col3;
    }
    
}


function getIndice(){
    //let indice;
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button =>{
        button.addEventListener("click", event => {
            value = event.target.value;
            alert("valeur du bouton : " + event.target.value);
        });
    });
    return value; 
};
document.getElementById("player1[0]").innerHTML = "BUTTON";

/* monSongo = new Songo();
monSongo.afficher();
while(true){
    let indice = parseInt(getIndice());
    if(indice < 7){
        let idJ = 1;
    }
    else if(indice >= 7){
        let idJ = 2;
    };
    monSongo.prise(idJ, indice);
} */



/* 
player1 = document.getElementsByTagName(tr).item(0);
test_th0 = player1.getElementsByTagName(th).item(0);
test_th1 = player1.getElementsByTagName(th).item(1);



function test(element){

    alert(player1);

    if (test_th1 == test_th0) {
        alert(test_th1);
        element.innerHTML = "I am the best";  
    } 

    
} 
*/