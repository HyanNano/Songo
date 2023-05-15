class Songo{
    

    constructor(coteJoueur1, coteJoueur2, col1, col3){
        this.coteJoueur1 = coteJoueur1;
        this.coteJoueur2 = coteJoueur2;
        this.pointJoueur1 = 0;
        this.pointJoueur2 = 0;
        this.col1 = col1;
        this.col3 = col3;

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

    distribution(idJ,cellule) {
        //qui retourne un entier correspondant a l'indice de la derniere cellule ou s'est effectuee la distribution.

        let tableau = this.tableau_distribution();


        //cellule ici est la cellule sur laquelle on a clique

        for (let index = 0; index < tableau.length; index++) {
            const element = tableau[index];
            
            if(element == cellule){
                //si cellule est cet element du tableau

                let valeur = cellule.value;

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
                    
                        for(let i = index+1; i< index+1+valeur;i++){
                            //ici on a i comme l'indice des prochaines cellules a incrementer.
                            const cell = tableau[i];
                           
                            cell.value ++;
                            //La cellule est incrementer
                        
                        }
                    }
                }
                
            }
        }
        }

    prise(idJ,cellule) {
        //qui realise la prise

        //cellule ici est la cellule sur laquelle on a clique


        let tableau = this.tableau_distribution()

        let cellule_prise = tableau[this.distribution(idJ,cellule)];
        //cellule_prise est la cellule sur laquelle on testera s'il y a une prise ou non.

        let cellule_prise_suivante = tableau[this.distribution(idJ,cellule) + 1];
        //cellule_prise_suivante

        if(2 <= cellule_prise.value <= 4){
            //si la cellule prise est entre 2 et 4.

            this.col(idJ).value += cellule_prise.value;

            cellule_prise.value = 0;


            if(2 <= cellule_prise_suivante <= 4){
                //si la cellule prise est entre 2 et 4.

                this.col(idJ).value += cellule_prise_suivante.value;
                
                cellule_prise_suivante.value = 0;
            }

        }


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
                
                somme1 += element.value;
            }

            somme1 = somme1 + this.nbPoints(1);

            if (somme1 > 35) {
                return 1;
            }
            
            let somme2 = 0;

            for (let index = 0; index < this.coteJoueur1.length; index++) {
                const element = this.coteJoueur1[index];
                
                somme2 += element.value;
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
}

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