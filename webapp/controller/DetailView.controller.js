sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, UIComponent, MessageToast, JSONModel) => {
        "use strict"

    return Controller.extend("appcrud.controller.DetailView", {

        onInit: function () {
            const oRouter = UIComponent.getRouterFor(this)
            oRouter.getRoute("RouteDetail").attachPatternMatched(this.onReadSet, this)
            this.getView().setModel(new JSONModel([]),"edit")
        },

        onReadSet:function(oEvent){

            const sId = oEvent.getParameter("arguments").id
            const oModel = this.getView().getModel()

            oModel.read(`/UsuariosSet(${sId})`,{
                success:function(oData){
                    this.getView().getModel("edit").setData(oData)
                    this.byId("Id").setEditable(false)
                }.bind(this),

                error: function(oError){
                    MessageToast.show("Erro ao carregar dados")
                }
                
                
            })
        },

        onSave:function(){
            const oData = this.getView().getModel("edit").getData()
            oData.Idade = parseInt(oData.Idade)

            const oModel = this.getView().getModel()

            oModel.update(`/UsuariosSet(${oData.ID})`,oData,{
                success: function(oData2, oResponse){
                    oModel.refresh(true)
                    MessageToast.show("Usuario atualizado com sucesso")
                    this.onNavBack()
                }.bind(this),
                
                error: function(oError) {
                    MessageToast.show("Erro ao atualizar usuário")
                }
            })
        },

        onNavBack: function () {
            const oRouter = UIComponent.getRouterFor(this)
            oRouter.navTo("RouteViewRegisters")
        }

    });
});