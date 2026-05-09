sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, UIComponent, MessageToast,JSONModel) => {
    "use strict";

    return Controller.extend("appcrud.controller.View1", {
        onInit() {
            this.getView().setModel(new JSONModel({Sexo:"Masc"}), "usuarios")
        },

        onRegister:function(){
            const {ID,Nome,Idade,Email,Cidade,Estado,Sexo} = this.getView().getModel("usuarios").getData()
            if(!Nome  || !Idade || !Email || !Cidade || !Estado){
                MessageToast.show("Preencha todos os campos")
                return
            }

            const oModel = this.getView().getModel()
            
            oModel.create("/UsuariosSet",{Nome,Idade: parseInt(Idade),Email,Cidade,Estado,Sexo},{
                success:(oDataNew,oResponse)=>{
                    this.getView().getModel("usuarios").setProperty("/ID",oDataNew.ID)
                    MessageToast.show(`Usuário ${oDataNew.ID} cadastrado com sucesso!`)
                    this.onClear()
                },
                error:(oError)=>{
                    this.getView().setBusy(false)
                    MessageToast.show("Erro ao cadstrar usuário");
                }
            })
        },

        onView:function(){
            const router = UIComponent.getRouterFor(this)
            router.navTo("RouteViewRegisters")
        },

        onClear:function(){
            this.getView().getModel("usuarios").setData({
                ID:"",
                Nome:"",
                Idade:"",
                Email:"",
                Cidade:"",
                Estado:"",
                Sexo:"Masc"
            })
        }
    });
});