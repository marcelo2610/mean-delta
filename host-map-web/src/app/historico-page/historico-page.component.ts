import {Component, OnInit} from '@angular/core';
import {Localizacao} from "../model/localizacao.model";
import {HttpClientService} from "../http-client.service";
import {Router} from "@angular/router";

@Component({
    selector: 'fd-historico-page',
    templateUrl: './historico-page.component.html',
    styleUrls: ['./historico-page.component.css']
})
export class HistoricoPageComponent implements OnInit {

    historico: Localizacao[];

    constructor(private httpClient: HttpClientService, private _route:Router) {
    }

    ngOnInit() {
        this.httpClient
            .get('http://localhost:3000/api/localizacao')
            .subscribe((docs) => {
                this.historico = docs
            });
    }

    consultarMapa(query:String){

    this._route.navigate(['/map', query]);
    }

    excluirMapa(localizacao): void{

        this.httpClient.delete('http://localhost:3000/api/localizacao?id='+localizacao._id)
            .subscribe(
                (ret)=>{

                    if(ret.situacao == 'excluido'){
                        let index = -1;

                        for( let i = 0; i < this.historico.length; i++ ) {
                            if( this.historico[i] === localizacao ) {index = i;break;}}
                        if( index === -1 ) {alert( "Localização não encontrada." ); return;}

                        this.historico.splice( index, 1 );
                    }else
                        {alert( "Não foi possível remover a localização." ); return;}},
                (err)=>{
                    alert( "Não foi possível remover a localização" ); return;
                });
    }
}
